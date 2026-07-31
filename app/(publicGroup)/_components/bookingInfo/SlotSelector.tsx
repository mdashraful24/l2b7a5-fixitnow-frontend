"use client";

import { IAvailableSlot } from "@/lib/type";
import { formatDate, formatTime } from "@/utils/bookingUtils";
import { CheckCircle } from "lucide-react";

interface SlotSelectorProps {
    availableSlots: IAvailableSlot[];
    selectedSlot: IAvailableSlot | null;
    onSelectSlot: (slot: IAvailableSlot) => void;
}

export function SlotSelector({ availableSlots, selectedSlot, onSelectSlot }: SlotSelectorProps) {
    if (availableSlots.length === 0) {
        return (
            <div className="rounded-xl border bg-white p-6 shadow-sm">
                <h2 className="mb-1 text-base font-semibold">
                    Step 1: Choose an Availability Slot
                </h2>
                <p className="mb-4 text-sm text-gray-700">Select the technician&apos;s available time window.</p>
                <div className="rounded-lg border border-dashed p-6 text-center text-sm">
                    No available slots for this technician right now.
                </div>
            </div>
        );
    }

    return (
        <div className="rounded-xl border bg-white p-6 shadow-sm">
            <h2 className="mb-1 text-base font-semibold">
                Step 1: Choose an Availability Slot
            </h2>
            <p className="mb-4 text-sm text-gray-700">Select the technician&apos;s available time window.</p>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                {availableSlots.map((slot) => (
                    <button
                        key={slot.id}
                        type="button"
                        onClick={() => onSelectSlot(slot)}
                        className={`group flex flex-col rounded-xl border-2 p-4 text-left transition-all ${selectedSlot?.id === slot.id
                                ? "border-primary bg-primary/5"
                                : "border-gray-200 hover:border-primary/50 hover:bg-gray-50"
                            }`}
                    >
                        <span className="font-semibold text-gray-900">
                            {formatDate(slot.startAt)}
                        </span>
                        <span className="mt-1 text-sm text-gray-500">
                            {formatTime(slot.startAt)} – {formatTime(slot.endAt)}
                        </span>
                        {selectedSlot?.id === slot.id && (
                            <CheckCircle className="mt-2 h-4 w-4 text-primary" />
                        )}
                    </button>
                ))}
            </div>
        </div>
    );
}