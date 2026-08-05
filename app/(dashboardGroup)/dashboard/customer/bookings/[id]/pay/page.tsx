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
                        className="mb-2 inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-primary transition-colors"
                    >
                        <ArrowLeft className="h-4 w-4" />
                        Back to Bookings
                    </Link>
                    <h1 className="text-2xl font-bold text-foreground">Booking Details</h1>
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
                <div className="rounded-xl border border-border bg-card p-6 shadow-sm">
                    <h2 className="mb-4 flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-muted-foreground">
                        <Wrench className="h-4 w-4" /> Service
                    </h2>
                    <h3 className="text-lg font-bold text-foreground">{booking.service?.title}</h3>
                    <p className="mt-1 text-sm text-muted-foreground">{booking.service?.description}</p>
                    <div className="mt-4 flex justify-between items-center gap-4 text-sm">
                        <span className="text-muted-foreground">
                            <span className="font-medium text-foreground">Duration:</span> {booking.service?.duration} min
                        </span>
                        <span className="text-2xl font-bold text-primary dark:text-blue-500">${booking.totalAmount}</span>
                    </div>
                </div>

                {/* Technician Info */}
                <div className="rounded-xl border border-border bg-card p-6 shadow-sm">
                    <h2 className="mb-4 flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-muted-foreground">
                        <User className="h-4 w-4" /> Technician
                    </h2>
                    <div className="flex items-center gap-3">
                        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary/10">
                            <User className="h-6 w-6 text-primary" />
                        </div>
                        <div>
                            <p className="font-semibold text-foreground">{booking.technician?.user?.name}</p>
                            <p className="text-sm text-muted-foreground">{booking.technician?.user?.email}</p>
                            {booking.technician?.user?.phone && (
                                <p className="text-sm text-muted-foreground">{booking.technician.user.phone}</p>
                            )}
                        </div>
                    </div>
                    {booking.technician?.location && (
                        <div className="mt-4 flex items-center gap-2 text-sm text-muted-foreground">
                            <MapPin className="h-4 w-4" />
                            <span>{booking.technician.location}</span>
                        </div>
                    )}
                </div>

                {/* Schedule Info */}
                <div className="rounded-xl border border-border bg-card p-6 shadow-sm">
                    <h2 className="mb-4 flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-muted-foreground">
                        <CalendarDays className="h-4 w-4" /> Schedule
                    </h2>
                    <div className="space-y-3 text-sm">
                        <div className="flex items-center gap-2">
                            <Clock className="h-4 w-4 text-muted-foreground" />
                            <span className="text-foreground">
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
                            <div className="rounded-lg bg-muted/30 dark:bg-muted/20 px-4 py-3">
                                <p className="text-xs font-medium text-muted-foreground mb-1">Slot Window</p>
                                <p className="font-medium text-foreground">
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
                            <MapPin className="h-4 w-4 shrink-0 text-muted-foreground mt-0.5" />
                            <span className="text-foreground">{booking.address}</span>
                        </div>
                    </div>
                </div>

                {/* Payment & Additional Info */}
                <div className="rounded-xl border border-border bg-card p-6 shadow-sm">
                    <h2 className="mb-4 flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-muted-foreground">
                        <FileText className="h-4 w-4" /> Payment & Info
                    </h2>
                    <div className="space-y-3 text-sm">
                        <div>
                            <p className="font-medium text-foreground">Total Amount</p>
                            <p className="mt-1 text-2xl font-bold text-primary dark:text-blue-500">${booking.totalAmount}</p>
                        </div>
                        <div>
                            <p className="font-medium text-foreground">Notes</p>
                            <p className="mt-1 text-muted-foreground">
                                {booking.notes || "No special instructions provided."}
                            </p>
                        </div>
                        <div>
                            <p className="font-medium text-foreground">Booking Created</p>
                            <p className="mt-1 text-muted-foreground">
                                {new Date(booking.createdAt).toLocaleDateString("en-US", {
                                    year: "numeric", month: "long", day: "numeric"
                                })}
                            </p>
                        </div>
                        <div>
                            <p className="font-medium text-foreground">Booking ID</p>
                            <p className="mt-1 font-mono text-sm text-muted-foreground">{booking.id}</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Payment Actions */}
            <div className="space-y-3">
                {canPay && (
                    <div className="rounded-lg bg-blue-50 dark:bg-muted p-4 border border-blue-200 dark:border-muted">
                        <p className="text-blue-700 dark:text-blue-500 mb-3">
                            This booking has been accepted by the technician. Please complete the payment to confirm your booking.
                        </p>

                        <PaymentButton
                            bookingId={booking.id}
                            amount={booking.totalAmount}
                            status={booking.status}
                        />
                    </div>
                )}
                {booking.payment && (
                    <Link
                        href={`/dashboard/customer/bookings/${booking.id}/payment-details`}
                        className="inline-flex items-center gap-2 rounded-lg border bg-purple-100 text-purple-800 px-4 py-2.5 text-sm font-medium"
                    >
                        <CreditCard className="h-4 w-4" />
                        View Payment Details
                    </Link>
                )}
            </div>

            {/* Allow to Edit Booking */}
            {canEdit && (
                <div className="flex justify-end">
                    <EditBookingModal booking={booking} />
                </div>
            )}

            {/* Allow to Cancel Booking */}
            {canCancel && (
                <div className="rounded-xl border border-red-100 dark:border-red-800 bg-red-50 dark:bg-red-950/30 p-5">
                    <h3 className="text-sm font-semibold text-red-800 dark:text-red-300">Cancel Booking</h3>
                    <p className="mt-1 text-sm text-red-600 dark:text-red-400">
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
                <div className="rounded-xl border border-border bg-card p-6 shadow-sm">
                    <h2 className="mb-4 flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-muted-foreground">
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
                                            : "fill-muted text-muted-foreground"
                                            }`}
                                    />
                                ))}
                                <span className="ml-2 text-sm font-medium text-foreground">
                                    {booking.review?.rating} out of 5
                                </span>
                            </div>
                            {booking.review?.comment && (
                                <p className="text-sm italic text-foreground">
                                    &quot;{booking.review.comment}&quot;
                                </p>
                            )}
                            <div className="flex items-center gap-3">
                                <p className="text-sm text-muted-foreground">
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
                            <p className="text-sm text-muted-foreground">
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
                <div className="rounded-lg bg-red-50 dark:bg-red-950/30 p-4 border border-red-200 dark:border-red-800">
                    <p className="text-sm text-red-700 dark:text-red-300 flex items-center gap-2">
                        <Ban className="h-4 w-4" />
                        This booking has been cancelled. No further actions can be taken.
                    </p>
                </div>
            )}

            {/* Declined Status Message */}
            {booking.status === "DECLINED" && (
                <div className="rounded-lg bg-muted/30 dark:bg-muted/20 p-4 border border-border">
                    <p className="text-sm text-muted-foreground flex items-center gap-2">
                        <ThumbsDown className="h-4 w-4" />
                        This booking was declined by the technician.
                    </p>
                </div>
            )}

            {/* Paid Status Message */}
            {booking.status === "PAID" && (
                <div className="rounded-lg bg-indigo-50 dark:bg-indigo-950/30 p-4 border border-indigo-200 dark:border-indigo-800">
                    <p className="text-sm text-indigo-700 dark:text-indigo-300 flex items-center gap-2">
                        <CreditCard className="h-4 w-4" />
                        Payment completed. The technician will start working on your booking soon.
                    </p>
                </div>
            )}

            {/* In Progress Status Message */}
            {booking.status === "IN_PROGRESS" && (
                <div className="rounded-lg bg-amber-50 dark:bg-amber-950/30 p-4 border border-amber-200 dark:border-amber-800">
                    <p className="text-sm text-amber-700 dark:text-amber-300 flex items-center gap-2">
                        <Loader2 className="h-4 w-4" />
                        The technician is currently working on your booking.
                    </p>
                </div>
            )}

            {/* Completed Status Message */}
            {booking.status === "COMPLETED" && (
                <div className="rounded-lg bg-green-50 dark:bg-green-950/30 p-4 border border-green-200 dark:border-green-800">
                    <p className="text-sm text-green-700 dark:text-green-300 flex items-center gap-2">
                        <ThumbsUp className="h-4 w-4" />
                        This booking has been completed. Thank you for using our service!
                    </p>
                </div>
            )}
        </div>
    );
}
