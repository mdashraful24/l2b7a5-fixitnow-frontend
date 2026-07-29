import { IBooking, BookingStatus } from "@/lib/type";
import { Clock, MapPin, User, ArrowRight } from "lucide-react";
import Link from "next/link";
import { CancelBookingButton } from "./CancelBookingButton";

interface BookingCardProps {
    booking: IBooking;
    statusColors: Record<BookingStatus, string>;
}

const STATUS_LABELS: Record<BookingStatus, string> = {
    REQUESTED: "Requested",
    ACCEPTED: "Accepted",
    DECLINED: "Declined",
    PAID: "Paid",
    IN_PROGRESS: "In Progress",
    COMPLETED: "Completed",
    CANCELLED: "Cancelled",
};

const nonCancellableStatuses: BookingStatus[] = [
    "IN_PROGRESS",
    "COMPLETED",
    "CANCELLED",
];

export function BookingCard({ booking, statusColors }: BookingCardProps) {
    const canCancel = !nonCancellableStatuses.includes(booking.status);

    return (
        <div className="rounded-xl border bg-white p-5 shadow-sm transition-shadow hover:shadow-md">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                {/* Left info */}
                <div className="flex-1 space-y-2">
                    <div className="flex flex-wrap items-center gap-2">
                        <h3 className="font-semibold text-gray-900">{booking.service?.title}</h3>
                        <span
                            className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium ${statusColors[booking.status]}`}
                        >
                            {STATUS_LABELS[booking.status]}
                        </span>
                    </div>

                    <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-gray-500">
                        <span className="flex items-center gap-1">
                            <User className="h-3.5 w-3.5" />
                            {booking.technician?.user?.name}
                        </span>
                        <span className="flex items-center gap-1">
                            <Clock className="h-3.5 w-3.5" />
                            {new Date(booking.scheduledAt).toLocaleString("en-US", {
                                dateStyle: "medium",
                                timeStyle: "short",
                            })}
                        </span>
                        <span className="flex items-center gap-1">
                            <MapPin className="h-3.5 w-3.5" />
                            <span className="line-clamp-1 max-w-50">{booking.address}</span>
                        </span>
                    </div>
                </div>

                {/* Right: price + actions */}
                <div className="flex flex-col items-end gap-2">
                    <p className="text-lg font-bold text-primary">${booking.totalAmount}</p>
                    <div className="flex gap-2">
                        {canCancel && <CancelBookingButton bookingId={booking.id} />}
                        <Link
                            href={`/dashboard/customer/bookings/${booking.id}`}
                            className="flex items-center gap-1 rounded-lg border border-gray-200 px-3 py-1.5 text-xs font-medium text-gray-600 transition bg-blue-100 hover:border-primary/40 hover:text-primary"
                        >
                            Details
                            <ArrowRight className="h-3.5 w-3.5" />
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
