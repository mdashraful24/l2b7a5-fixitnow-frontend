import { getSingleBooking } from "../../../../_actions/getBookings";
import { notFound } from "next/navigation";
import { BookingStatus } from "@/lib/type";
import {
    ArrowLeft, CalendarDays, Clock, MapPin, User,
    FileText, CheckCircle, XCircle, AlertCircle, Wrench
} from "lucide-react";
import Link from "next/link";
import { CancelBookingButton } from "../../_components/CancelBookingButton";
import { EditBookingModal } from "../../_components/EditBookingModal";

const nonCancellableStatuses: BookingStatus[] = [
    "IN_PROGRESS",
    "COMPLETED",
    "CANCELLED",
];

const statusConfig: Record<BookingStatus, { label: string; color: string; icon: React.ReactNode }> = {
    REQUESTED: {
        label: "Requested",
        color: "bg-blue-50 text-blue-700 border-blue-200",
        icon: <Clock className="h-4 w-4" />,
    },
    ACCEPTED: {
        label: "Accepted",
        color: "bg-teal-100 text-teal-700 border-teal-400",
        icon: <CheckCircle className="h-4 w-4" />,
    },
    DECLINED: {
        label: "Declined",
        color: "bg-indigo-50 text-indigo-700 border-indigo-200",
        icon: <XCircle className="h-4 w-4" />,
    },
    PAID: {
        label: "Paid",
        color: "bg-indigo-50 text-indigo-700 border-indigo-200",
        icon: <FileText className="h-4 w-4" />,
    },
    IN_PROGRESS: {
        label: "In Progress",
        color: "bg-amber-50 text-amber-700 border-amber-200",
        icon: <AlertCircle className="h-4 w-4" />,
    },
    COMPLETED: {
        label: "Completed",
        color: "bg-green-50 text-green-700 border-green-200",
        icon: <CheckCircle className="h-4 w-4" />,
    },
    CANCELLED: {
        label: "Cancelled",
        color: "bg-red-50 text-red-700 border-red-200",
        icon: <XCircle className="h-4 w-4" />,
    },
};

