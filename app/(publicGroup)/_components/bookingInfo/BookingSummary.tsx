"use client";

import { IAvailableSlot, IService } from "@/lib/type";
import { formatDate, formatTimeDisplay } from "@/utils/bookingUtils";
import { CheckCircle, Clock, DollarSign, MapPin, Star, User, Wrench } from "lucide-react";

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
            <div className="rounded-xl border bg-white p-6 shadow-sm">
                <h2 className="mb-4 text-sm font-semibold uppercase tracking-wide text-gray-700">Service Details</h2>
                <div className="flex items-start gap-4">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/10">
                        <Wrench className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                        <h3 className="font-semibold">{service.title}</h3>
                        <p className="mt-1 text-sm text-gray-700">{service.description}</p>
                        <div className="mt-3 flex flex-wrap gap-3 text-sm">
                            <span className="flex items-center gap-1 text-gray-700">
                                <Clock className="h-3.5 w-3.5" /> {service.duration} min
                            </span>
                            <span className="flex items-center gap-1 font-semibold text-primary">
                                <DollarSign className="h-3.5 w-3.5" /> ${service.price}
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Technician summary */}
            <div className="rounded-xl border bg-white p-6 shadow-sm">
                <h2 className="mb-4 text-sm font-semibold uppercase tracking-wide text-gray-700">Technician</h2>
                <div className="flex items-center gap-3">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary/10">
                        <User className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                        <p className="font-semibold text-gray-900">{technician?.user.name}</p>
                        <div className="mt-0.5 flex items-center gap-1 text-sm">
                            <Star className="h-3.5 w-3.5 fill-yellow-400 text-yellow-400" />
                            <span className="font-medium">{technician?.rating}</span>
                            <span className="text-gray-700">({technician?.totalReviews})</span>
                        </div>
                        {technician?.location && (
                            <div className="mt-1 flex items-center gap-1 text-sm text-gray-700">
                                <MapPin className="h-3 w-3" /> {technician.location}
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Booking summary */}
            {selectedSlot && selectedTime && (
                <div className="rounded-xl border border-green-200 bg-green-50 p-5">
                    <div className="flex items-center gap-2 mb-3">
                        <CheckCircle className="h-5 w-5 text-green-600" />
                        <h2 className="text-sm font-semibold text-green-800">Booking Summary</h2>
                    </div>
                    <div className="space-y-1.5 text-sm text-green-700">
                        <p><span className="font-medium">Date:</span> {formatDate(selectedSlot.startAt)}</p>
                        <p><span className="font-medium">Time:</span> {formatTimeDisplay(selectedTime)}</p>
                        <p><span className="font-medium">Duration:</span> {service.duration} minutes</p>
                        <div className="mt-3 border-t border-green-200 pt-3">
                            <p className="flex justify-between">
                                <span>Total Amount</span>
                                <span className="text-lg font-bold text-green-800">${service.price}</span>
                            </p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
