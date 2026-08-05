import { BookingCardProps, STATUS_LABELS, nonCancellableStatuses } from "@/lib/bookingConstants";
import { Clock, MapPin, User, ArrowRight, Star } from "lucide-react";
import Link from "next/link";
import { CancelBookingButton } from "./CancelBookingButton";
import { ReviewFormDialog } from "./review/ReviewFormDialog";

export function BookingCard({ booking, statusColors }: BookingCardProps) {
    const canCancel = !nonCancellableStatuses.includes(booking.status);
    const canReview = booking.status === "COMPLETED";
    const hasReview = booking.review !== null && booking.review !== undefined;

    // console.log(hasReview, "review");

    return (
        <div className="rounded-xl border border-border bg-card p-5 shadow-sm transition-shadow hover:shadow-md">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                {/* Left info */}
                <div className="flex-1 space-y-2">
                    <div className="flex flex-wrap items-center gap-2">
                        <h3 className="font-semibold text-foreground">{booking.service?.title}</h3>
                        <span
                            className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium ${statusColors[booking.status]}`}
                        >
                            {STATUS_LABELS[booking.status]}
                        </span>
                        {hasReview && (
                            <span className="inline-flex items-center rounded-full bg-yellow-100 dark:bg-yellow-900/30 px-2.5 py-0.5 text-xs font-medium text-yellow-700 dark:text-yellow-300">
                                <Star className="h-3 w-3 mr-1 fill-yellow-500" />
                                Reviewed
                            </span>
                        )}
                    </div>

                    <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-muted-foreground">
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
                    <p className="text-lg font-bold text-primary dark:text-blue-500">${booking.totalAmount}</p>
                    <div className="flex flex-wrap items-center gap-4 justify-end">
                        {canCancel && <CancelBookingButton bookingId={booking.id} />}
                        {/* {canReview && !hasReview && (
                            <ReviewFormDialog
                                mode="create"
                                booking={booking}
                                review={booking.review}
                            />
                        )} */}

                        {canReview && (
                            <ReviewFormDialog
                                mode={hasReview ? "edit" : "create"}
                                booking={booking}
                                review={booking.review}
                            />
                        )}
                        <Link
                            href={`/dashboard/customer/bookings/${booking.id}/pay`}
                            className="flex items-center gap-1 rounded-lg border border-border bg-muted/30 px-3 py-1.5 text-sm font-semibold transition hover:border-primary/40 hover:text-primary"
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
