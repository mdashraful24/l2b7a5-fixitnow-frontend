import { notFound, redirect } from "next/navigation";
import { getMe } from "@/services/getMe";
import { getTechnicianBookings } from "@/app/(dashboardGroup)/_actions/technician";
import { TechnicianBookingActions } from "../../_components/TechnicianBookingActions";
import {
    CalendarDays,
    MapPin,
    User2,
    FileText,
    Phone,
    Mail,
    Star,
    ThumbsUp,
    MessageCircle
} from "lucide-react";
import { statusBadges } from "@/lib/bookingConstants";

export default async function TechnicianBookingDetailsPage({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const user = await getMe();

    if (!user?.success) {
        redirect("/auth/login");
    }

    if (user.data?.role !== "TECHNICIAN") {
        redirect("/");
    }

    const { id } = await params;
    const response = await getTechnicianBookings();
    const allBookings = response.data ?? [];
    const booking = allBookings.find((item) => item.id === id);

    if (!booking) {
        notFound();
    }

    // Check if review exists
    const hasReview = booking.review !== null && booking.review !== undefined;
    const isCompleted = booking.status === "COMPLETED";

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col gap-4 rounded-2xl border bg-white p-6 shadow-sm lg:flex-row lg:items-center lg:justify-between">
                <div>
                    <p className="text-sm font-medium text-primary">Booking details</p>
                    <h1 className="mt-1 text-2xl font-bold text-gray-900">{booking.service?.title}</h1>
                    <p className="mt-1 text-sm text-gray-500">Full job information and technician actions.</p>
                </div>
                <span className={`inline-flex rounded-full border px-3 py-1.5 text-sm font-medium ${statusBadges[booking.status] || "bg-gray-100 text-gray-600 border-gray-200"}`}>
                    {booking.status}
                </span>
            </div>

            <div className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
                {/* Left Column */}
                <div className="space-y-6">
                    {/* Service and schedule */}
                    <div className="rounded-2xl border bg-white p-6 shadow-sm">
                        <h2 className="text-lg font-semibold text-gray-900">Service and schedule</h2>
                        <div className="mt-4 grid gap-4 md:grid-cols-2">
                            <Info label="Service" value={booking.service?.title} />
                            <Info label="Price" value={`$${booking.totalAmount}`} />
                            <Info label="Duration" value={`${booking.service?.duration} min`} />
                            <Info
                                label="Scheduled at"
                                value={new Date(booking.scheduledAt).toLocaleString("en-US", {
                                    weekday: "long",
                                    year: "numeric",
                                    month: "long",
                                    day: "numeric",
                                    hour: "2-digit",
                                    minute: "2-digit",
                                })}
                            />
                        </div>
                    </div>

                    {/* Location and notes */}
                    <div className="rounded-2xl border bg-white p-6 shadow-sm">
                        <h2 className="text-lg font-semibold text-gray-900">Location and notes</h2>
                        <div className="mt-4 space-y-4 text-sm text-gray-600">
                            <div className="flex items-start gap-3">
                                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                                <span>{booking.address}</span>
                            </div>
                            <div className="flex items-start gap-3">
                                <FileText className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                                <span>{booking.notes || "No notes provided by the customer."}</span>
                            </div>
                        </div>
                    </div>

                    {/* Review Section - Show booking-specific review */}
                    {isCompleted && hasReview && (
                        <div className="rounded-2xl border bg-white p-6 shadow-sm">
                            <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                                <ThumbsUp className="h-5 w-5 text-green-500" />
                                Customer Review for this Booking
                            </h2>
                            <div className="mt-4 space-y-3">
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
                                    <div className="rounded-lg bg-gray-50 p-4">
                                        <div className="flex items-start gap-2">
                                            <MessageCircle className="h-4 w-4 text-gray-400 mt-0.5" />
                                            <p className="text-sm text-gray-700 italic">
                                                {booking.review.comment}
                                            </p>
                                        </div>
                                    </div>
                                )}
                                <div className="flex items-center gap-2 text-xs text-gray-400">
                                    <span>
                                        Reviewed on {new Date(booking.review?.createdAt || "").toLocaleDateString("en-US", {
                                            year: "numeric",
                                            month: "long",
                                            day: "numeric",
                                        })}
                                    </span>
                                    {booking.review?.updatedAt &&
                                        booking.review?.createdAt !== booking.review?.updatedAt && (
                                            <span>
                                                (Updated on {new Date(booking.review.updatedAt).toLocaleDateString()})
                                            </span>
                                        )}
                                </div>
                                <div className="rounded-lg bg-green-50 p-3 border border-green-200">
                                    <p className="text-sm text-green-700 flex items-center gap-2">
                                        <ThumbsUp className="h-4 w-4" />
                                        Customer was satisfied with your service!
                                    </p>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* If booking is completed but no review yet */}
                    {isCompleted && !hasReview && (
                        <div className="rounded-2xl border bg-white p-6 shadow-sm">
                            <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                                <ThumbsUp className="h-5 w-5 text-gray-400" />
                                Customer Review
                            </h2>
                            <div className="mt-4">
                                <div className="rounded-lg bg-gray-50 p-4 text-center">
                                    <p className="text-sm text-gray-500">
                                        No review yet from the customer.
                                    </p>
                                    <p className="text-xs text-gray-400 mt-1">
                                        Reviews are automatically posted when customers complete their feedback.
                                    </p>
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                {/* Right Column */}
                <div className="space-y-6">
                    {/* Customer information */}
                    <div className="rounded-2xl border bg-white p-6 shadow-sm">
                        <h2 className="text-lg font-semibold text-gray-900">Customer information</h2>
                        <div className="mt-4 space-y-3 text-sm text-gray-600">
                            <div className="flex items-center gap-3">
                                <User2 className="h-4 w-4 text-primary" />
                                <span>{booking.customer?.name}</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <Mail className="h-4 w-4 text-primary" />
                                <span>{booking.customer?.email}</span>
                            </div>
                            {booking.customer?.phone && (
                                <div className="flex items-center gap-3">
                                    <Phone className="h-4 w-4 text-primary" />
                                    <span>{booking.customer.phone}</span>
                                </div>
                            )}
                            <div className="flex items-center gap-3">
                                <CalendarDays className="h-4 w-4 text-primary" />
                                <span>Requested on {new Date(booking.createdAt).toLocaleDateString("en-US", {
                                    year: "numeric",
                                    month: "long",
                                    day: "numeric",
                                })}</span>
                            </div>
                        </div>
                    </div>

                    {/* Actions */}
                    <div className="rounded-2xl border bg-white p-6 shadow-sm">
                        <h2 className="text-lg font-semibold">Actions</h2>
                        <p className="mt-1 text-sm text-gray-700">Progress the booking through your workflow when appropriate.</p>
                        <div className="mt-4">
                            <TechnicianBookingActions bookingId={booking.id} currentStatus={booking.status} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

function Info({ label, value }: { label: string; value: string }) {
    return (
        <div className="rounded-xl border bg-gray-50 p-4">
            <p className="text-xs font-medium uppercase tracking-wide text-gray-400">{label}</p>
            <p className="mt-2 text-sm font-semibold text-gray-900">{value}</p>
        </div>
    );
}






// import { notFound, redirect } from "next/navigation";
// import { getMe } from "@/services/getMe";
// import { getTechnicianBookings } from "@/app/(dashboardGroup)/_actions/technician";
// import { TechnicianBookingActions } from "../../_components/TechnicianBookingActions";
// import { CalendarDays, MapPin, User2, FileText, Phone, Mail } from "lucide-react";
// import { statusBadges } from "@/lib/bookingConstants";

// export default async function TechnicianBookingDetailsPage({
//     params,
// }: {
//     params: Promise<{ id: string }>;
// }) {
//     const user = await getMe();

//     if (!user?.success) {
//         redirect("/auth/login");
//     }

//     if (user.data?.role !== "TECHNICIAN") {
//         redirect("/");
//     }

//     const { id } = await params;
//     const response = await getTechnicianBookings();
//     const booking = (response.data ?? []).find((item) => item.id === id);

//     if (!booking) {
//         notFound();
//     }

//     return (
//         <div className="space-y-6">
//             <div className="flex flex-col gap-4 rounded-2xl border bg-white p-6 shadow-sm lg:flex-row lg:items-center lg:justify-between">
//                 <div>
//                     <p className="text-sm font-medium text-primary">Booking details</p>
//                     <h1 className="mt-1 text-2xl font-bold text-gray-900">{booking.service?.title}</h1>
//                     <p className="mt-1 text-sm text-gray-500">Full job information and technician actions.</p>
//                 </div>
//                 <span className={`inline-flex rounded-full border px-3 py-1.5 text-sm font-medium ${statusBadges[booking.status] || "bg-gray-100 text-gray-600 border-gray-200"}`}>
//                     {booking.status}
//                 </span>
//             </div>

//             <div className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
//                 <div className="space-y-6">
//                     <div className="rounded-2xl border bg-white p-6 shadow-sm">
//                         <h2 className="text-lg font-semibold text-gray-900">Service and schedule</h2>
//                         <div className="mt-4 grid gap-4 md:grid-cols-2">
//                             <Info label="Service" value={booking.service?.title} />
//                             <Info label="Price" value={`$${booking.totalAmount}`} />
//                             <Info label="Duration" value={`${booking.service?.duration} min`} />
//                             <Info
//                                 label="Scheduled at"
//                                 value={new Date(booking.scheduledAt).toLocaleString("en-US", {
//                                     weekday: "long",
//                                     year: "numeric",
//                                     month: "long",
//                                     day: "numeric",
//                                     hour: "2-digit",
//                                     minute: "2-digit",
//                                 })}
//                             />
//                         </div>
//                     </div>

//                     <div className="rounded-2xl border bg-white p-6 shadow-sm">
//                         <h2 className="text-lg font-semibold text-gray-900">Location and notes</h2>
//                         <div className="mt-4 space-y-4 text-sm text-gray-600">
//                             <div className="flex items-start gap-3">
//                                 <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
//                                 <span>{booking.address}</span>
//                             </div>
//                             <div className="flex items-start gap-3">
//                                 <FileText className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
//                                 <span>{booking.notes || "No notes provided by the customer."}</span>
//                             </div>
//                         </div>
//                     </div>
//                 </div>

//                 <div className="space-y-6">
//                     <div className="rounded-2xl border bg-white p-6 shadow-sm">
//                         <h2 className="text-lg font-semibold text-gray-900">Customer information</h2>
//                         <div className="mt-4 space-y-3 text-sm text-gray-600">
//                             <div className="flex items-center gap-3">
//                                 <User2 className="h-4 w-4 text-primary" />
//                                 <span>{booking.customer?.name}</span>
//                             </div>
//                             <div className="flex items-center gap-3">
//                                 <Mail className="h-4 w-4 text-primary" />
//                                 <span>{booking.customer?.email}</span>
//                             </div>
//                             {booking.customer?.phone && (
//                                 <div className="flex items-center gap-3">
//                                     <Phone className="h-4 w-4 text-primary" />
//                                     <span>{booking.customer.phone}</span>
//                                 </div>
//                             )}
//                             <div className="flex items-center gap-3">
//                                 <CalendarDays className="h-4 w-4 text-primary" />
//                                 <span>Requested on {new Date(booking.createdAt).toLocaleDateString("en-US", {
//                                     year: "numeric",
//                                     month: "long",
//                                     day: "numeric",
//                                 })}</span>
//                             </div>
//                         </div>
//                     </div>

//                     <div className="rounded-2xl border bg-white p-6 shadow-sm">
//                         <h2 className="text-lg font-semibold text-gray-900">Actions</h2>
//                         <p className="mt-1 text-sm text-gray-500">Progress the booking through your workflow when appropriate.</p>
//                         <div className="mt-4">
//                             <TechnicianBookingActions bookingId={booking.id} currentStatus={booking.status} />
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// }

// function Info({ label, value }: { label: string; value: string }) {
//     return (
//         <div className="rounded-xl border bg-gray-50 p-4">
//             <p className="text-xs font-medium uppercase tracking-wide text-gray-400">{label}</p>
//             <p className="mt-2 text-sm font-semibold text-gray-900">{value}</p>
//         </div>
//     );
// }