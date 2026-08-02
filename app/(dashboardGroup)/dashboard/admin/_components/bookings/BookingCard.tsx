"use client";

import { IAdminBookings } from "@/lib/type";
import { MapPin, User, Wrench, Clock, Mail, DollarSign, Star, AlertCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { bookingStatusTheme } from "@/lib/bookingConstants";

type BookingCardProps = {
    booking: IAdminBookings;
};

export function BookingCard({ booking }: BookingCardProps) {
    const statusConfig = bookingStatusTheme[booking.status as keyof typeof bookingStatusTheme] ?? {
        label: booking.status,
        icon: AlertCircle,
        accent: "bg-gray-500",
        badgeBg: "bg-gray-100",
        badgeText: "text-gray-700",
        badgeBorder: "border-gray-200",
        softBg: "bg-gray-50 dark:bg-gray-950/30",
        softText: "text-gray-700 dark:text-gray-300",
        softBorder: "border-gray-200 dark:border-gray-800",
    };

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
            <div className="group relative bg-white dark:bg-card rounded-xl border border-zinc-200 dark:border-border shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-0.5 overflow-hidden flex flex-col h-full cursor-pointer">
                {/* Gradient Top Bar */}
                <div className={`h-1 w-full ${statusConfig.accent} shrink-0`} />

                <div className="p-4 flex flex-col flex-1">
                    {/* Header */}
                    <div className="flex items-start justify-between mb-3 shrink-0">
                        <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between gap-2 flex-wrap">
                                <h3 className="text-base font-semibold truncate text-foreground">
                                    {booking.service.title}
                                </h3>
                                <Badge className={`${statusConfig.badgeBg} ${statusConfig.badgeText} ${statusConfig.badgeBorder} border-0 text-xs`}>
                                    {statusConfig.label}
                                </Badge>
                            </div>
                            <div className="flex items-center gap-2 mt-1 text-sm text-muted-foreground">
                                <Clock className="h-3.5 w-3.5 shrink-0" />
                                <span>{formatDate(booking.scheduledAt)} at {formatTime(booking.scheduledAt)}</span>
                            </div>
                        </div>
                    </div>

                    {/* Content */}
                    <div className="flex-1 flex flex-col">
                        <div className="bg-zinc-50 dark:bg-muted/30 rounded-lg p-3 flex-1">
                            <div className="space-y-3">
                                {/* Customer Info */}
                                <div className="space-y-1.5">
                                    <h1 className="text-base font-semibold text-foreground">Customer Info</h1>
                                    <div className="flex flex-col gap-1 text-sm text-muted-foreground">
                                        <div className="flex items-center gap-1">
                                            <User className="h-3.5 w-3.5 shrink-0" />
                                            <span className="font-medium text-foreground">{booking.customer.name}</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <Mail className="h-3.5 w-3.5 shrink-0" />
                                            <span className="font-medium text-foreground">{booking.customer.email}</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Technician Info */}
                                <div className="space-y-1.5">
                                    <h1 className="text-base font-semibold text-foreground">Technician Info</h1>
                                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
                                        <Wrench className="h-3.5 w-3.5 shrink-0" />
                                        <span className="text-foreground">{booking.technician.user.name}</span>
                                        {booking.technician.rating > 0 && (
                                            <div className="flex items-center gap-1 ml-1">
                                                <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                                                <span className="text-xs text-foreground">{booking.technician.rating.toFixed(1)}</span>
                                            </div>
                                        )}
                                    </div>
                                </div>

                                {/* Address */}
                                <div className="flex items-start gap-2 text-sm">
                                    <div className="flex items-center gap-1">
                                        <MapPin className="h-3.5 w-3.5 shrink-0 text-muted-foreground" />
                                        <span className="font-semibold text-foreground">Booking Location : </span>
                                    </div>
                                    <span className="line-clamp-1 text-muted-foreground">{booking.address}</span>
                                </div>

                                {/* Service Details */}
                                <div className="flex items-center gap-3 text-sm pt-2 border-t border-border">
                                    <div className="flex items-center gap-1 text-foreground">
                                        <DollarSign className="h-4 w-4" />
                                        <span>${booking.totalAmount}</span>
                                    </div>
                                    <span className="text-muted-foreground">•</span>
                                    <span className="text-muted-foreground">{booking.service.duration} mins</span>
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