export default async function BookingDetailPage({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const { id } = await params;
    const response = await getSingleBooking(id);

    if (!response.success || !response.data) {
        notFound();
    }

    const booking = response.data;
    const status = statusConfig[booking.status as BookingStatus];
    const canCancel = !nonCancellableStatuses.includes(booking.status);

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <Link
                        href="/dashboard/customer/bookings"
                        className="mb-2 inline-flex items-center gap-1.5 text-sm text-gray-600 hover:text-primary transition-colors"
                    >
                        <ArrowLeft className="h-4 w-4" />
                        Back to Bookings
                    </Link>
                    <h1 className="text-2xl font-bold">Booking Details</h1>
                </div>
                <span
                    className={`flex items-center gap-1.5 rounded-full border px-4 py-1.5 text-sm font-medium ${status.color}`}
                >
                    {status.icon}
                    {status.label}
                </span>
            </div>

            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                {/* Service Info */}
                <div className="rounded-xl border bg-white p-6 shadow-sm">
                    <h2 className="mb-4 flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-gray-600">
                        <Wrench className="h-4 w-4" /> Service
                    </h2>
                    <h3 className="text-lg font-bold">{booking.service?.title}</h3>
                    <p className="mt-1 text-sm text-gray-700">{booking.service?.description}</p>
                    <div className="mt-4 flex justify-between items-center gap-4 text-sm">
                        <span className="text-gray-700">
                            <span className="font-medium">Duration:</span> {booking.service?.duration} min
                        </span>
                        <span className="text-2xl font-bold text-primary">${booking.totalAmount}</span>
                    </div>
                </div>

                {/* Technician Info */}
                <div className="rounded-xl border bg-white p-6 shadow-sm">
                    <h2 className="mb-4 flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-gray-600">
                        <User className="h-4 w-4" /> Technician
                    </h2>
                    <div className="flex items-center gap-3">
                        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary/10">
                            <User className="h-6 w-6 text-primary" />
                        </div>
                        <div>
                            <p className="font-semibold">{booking.technician?.user?.name}</p>
                            <p className="text-sm text-gray-700">{booking.technician?.user?.email}</p>
                            {booking.technician?.user?.phone && (
                                <p className="text-sm text-gray-700">{booking.technician.user.phone}</p>
                            )}
                        </div>
                    </div>
                    {booking.technician?.location && (
                        <div className="mt-4 flex items-center gap-2 text-sm text-gray-700">
                            <MapPin className="h-4 w-4" />
                            <span>{booking.technician.location}</span>
                        </div>
                    )}
                </div>

                {/* Schedule Info */}
                <div className="rounded-xl border bg-white p-6 shadow-sm">
                    <h2 className="mb-4 flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-gray-600">
                        <CalendarDays className="h-4 w-4" /> Schedule
                    </h2>
                    <div className="space-y-3 text-sm">
                        <div className="flex items-center gap-2">
                            <Clock className="h-4 w-4 text-gray-700" />
                            <span className="text-gray-700">
                                {new Date(booking.scheduledAt).toLocaleString("en-US", {
                                    weekday: "long",
                                    year: "numeric",
                                    month: "long",
                                    day: "numeric",
                                    hour: "2-digit",
                                    minute: "2-digit",
                                })}
                            </span>
                        </div>
                        {booking.availableSlot && (
                            <div className="rounded-lg bg-gray-50 px-4 py-3">
                                <p className="text-xs font-medium text-gray-600 mb-1">Slot Window</p>
                                <p className="font-medium">
                                    {booking.availableSlot.dayOfWeek} —{" "}
                                    {new Date(booking.availableSlot.startAt).toLocaleTimeString([], {
                                        hour: "2-digit", minute: "2-digit"
                                    })}{" "}
                                    to{" "}
                                    {new Date(booking.availableSlot.endAt).toLocaleTimeString([], {
                                        hour: "2-digit", minute: "2-digit"
                                    })}
                                </p>
                            </div>
                        )}
                        <div className="flex items-start gap-2">
                            <MapPin className="h-4 w-4 shrink-0 text-gray-700 mt-0.5" />
                            <span className="text-gray-700">{booking.address}</span>
                        </div>
                    </div>
                </div>

                {/* Notes */}
                <div className="rounded-xl border bg-white p-6 shadow-sm">
                    <h2 className="mb-4 flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-gray-600">
                        <FileText className="h-4 w-4" /> Additional Info
                    </h2>
                    <div className="space-y-3 text-sm">
                        <div>
                            <p className="font-medium text-gray-700">Notes</p>
                            <p className="mt-1 text-gray-700">
                                {booking.notes || "No special instructions provided."}
                            </p>
                        </div>
                        <div>
                            <p className="font-medium text-gray-700">Booking Created</p>
                            <p className="mt-1 text-gray-600">
                                {new Date(booking.createdAt).toLocaleDateString("en-US", {
                                    year: "numeric", month: "long", day: "numeric"
                                })}
                            </p>
                        </div>
                        <div>
                            <p className="font-medium text-gray-700">Booking ID</p>
                            <p className="mt-1 font-mono text-sm text-gray-600">{booking.id}</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex justify-end mt-4">
                <EditBookingModal booking={booking} />
            </div>

            {/* Actions */}
            {canCancel && (
                <div className="rounded-xl border border-red-100 bg-red-50 p-5">
                    <h3 className="text-sm font-semibold text-red-800">Cancel Booking</h3>
                    <p className="mt-1 text-sm text-red-600">
                        You can cancel this booking as it is currently <strong>{status.label}</strong>.
                        This action cannot be undone.
                    </p>
                    <div className="mt-4">
                        <CancelBookingButton bookingId={booking.id} />
                    </div>
                </div>
            )}
        </div>
    );
}
