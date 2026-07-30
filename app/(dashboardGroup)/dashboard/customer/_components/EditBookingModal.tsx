/* eslint-disable react-hooks/immutability */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import { useActionState, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { IBooking, IUpdatedAvailableSlot } from "@/lib/type";
import { getAvailableSlotsForTechnician, getSlotDetails, updateBooking } from "@/app/(dashboardGroup)/_actions/customer";
import { Loader2, Clock, CheckCircle, AlertCircle, CalendarX } from "lucide-react";
import { formatDate, formatTime } from "@/utils/bookingUtils";

interface EditBookingModalProps {
    booking: IBooking;
}

export function EditBookingModal({ booking }: EditBookingModalProps) {
    const [open, setOpen] = useState(false);
    const router = useRouter();

    // State for slot selection
    const [availableSlots, setAvailableSlots] = useState<IUpdatedAvailableSlot[]>([]);
    const [selectedSlotId, setSelectedSlotId] = useState<string>(booking.availableSlotId || "");
    const [loadingSlots, setLoadingSlots] = useState(false);
    const [selectedDate, setSelectedDate] = useState<string>(
        new Date(booking.scheduledAt).toISOString().split('T')[0]
    );

    // State for form fields
    const [address, setAddress] = useState(booking.address);
    const [notes, setNotes] = useState(booking.notes || "");
    const [scheduledAt, setScheduledAt] = useState(
        new Date(booking.scheduledAt).toISOString().slice(0, 16)
    );

    // Track if slot has been changed
    const [slotChanged, setSlotChanged] = useState(false);
    // Track if slots are available
    const [hasAvailableSlots, setHasAvailableSlots] = useState(true);

    const action = updateBooking.bind(null, booking.id);
    const [state, formAction, pending] = useActionState(action, null);

    // Fetch available slots when date changes
    useEffect(() => {
        if (open && booking.technician?.id) {
            fetchAvailableSlots(selectedDate);
        }
    }, [open, selectedDate, booking.technician?.id]);

    const fetchAvailableSlots = async (date: string) => {
        setLoadingSlots(true);
        try {
            const result = await getAvailableSlotsForTechnician(
                booking.technician.id,
                date
            );

            if (result.success && result.data) {
                const slots = result.data;
                setAvailableSlots(slots);
                setHasAvailableSlots(slots.length > 0);

                // If no slots available, don't auto-select anything
                if (slots.length === 0) {
                    setSelectedSlotId("");
                    setScheduledAt("");
                    setSlotChanged(false);
                } else {
                    // Check if current slot exists in the new list
                    const currentSlotExists = slots.some(
                        (slot: IUpdatedAvailableSlot) => slot.id === selectedSlotId
                    );

                    if (!currentSlotExists && slots.length > 0) {
                        // Auto-select first available slot
                        const firstSlot = slots[0];
                        setSelectedSlotId(firstSlot.id);
                        handleSlotSelect(firstSlot.id);
                    } else if (currentSlotExists) {
                        // Keep current selection
                        setHasAvailableSlots(true);
                    }
                }
            } else {
                setAvailableSlots([]);
                setHasAvailableSlots(false);
                setSelectedSlotId("");
                setScheduledAt("");
                setSlotChanged(false);
            }
        } catch (error) {
            console.error("Error fetching slots:", error);
            setAvailableSlots([]);
            setHasAvailableSlots(false);
            setSelectedSlotId("");
            setScheduledAt("");
            setSlotChanged(false);
        } finally {
            setLoadingSlots(false);
        }
    };

    // Handle slot selection and update scheduledAt
    const handleSlotSelect = async (slotId: string) => {
        setSelectedSlotId(slotId);
        setSlotChanged(true);

        try {
            const result = await getSlotDetails(slotId);
            if (result.success && result.data) {
                // Update scheduledAt with the slot's start time
                const slotDate = new Date(result.data.startAt);
                // Adjust for timezone to ensure correct display
                const localDateTime = new Date(slotDate.getTime() - slotDate.getTimezoneOffset() * 60000);
                setScheduledAt(localDateTime.toISOString().slice(0, 16));
            }
        } catch (error) {
            console.error("Error fetching slot details:", error);
        }
    };

    // Handle date change - only if slots are available
    const handleDateChange = (date: string) => {
        if (!hasAvailableSlots) return; // Don't allow date change if no slots

        setSelectedDate(date);
        setSelectedSlotId("");
        setScheduledAt("");
        setSlotChanged(false);
    };

    // Reset state when modal closes
    const handleOpenChange = (isOpen: boolean) => {
        setOpen(isOpen);
        if (!isOpen) {
            setAvailableSlots([]);
            setSelectedSlotId(booking.availableSlotId || "");
            setSelectedDate(new Date(booking.scheduledAt).toISOString().split('T')[0]);
            setAddress(booking.address);
            setNotes(booking.notes || "");
            setScheduledAt(new Date(booking.scheduledAt).toISOString().slice(0, 16));
            setSlotChanged(false);
            setHasAvailableSlots(true);
        }
    };

    useEffect(() => {
        if (!state) return;

        if (state.success) {
            toast.success("Booking updated successfully");
            setOpen(false);
            router.refresh();
        } else {
            toast.error(state.message || "Update failed");
        }
    }, [state, router]);

    const canEdit = booking.status === "REQUESTED" || booking.status === "ACCEPTED";

    if (!canEdit) {
        return null;
    }

    // Check if we can submit
    const canSubmit = () => {
        if (!address.trim()) return false;
        if (loadingSlots) return false;

        // If we want to change the slot, we need a new slot selected
        if (slotChanged) {
            return !!selectedSlotId && !!scheduledAt && hasAvailableSlots;
        }

        // If slot wasn't changed, we just need address
        return true;
    };

    return (
        <>
            <Button onClick={() => setOpen(true)} className="w-full sm:w-auto">
                Edit Booking
            </Button>

            <Dialog open={open} onOpenChange={handleOpenChange}>
                <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                    <DialogHeader>
                        <DialogTitle>Update Booking</DialogTitle>
                    </DialogHeader>

                    <form action={formAction} className="space-y-6">
                        {/* Hidden fields */}
                        <input type="hidden" name="scheduledAt" value={scheduledAt} />
                        <input type="hidden" name="availableSlotId" value={selectedSlotId} />

                        {/* Slot Selection Disabled if no available slots */}
                        <div className="space-y-3">
                            <div className="flex items-center justify-between">
                                <Label>Select Date &amp; Time</Label>
                                {!hasAvailableSlots && !loadingSlots && (
                                    <span className="text-xs text-red-500 flex items-center gap-1">
                                        <CalendarX className="h-3 w-3" />
                                        No slots available
                                    </span>
                                )}
                            </div>

                            {/* Date Picker Disabled if no slots */}
                            <Input
                                type="date"
                                value={selectedDate}
                                onChange={(e) => handleDateChange(e.target.value)}
                                className="w-full"
                                min={new Date().toISOString().split('T')[0]}
                                disabled={!hasAvailableSlots || loadingSlots}
                            />

                            {/* Available Slots */}
                            <div className="mt-3">
                                {loadingSlots ? (
                                    <div className="flex items-center justify-center py-8">
                                        <Loader2 className="h-6 w-6 animate-spin text-primary" />
                                    </div>
                                ) : !hasAvailableSlots ? (
                                    <div className="rounded-lg border border-red-200 bg-red-50 p-3 text-center">
                                        <CalendarX className="mx-auto h-8 w-8 text-red-500" />
                                        <p className="mt-2 text-sm font-medium text-red-700">
                                            No Available Time Slots
                                        </p>
                                        <p className="mt-1 text-xs text-red-600">
                                            The technician has no available slots for this date.
                                            You can still update your address and notes.
                                        </p>
                                    </div>
                                ) : (
                                    <div>
                                        <p className="mb-2 text-xs text-gray-500">
                                            Select a time slot for your booking
                                            {booking.availableSlot && !slotChanged && (
                                                <span className="ml-1 text-amber-600">
                                                    (Current: {formatTime(booking.availableSlot.startAt)})
                                                </span>
                                            )}
                                        </p>
                                        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                                            {availableSlots.map((slot) => {
                                                const isSelected = selectedSlotId === slot.id;
                                                const slotDate = new Date(slot.startAt);
                                                const now = new Date();

                                                // Check if slot is in the past
                                                const isPast = slotDate < now;

                                                return (
                                                    <button
                                                        key={slot.id}
                                                        type="button"
                                                        onClick={() => !isPast && handleSlotSelect(slot.id)}
                                                        disabled={isPast}
                                                        className={`flex flex-col rounded-xl border-2 p-4 text-left transition-all ${isSelected
                                                            ? "border-primary bg-primary/5 ring-2 ring-primary/20"
                                                            : isPast
                                                                ? "border-gray-200 bg-gray-50 opacity-50 cursor-not-allowed"
                                                                : "border-gray-200 hover:border-primary/50 hover:bg-gray-50"
                                                            }`}
                                                    >
                                                        <span className="font-semibold text-gray-900">
                                                            {formatDate(slot.startAt)}
                                                        </span>
                                                        <span className="mt-1 text-sm text-gray-500">
                                                            {formatTime(slot.startAt)} – {formatTime(slot.endAt)}
                                                        </span>
                                                        {isSelected && (
                                                            <CheckCircle className="mt-2 h-4 w-4 text-primary" />
                                                        )}
                                                        {isPast && (
                                                            <span className="mt-1 text-xs text-red-500">Unavailable</span>
                                                        )}
                                                        {!isPast && !isSelected && booking.availableSlotId === slot.id && (
                                                            <span className="mt-1 text-xs text-amber-600">● Current</span>
                                                        )}
                                                    </button>
                                                );
                                            })}
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Warning if no slot selected but slots exist */}
                            {hasAvailableSlots && slotChanged && !selectedSlotId && (
                                <div className="rounded-lg border border-red-200 bg-red-50 p-3">
                                    <p className="text-sm text-red-600 flex items-center gap-1">
                                        <AlertCircle className="h-4 w-4" />
                                        Please select a time slot to update your booking time
                                    </p>
                                </div>
                            )}
                        </div>

                        {/* Address - Always editable */}
                        <div className="space-y-2">
                            <Label htmlFor="address">Address <span className="text-red-500">*</span></Label>
                            <Textarea
                                id="address"
                                name="address"
                                value={address}
                                onChange={(e) => setAddress(e.target.value)}
                                placeholder="Enter your service address"
                                rows={3}
                                required
                                className="resize-none"
                            />
                        </div>

                        {/* Notes - Always editable */}
                        <div className="space-y-2">
                            <Label htmlFor="notes">Notes <span className="text-gray-600 text-xs">(optional)</span></Label>
                            <Textarea
                                id="notes"
                                name="notes"
                                value={notes}
                                onChange={(e) => setNotes(e.target.value)}
                                placeholder="Any special instructions for the technician..."
                                rows={2}
                                className="resize-none"
                            />
                        </div>

                        {/* Selected time preview - Only show if slot selected */}
                        {scheduledAt && selectedSlotId && hasAvailableSlots && (
                            <div className="rounded-lg bg-green-50 border border-green-200 p-4">
                                <div className="flex items-center gap-2">
                                    <Clock className="h-4 w-4 text-green-600" />
                                    <span className="text-sm font-medium text-green-700">
                                        {slotChanged ? "New" : "Current"} Scheduled Time:
                                    </span>
                                    <span className="text-sm text-green-700">
                                        {new Date(scheduledAt).toLocaleString("en-US", {
                                            weekday: "short",
                                            month: "short",
                                            day: "numeric",
                                            year: "numeric",
                                            hour: "2-digit",
                                            minute: "2-digit",
                                        })}
                                    </span>
                                </div>
                            </div>
                        )}

                        <Button
                            type="submit"
                            disabled={pending || !canSubmit()}
                            className="w-full"
                        >
                            {pending ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Updating...
                                </>
                            ) : (
                                !hasAvailableSlots && !slotChanged ?
                                    "Update Address & Notes" :
                                    "Update Booking"
                            )}
                        </Button>
                    </form>
                </DialogContent>
            </Dialog>
        </>
    );
}
