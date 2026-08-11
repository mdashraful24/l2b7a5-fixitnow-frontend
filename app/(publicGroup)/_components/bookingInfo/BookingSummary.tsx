"use client";

import { IAvailableSlot, IService } from "@/lib/type";
import { formatDate, formatTimeDisplay } from "@/utils/bookingUtils";
import { CheckCircle, Clock, DollarSign, MapPin, Star, User, Wrench } from "lucide-react";
import Image from "next/image";

interface BookingSummaryProps {
    service: IService;
    selectedSlot: IAvailableSlot | null;
    selectedTime: string;
}

export function BookingSummary({ service, selectedSlot, selectedTime }: BookingSummaryProps) {
    const technician = service?.technician;

    return (
        <div className="space-y-4 lg:col-span-1">
            {/* Service summary */}
            <div className="rounded-xl border border-gray-200 dark:border-border bg-white dark:bg-card p-6 shadow-sm">
                <h2 className="mb-4 text-sm font-semibold uppercase tracking-wide">Service Details</h2>
                <div className="flex flex-col items-start gap-4">
                    {/* Fixed Image Container */}
                    <div className="relative h-60 w-full shrink-0 overflow-hidden rounded-xl bg-primary/10">
                        {service.serviceImage ? (
                            <Image
                                src={service.serviceImage}
                                unoptimized
                                alt={service.title}
                                fill
                                className="object-cover"
                                sizes="80px"
                                priority
                            />
                        ) : (
                            <div className="flex h-full w-full items-center justify-center bg-primary/10">
                                <Wrench className="h-8 w-8 text-primary" />
                            </div>
                        )}
                    </div>
                    <div className="flex-1 min-w-0">
                        <h3 className="font-semibold">{service.title}</h3>
                        <p className="mt-1 text-sm text-foreground/70">{service.description}</p>
                        <div className="mt-3 flex flex-wrap gap-4 text-sm">
                            <span className="flex items-center gap-1.5 text-foreground/70">
                                <Clock className="h-4 w-4" /> {service.duration} min
                            </span>
                            <span className="flex items-center gap-0.5 font-semibold text-blue-500">
                                <DollarSign className="h-4 w-4" /> {service.price}
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Technician summary */}
            <div className="rounded-xl border border-gray-200 dark:border-border bg-white dark:bg-card p-6 shadow-sm">
                <h2 className="mb-4 text-sm font-semibold uppercase tracking-wide">Technician</h2>
                <div className="flex items-center gap-4">
                    <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-primary/10">
                        <User className="h-7 w-7 text-primary" />
                    </div>
                    <div>
                        <p className="font-semibold text-foreground">{technician?.user.name}</p>
                        <div className="mt-0.5 flex items-center gap-2 text-sm">
                            <div className="flex items-center gap-1">
                                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                                <span className="font-medium text-foreground">{technician?.rating || "4.8"}</span>
                            </div>
                            <span className="text-muted-foreground">({technician?.totalReviews || "128"} reviews)</span>
                        </div>
                        {technician?.location && (
                            <div className="mt-1 flex items-center gap-1.5 text-sm text-muted-foreground">
                                <MapPin className="h-3.5 w-3.5" /> {technician.location}
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Booking summary */}
            {selectedSlot && selectedTime && (
                <div className="rounded-xl border border-green-200 dark:border-green-800 bg-green-50 dark:bg-green-950/30 p-5">
                    <div className="flex items-center gap-2.5 mb-4">
                        <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-400" />
                        <h2 className="text-sm font-semibold text-green-800 dark:text-green-300">Booking Summary</h2>
                    </div>
                    <div className="space-y-2 text-sm text-green-700 dark:text-green-300">
                        <div className="flex justify-between">
                            <span className="font-medium">Date</span>
                            <span>{formatDate(selectedSlot.startAt)}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="font-medium">Time</span>
                            <span>{formatTimeDisplay(selectedTime)}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="font-medium">Duration</span>
                            <span>{service.duration} minutes</span>
                        </div>
                        <div className="mt-4 border-t border-green-200 dark:border-green-800 pt-4">
                            <div className="flex justify-between items-center">
                                <span className="font-medium">Total Amount</span>
                                <span className="text-xl font-bold text-green-800 dark:text-green-300">${service.price}</span>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
