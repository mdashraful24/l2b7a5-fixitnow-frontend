"use client";

import { IAdminBookings } from "@/lib/type";
import { MapPin, User, Wrench, Clock, Mail, DollarSign, Star } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";

type BookingCardProps = {
    booking: IAdminBookings;
};

export function BookingCard({ booking }: BookingCardProps) {
    const getStatusConfig = (status: string) => {
        switch (status) {
            case "REQUESTED":
                return {
                    color: "bg-yellow-500",
                    textColor: "text-white",
                    bgColor: "bg-yellow-500",
                    label: "Requested"
                };
            case "ACCEPTED":
                return {
                    color: "bg-green-500",
                    textColor: "text-white",
                    bgColor: "bg-green-500",
                    label: "Accepted"
                };
            case "DECLINED":
                return {
                    color: "bg-orange-500",
                    textColor: "text-white",
                    bgColor: "bg-orange-500",
                    label: "Declined"
                };
            case "PAID":
                return {
                    color: "bg-emerald-500",
                    textColor: "text-white",
                    bgColor: "bg-emerald-500",
                    label: "Paid"
                };
            case "IN_PROGRESS":
                return {
                    color: "bg-purple-500",
                    textColor: "text-white",
                    bgColor: "bg-purple-500",
                    label: "In Progress"
                };
            case "COMPLETED":
                return {
                    color: "bg-indigo-500",
                    textColor: "text-white",
                    bgColor: "bg-indigo-500",
                    label: "Completed"
                };
            case "CANCELLED":
                return {
                    color: "bg-red-500",
                    textColor: "text-white",
                    bgColor: "bg-red-500",
                    label: "Cancelled"
                };
            default:
                return {
                    color: "bg-gray-500",
                    textColor: "text-white",
                    bgColor: "bg-gray-500",
                    label: status
                };
        }
    };

    const statusConfig = getStatusConfig(booking.status);

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric'
        });
    };

    const formatTime = (dateString: string) => {
        return new Date(dateString).toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    return (
        <Link href={`/dashboard/admin/bookings/${booking.id}`}>
            <div className="group relative bg-white rounded-xl border border-zinc-200 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-0.5 overflow-hidden flex flex-col h-full cursor-pointer">
                {/* Gradient Top Bar */}
                <div className={`h-1 w-full bg-linear-to-r ${statusConfig.color} from-${statusConfig.color}/50 to-${statusConfig.color} shrink-0`} />

                <div className="p-4 flex flex-col flex-1">
                    {/* Header */}
                    <div className="flex items-start justify-between mb-3 shrink-0">
                        <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between gap-2 flex-wrap">
                                <h3 className="text-base font-semibold truncate">
                                    {booking.service.title}
                                </h3>
                                <Badge className={`${statusConfig.bgColor} ${statusConfig.textColor} border-0 text-xs`}>
                                    {statusConfig.label}
                                </Badge>
                            </div>
                            <div className="flex items-center gap-2 mt-1 text-sm text-gray-700">
                                <Clock className="h-3.5 w-3.5 shrink-0" />
                                <span>{formatDate(booking.scheduledAt)} at {formatTime(booking.scheduledAt)}</span>
                            </div>
                        </div>
                    </div>

                    {/* Content */}
                    <div className="flex-1 flex flex-col">
                        <div className="bg-zinc-50 dark:bg-zinc-800/50 rounded-lg p-3 flex-1">
                            <div className="space-y-3">
                                {/* Customer Info */}
                                <div className="space-y-1.5">
                                    <h1 className="text-base font-semibold">Customer Info</h1>
                                    <div className="flex flex-col gap-1 text-sm text-gray-700">
                                        <div className="flex items-center gap-1">
                                            <User className="h-3.5 w-3.5 shrink-0" />
                                            <span className="font-medium">{booking.customer.name}</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <Mail className="h-3.5 w-3.5 shrink-0" />
                                            <span className="font-medium">{booking.customer.email}</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Technician Info */}
                                <div className="space-y-1.5">
                                    <h1 className="text-base font-semibold">Technician Info</h1>
                                    <div className="flex items-center gap-1 text-sm text-gray-700">
                                        <Wrench className="h-3.5 w-3.5 shrink-0" />
                                        <span>{booking.technician.user.name}</span>
                                        {booking.technician.rating > 0 && (
                                            <div className="flex items-center gap-1 ml-1">
                                                <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                                                <span className="text-xs">{booking.technician.rating.toFixed(1)}</span>
                                            </div>
                                        )}
                                    </div>
                                </div>

                                {/* Address */}
                                <div className="flex items-start gap-2 text-sm">
                                    <div className="flex items-center gap-1">
                                        <MapPin className="h-3.5 w-3.5 shrink-0" />
                                        <span className="font-semibold">Booking Location : </span>
                                    </div>
                                    <span className="line-clamp-1">{booking.address}</span>
                                </div>

                                {/* Service Details */}
                                <div className="flex items-center gap-3 text-sm pt-2 border-t border-gray-300">
                                    <div className="flex items-center gap-1">
                                        <DollarSign className="h-4 w-4" />
                                        <span>${booking.totalAmount}</span>
                                    </div>
                                    <span>•</span>
                                    <span>{booking.service.duration} mins</span>
                                </div>
                            </div>
                        </div>

                        {/* Footer */}
                        {/* <div className="flex items-center justify-end pt-3 mt-3 border-t border-zinc-100 dark:border-zinc-800 shrink-0">
                            <Button
                                variant="ghost"
                                size="sm"
                                className="h-8 px-3 text-xs font-medium text-zinc-600 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-800"
                            >
                                View Details →
                            </Button>
                        </div> */}
                    </div>
                </div>
            </div>
        </Link>
    );
}