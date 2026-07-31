import { notFound } from "next/navigation";
import { BookingStatus } from "@/lib/type";
import { ArrowLeft, CalendarDays, Clock, MapPin, User, FileText, Wrench, ThumbsDown, CreditCard, Loader2, ThumbsUp, Ban, Star } from "lucide-react";
import Link from "next/link";
import { bookingStatusBadge } from "@/lib/bookingConstants";
import { getSingleBooking } from "@/app/(dashboardGroup)/_actions/getBookings";
import { PaymentButton } from "../../../_components/payment/PaymentButton";
import { EditBookingModal } from "../../../_components/EditBookingModal";
import { CancelBookingButton } from "../../../_components/CancelBookingButton";
import { ReviewFormDialog } from "../../../_components/review/ReviewFormDialog";

const cancellableStatuses: BookingStatus[] = [
    "REQUESTED",
    "ACCEPTED",
];

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

    const status = bookingStatusBadge[booking.status as BookingStatus];

    const canCancel = cancellableStatuses.includes(booking.status as BookingStatus);
    const canPay = booking.status === "ACCEPTED";
    const canEdit = booking.status === "REQUESTED" || booking.status === "ACCEPTED";
    const canReview = booking.status === "COMPLETED";
    const hasReview = booking.review !== null && booking.review !== undefined;

    const StatusIcon = status.icon;

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between flex-wrap gap-4">
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
                    className={`flex items-center gap-1.5 rounded-full border px-4 py-1.5 text-sm font-medium ${status.bg} ${status.text} ${status.border}`}
                >
                    <StatusIcon className="h-4 w-4" />
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

                {/* Payment & Additional Info */}
                <div className="rounded-xl border bg-white p-6 shadow-sm">
                    <h2 className="mb-4 flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-gray-600">
                        <FileText className="h-4 w-4" /> Payment & Info
                    </h2>
                    <div className="space-y-3 text-sm">
                        <div>
                            <p className="font-medium text-gray-700">Total Amount</p>
                            <p className="mt-1 text-2xl font-bold text-primary">${booking.totalAmount}</p>
                        </div>
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

            {/* Allow to make payment */}
            {canPay && (
                <div className="rounded-lg bg-blue-50 p-4 border border-blue-200">
                    <p className="text-sm text-blue-700 mb-3">
                        This booking has been accepted by the technician. Please complete the payment to confirm your booking.
                    </p>
                    <PaymentButton
                        bookingId={booking.id}
                        amount={booking.totalAmount}
                        status={booking.status}
                    />
                </div>
            )}

            {/* Allow to Edit Booking */}
            {canEdit && (
                <div className="flex justify-end">
                    <EditBookingModal booking={booking} />
                </div>
            )}

            {/* Allow to Cancel Booking */}
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

            {/* Review Section */}
            {canReview && (
                <div className="rounded-xl border bg-white p-6 shadow-sm">
                    <h2 className="mb-4 flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-gray-600">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" /> Review
                    </h2>

                    {hasReview ? (
                        <div className="space-y-3">
                            <div className="flex items-center gap-2">
                                {[1, 2, 3, 4, 5].map((star) => (
                                    <Star
                                        key={star}
                                        className={`h-5 w-5 ${star <= (booking.review?.rating || 0)
                                                ? "fill-yellow-400 text-yellow-400"
                                                : "fill-gray-200 text-gray-200"
                                            }`}
                                    />
                                ))}
                                <span className="ml-2 text-sm font-medium text-gray-700">
                                    {booking.review?.rating} out of 5
                                </span>
                            </div>
                            {booking.review?.comment && (
                                <p className="text-sm italic">
                                    &quot;{booking.review.comment}&quot;
                                </p>
                            )}
                            <div className="flex items-center gap-3">
                                <p className="text-sm">
                                    Reviewed on {new Date(booking.review?.createdAt || "").toLocaleDateString()}
                                </p>
                                <ReviewFormDialog
                                    mode="edit"
                                    booking={booking}
                                    review={booking.review}
                                />
                            </div>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            <p className="text-sm">
                                This booking is complete. Share your experience with the technician.
                            </p>
                            <ReviewFormDialog
                                mode="create"
                                booking={booking}
                                review={null}
                            />
                        </div>
                    )}
                </div>
            )}

            {/* Cancelled Status Message */}
            {booking.status === "CANCELLED" && (
                <div className="rounded-lg bg-red-50 p-4 border border-red-200">
                    <p className="text-sm text-red-700 flex items-center gap-2">
                        <Ban className="h-4 w-4" />
                        This booking has been cancelled. No further actions can be taken.
                    </p>
                </div>
            )}

            {/* Declined Status Message */}
            {booking.status === "DECLINED" && (
                <div className="rounded-lg bg-gray-50 p-4 border border-gray-200">
                    <p className="text-sm text-gray-700 flex items-center gap-2">
                        <ThumbsDown className="h-4 w-4" />
                        This booking was declined by the technician.
                    </p>
                </div>
            )}

            {/* Paid Status Message */}
            {booking.status === "PAID" && (
                <div className="rounded-lg bg-indigo-50 p-4 border border-indigo-200">
                    <p className="text-sm text-indigo-700 flex items-center gap-2">
                        <CreditCard className="h-4 w-4" />
                        Payment completed. The technician will start working on your booking soon.
                    </p>
                </div>
            )}

            {/* In Progress Status Message */}
            {booking.status === "IN_PROGRESS" && (
                <div className="rounded-lg bg-amber-50 p-4 border border-amber-200">
                    <p className="text-sm text-amber-700 flex items-center gap-2">
                        <Loader2 className="h-4 w-4" />
                        The technician is currently working on your booking.
                    </p>
                </div>
            )}

            {/* Completed Status Message */}
            {booking.status === "COMPLETED" && (
                <div className="rounded-lg bg-green-50 p-4 border border-green-200">
                    <p className="text-sm text-green-700 flex items-center gap-2">
                        <ThumbsUp className="h-4 w-4" />
                        This booking has been completed. Thank you for using our service!
                    </p>
                </div>
            )}
        </div>
    );
}
