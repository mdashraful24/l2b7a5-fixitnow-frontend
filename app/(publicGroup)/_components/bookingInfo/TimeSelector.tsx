"use client";

import { IAvailableSlot } from "@/lib/type";
import { formatDate, formatTime, formatTimeDisplay } from "@/utils/bookingUtils";
import { Clock, Info } from "lucide-react";

interface TimeSelectorProps {
    selectedSlot: IAvailableSlot;
    timeOptions: string[];
    selectedTime: string;
    onSelectTime: (time: string) => void;
    bufferMinutes?: number;
}

export function TimeSelector({
    selectedSlot,
    timeOptions,
    selectedTime,
    onSelectTime,
    bufferMinutes = 30
}: TimeSelectorProps) {
    const hasAvailableTimes = timeOptions.length > 0;

    return (
        <div className="rounded-xl border border-gray-200 dark:border-border bg-white dark:bg-card p-6 shadow-sm">
            <div className="flex items-center justify-between mb-1">
                <h2 className="text-base font-semibold text-foreground">
                    Step 2: Select a Time
                </h2>
                {bufferMinutes > 0 && (
                    <span className="text-xs text-muted-foreground flex items-center gap-1">
                        <Info className="h-3 w-3" />
                        {bufferMinutes} min notice
                        {/* Bookings require at least {bufferMinutes} minutes advance notice. */}
                    </span>
                )}
            </div>
            <p className="mb-4 text-sm text-muted-foreground">
                Available times on <strong className="text-foreground">{formatDate(selectedSlot.startAt)}</strong> between{" "}
                <strong className="text-foreground">{formatTime(selectedSlot.startAt)}</strong> and{" "}
                <strong className="text-foreground">{formatTime(selectedSlot.endAt)}</strong>.
            </p>

            {!hasAvailableTimes ? (
                <div className="rounded-lg border border-amber-200 dark:border-amber-800 bg-amber-50 dark:bg-amber-950/30 p-4 text-center">
                    <Clock className="mx-auto h-6 w-6 text-amber-500 dark:text-amber-400" />
                    <p className="mt-2 text-sm font-medium text-amber-700 dark:text-amber-300">
                        No available time slots
                    </p>
                    <p className="mt-1 text-xs text-amber-600 dark:text-amber-400">
                        {bufferMinutes > 0
                            ? `All time slots require at least ${bufferMinutes} minutes notice. Please select a different date or time.`
                            : "All time slots for today have passed. Please select a different date."}
                    </p>
                </div>
            ) : (
                <>
                    <p className="mb-3 text-xs text-muted-foreground">
                        Showing {timeOptions.length} available time slots
                    </p>
                    <div className="grid grid-cols-3 gap-2 sm:grid-cols-4">
                        {timeOptions.map((time) => {
                            const displayTime = formatTimeDisplay(time);
                            const isSelected = selectedTime === time;

                            return (
                                <button
                                    key={time}
                                    type="button"
                                    onClick={() => onSelectTime(time)}
                                    className={`rounded-lg border-2 px-3 py-2.5 text-sm font-medium transition-all ${isSelected
                                        ? "border-primary bg-primary text-primary-foreground"
                                        : "border-gray-200 dark:border-gray-700 hover:border-primary/50 hover:bg-primary/5 dark:hover:bg-primary/10"
                                        }`}
                                >
                                    {displayTime}
                                </button>
                            );
                        })}
                    </div>
                </>
            )}
        </div>
    );
}
