/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { IAvailableSlot, ICreateBookingPayload, IService } from "@/lib/type";
import { CalendarCheck, Loader2, Info } from "lucide-react";
import { toast } from "sonner";
import { SlotSelector } from "./SlotSelector";
import { TimeSelector } from "./TimeSelector";
import { CustomerDetails } from "./CustomerDetails";
import { BOOKING_CONFIG, getTimeOptionsWithBuffer } from "@/utils/bookingUtils";
import { createBooking } from "../../_actions/createBooking";

interface BookingFormProps {
    service: IService;
    onSlotChange?: (slot: IAvailableSlot | null) => void;
    onTimeChange?: (time: string) => void;
}

export function BookingForm({ service, onSlotChange, onTimeChange }: BookingFormProps) {
    const router = useRouter();
    const technician = service?.technician;
    const availableSlots = service?.technician?.availability?.filter(
        (slot: IAvailableSlot) => slot.isAvailable
    ) ?? [];

    const [submitting, setSubmitting] = useState(false);
    const [selectedSlot, setSelectedSlot] = useState<IAvailableSlot | null>(
        availableSlots.length > 0 ? availableSlots[0] : null
    );
    const [selectedTime, setSelectedTime] = useState<string>("");
    const [address, setAddress] = useState<string>("");
    const [notes, setNotes] = useState<string>("");
    const [timeOptions, setTimeOptions] = useState<string[]>([]);
    const [showBufferInfo, setShowBufferInfo] = useState(false);
    const [bookingId, setBookingId] = useState<string | null>(null);

    // Update time options when slot changes
    useEffect(() => {
        if (selectedSlot) {
            const options = getTimeOptionsWithBuffer(selectedSlot);

            setTimeOptions(options);
            setSelectedTime("");

            if (onTimeChange) {
                onTimeChange("");
            }

            const totalOptions = getTimeOptionsWithBuffer(
                selectedSlot,
                0
            );

            setShowBufferInfo(options.length < totalOptions.length);
        } else {
            setTimeOptions([]);
            setShowBufferInfo(false);
        }
    }, [selectedSlot, onTimeChange]);

    // Handle slot change
    const handleSlotChange = (slot: IAvailableSlot | null) => {
        setSelectedSlot(slot);
        setSelectedTime("");
        if (onSlotChange) {
            onSlotChange(slot);
        }
        if (onTimeChange) {
            onTimeChange("");
        }
    };

    // Handle time change
    const handleTimeChange = (time: string) => {
        setSelectedTime(time);
        if (onTimeChange) {
            onTimeChange(time);
        }
    };

    // Build scheduledAt ISO string
    const buildScheduledAt = () => {
        if (!selectedSlot || !selectedTime) return "";
        const slotDate = new Date(selectedSlot.startAt);
        const [hours, minutes] = selectedTime.split(':').map(Number);
        const scheduledDate = new Date(slotDate);
        scheduledDate.setHours(hours, minutes, 0, 0);
        return scheduledDate.toISOString();
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!selectedSlot || !selectedTime || !address) {
            toast.error("Please fill in all required fields.");
            return;
        }

        if (!service || !technician) {
            toast.error("Service or technician information is missing.");
            return;
        }

        const scheduledAt = buildScheduledAt();
        if (!scheduledAt) {
            toast.error("Invalid time selection.");
            return;
        }

        // Validate buffer time (always validate)
        const now = new Date();
        const scheduledDate = new Date(scheduledAt);
        const timeDiff = (scheduledDate.getTime() - now.getTime()) / 60000;

        if (timeDiff < BOOKING_CONFIG.MIN_BUFFER_MINUTES) {
            toast.error(`Please select a time at least ${BOOKING_CONFIG.MIN_BUFFER_MINUTES} minutes from now.`);
            return;
        }

        const payload: ICreateBookingPayload = {
            technicianId: technician.id,
            categoryId: service.categoryId,
            serviceId: service.id,
            availableSlotId: selectedSlot.id,
            scheduledAt,
            address,
            notes: notes || undefined,
            totalAmount: service.price ?? 0,
        };

        setSubmitting(true);
        try {
            const result = await createBooking(payload);

            if (result.success) {
                toast.success("Booking created successfully!");

                const bookingId = result.data?.id || result.data?.bookingId || result.data?._id;

                if (bookingId) {
                    router.push(`/dashboard/customer/bookings/${bookingId}`);
                } else {
                    router.push("/dashboard/customer/bookings");
                }
            } else {
                toast.error(result.message || "Failed to create booking.");
            }
        } catch (error) {
            toast.error("An error occurred while creating the booking.");
            console.error("Booking error:", error);
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            {showBufferInfo && (
                <div className="rounded-lg border border-blue-200 bg-blue-50 p-3 text-sm text-blue-700">
                    <div className="flex items-start gap-2">
                        <Info className="mt-0.5 h-4 w-4 shrink-0" />
                        <div>
                            <p className="font-medium">Notice Required</p>
                            <p className="text-xs">
                                Please book at least {BOOKING_CONFIG.MIN_BUFFER_MINUTES} minutes in advance to allow
                                the technician to prepare for your service.
                            </p>
                        </div>
                    </div>
                </div>
            )}

            <SlotSelector
                availableSlots={availableSlots}
                selectedSlot={selectedSlot}
                onSelectSlot={handleSlotChange}
            />

            {selectedSlot && (
                <TimeSelector
                    selectedSlot={selectedSlot}
                    timeOptions={timeOptions}
                    selectedTime={selectedTime}
                    onSelectTime={handleTimeChange}
                    bufferMinutes={BOOKING_CONFIG.MIN_BUFFER_MINUTES}
                />
            )}

            {selectedSlot && selectedTime && (
                <CustomerDetails
                    address={address}
                    notes={notes}
                    onAddressChange={setAddress}
                    onNotesChange={setNotes}
                />
            )}

            <button
                type="submit"
                disabled={submitting || !selectedSlot || !selectedTime || !address}
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-6 py-4 text-base font-semibold text-white transition-all hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-50"
            >
                {submitting ? (
                    <><Loader2 className="h-5 w-5 animate-spin" /> Confirming Booking...</>
                ) : (
                    <><CalendarCheck className="h-5 w-5" /> Confirm Booking</>
                )}
            </button>
        </form>
    );
}
