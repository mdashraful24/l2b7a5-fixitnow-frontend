import Link from "next/link";
import { redirect } from "next/navigation";
import { CalendarDays, Clock3, Filter, MapPin, User2 } from "lucide-react";
import { getMe } from "@/services/getMe";
import { getTechnicianBookings } from "@/app/(dashboardGroup)/_actions/technician";
import { TechnicianBookingActions } from "../_components/TechnicianBookingActions";
import { StatusFilter } from "@/lib/type";

const statusTabs: { label: string; value: StatusFilter }[] = [
    { label: "All", value: "ALL" },
    { label: "Requested", value: "REQUESTED" },
    { label: "Accepted", value: "ACCEPTED" },
    { label: "Declined", value: "DECLINED" },
    { label: "Paid", value: "PAID" },
    { label: "In Progress", value: "IN_PROGRESS" },
    { label: "Completed", value: "COMPLETED" },
    { label: "Cancelled", value: "CANCELLED" },
];

const statusBadge: Record<string, string> = {
    REQUESTED: "bg-blue-50 text-blue-700 border-blue-200",
    ACCEPTED: "bg-teal-100 text-teal-700 border-teal-200",
    DECLINED: "bg-indigo-50 text-indigo-700 border-indigo-200",
    PAID: "bg-indigo-50 text-indigo-700 border-indigo-200",
    IN_PROGRESS: "bg-amber-50 text-amber-700 border-amber-200",
    COMPLETED: "bg-green-50 text-green-700 border-green-200",
    CANCELLED: "bg-red-50 text-red-700 border-red-200",
};

export default async function TechnicianBookingsPage({
    searchParams,
}: {
    searchParams: Promise<{ status?: string }>;
}) {
    const user = await getMe();

    if (!user?.success) {
        redirect("/auth/login");
    }

    if (user.data?.role !== "TECHNICIAN") {
        redirect("/");
    }

    const params = await searchParams;
    const activeStatus = (params.status as StatusFilter) || "ALL";

    const [allBookingsResponse, filteredBookingsResponse] = await Promise.all([
        getTechnicianBookings(),
        getTechnicianBookings(activeStatus === "ALL" ? undefined : { status: activeStatus }),
    ]);

    const allBookings = allBookingsResponse.data ?? [];
    const bookings = filteredBookingsResponse.data ?? [];

    const stats = {
        total: allBookings.length,
        requested: allBookings.filter((booking) => booking.status === "REQUESTED").length,
        accepted: allBookings.filter((booking) => booking.status === "ACCEPTED").length,
        declined: allBookings.filter((booking) => booking.status === "DECLINED").length,
        paid: allBookings.filter((booking) => booking.status === "PAID").length,
        inProgress: allBookings.filter((booking) => booking.status === "IN_PROGRESS").length,
        completed: allBookings.filter((booking) => booking.status === "COMPLETED").length,
        cancelled: allBookings.filter((booking) => booking.status === "CANCELLED").length,
    };

    return (
        <div className="space-y-6">
            <div className="flex flex-col gap-4 rounded-2xl border bg-white p-6 shadow-sm lg:flex-row lg:items-center lg:justify-between">
                <div>
                    <p className="text-sm font-medium text-primary">Booking management</p>
                    <h1 className="mt-1 text-2xl font-bold text-gray-900">Incoming booking requests</h1>
                    <p className="mt-1 text-sm text-gray-500">Accept, decline, start, and complete assigned jobs from one place.</p>
                </div>
                <Link href="/dashboard/technician/availability" className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-white hover:bg-primary/90">
                    <CalendarDays className="h-4 w-4" />
                    Adjust schedule
                </Link>
            </div>

            <div className="grid grid-cols-2 gap-4 xl:grid-cols-4">
                {[
                    { label: "Total Bookings", value: stats.total },
                    { label: "Requested", value: stats.requested },
                    { label: "Accepted", value: stats.accepted },
                    { label: "Declined", value: stats.declined },
                    { label: "Paid", value: stats.paid },
                    { label: "In Progress", value: stats.inProgress },
                    { label: "Completed", value: stats.completed },
                    { label: "Cancelled", value: stats.cancelled },
                ].map((item) => (
                    <div key={item.label} className="rounded-2xl border bg-white p-5 shadow-sm">
                        <p className="text-sm text-gray-500">{item.label}</p>
                        <p className="mt-2 text-3xl font-bold text-gray-900">{item.value}</p>
                    </div>
                ))}
            </div>

            <div className="flex flex-wrap gap-2 border-b pb-4">
                {statusTabs.map((tab) => {
                    const isActive = activeStatus === tab.value;
                    return (
                        <Link
                            key={tab.value}
                            href={tab.value === "ALL" ? "/dashboard/technician/bookings" : `/dashboard/technician/bookings?status=${tab.value}`}
                            className={`rounded-lg border px-4 py-2 text-sm font-medium transition ${
                                isActive
                                    ? "border-primary bg-primary text-white"
                                    : "border-gray-200 bg-white text-gray-600 hover:border-primary/40 hover:text-primary"
                            }`}
                        >
                            {tab.label}
                        </Link>
                    );
                })}
            </div>

            <div className="space-y-4">
                {bookings.length === 0 ? (
                    <div className="rounded-2xl border border-dashed bg-white p-10 text-center text-sm text-gray-500 shadow-sm">
                        No bookings found for the selected filter.
                    </div>
                ) : (
                    bookings.map((booking) => (
                        <div key={booking.id} className="rounded-2xl border bg-white p-5 shadow-sm">
                            <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                                <div className="space-y-3">
                                    <div className="flex flex-wrap items-center gap-2">
                                        <h3 className="text-lg font-semibold text-gray-900">{booking.service?.title}</h3>
                                        <span className={`rounded-full border px-2.5 py-0.5 text-xs font-medium ${statusBadge[booking.status] || "bg-gray-100 text-gray-600 border-gray-200"}`}>
                                            {booking.status}
                                        </span>
                                    </div>

                                    <div className="flex flex-wrap gap-x-5 gap-y-2 text-sm text-gray-500">
                                        <span className="flex items-center gap-1.5">
                                            <User2 className="h-4 w-4" />
                                            {booking.customer?.name || "Customer"}
                                        </span>
                                        <span className="flex items-center gap-1.5">
                                            <Clock3 className="h-4 w-4" />
                                            {new Date(booking.scheduledAt).toLocaleString("en-US", {
                                                weekday: "short",
                                                year: "numeric",
                                                month: "short",
                                                day: "numeric",
                                                hour: "2-digit",
                                                minute: "2-digit",
                                            })}
                                        </span>
                                        <span className="flex items-center gap-1.5">
                                            <MapPin className="h-4 w-4" />
                                            <span className="line-clamp-1 max-w-[24rem]">{booking.address}</span>
                                        </span>
                                    </div>

                                    <p className="text-sm text-gray-500">
                                        {booking.notes || "No notes provided by the customer."}
                                    </p>
                                </div>

                                <div className="space-y-3 lg:min-w-56 lg:text-right">
                                    <p className="text-2xl font-bold text-primary">${booking.totalAmount}</p>
                                    <TechnicianBookingActions bookingId={booking.id} currentStatus={booking.status} />
                                    <div className="flex justify-end">
                                        <Link href={`/dashboard/technician/bookings/${booking.id}`} className="text-sm font-medium text-gray-500 hover:text-primary hover:underline">
                                            Open details
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}