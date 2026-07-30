/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Suspense, useState } from "react";
import { IAvailableSlot } from "@/lib/type";
import { BookingSummary } from "./BookingSummary";
import { BookingSkeleton } from "./BookingSkeleton";
import { BookingForm } from "./BookingFormDialog";

export default function BookingWrapper({ service }: { service: any }) {
    const [selectedSlot, setSelectedSlot] = useState<IAvailableSlot | null>(
        service?.technician?.availability?.find((slot: IAvailableSlot) => slot.isAvailable) || null
    );
    const [selectedTime, setSelectedTime] = useState<string>("");

    return (
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
            {/* Left: Dynamic Booking Summary, like preview */}
            <BookingSummary
                service={service}
                selectedSlot={selectedSlot}
                selectedTime={selectedTime}
            />

            {/* Right: Booking Form */}
            <div className="lg:col-span-2">
                <Suspense fallback={<BookingSkeleton />}>
                    <BookingForm
                        service={service}
                        onSlotChange={setSelectedSlot}
                        onTimeChange={setSelectedTime}
                    />
                </Suspense>
            </div>
        </div>
    );
}
