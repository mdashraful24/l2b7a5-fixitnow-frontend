import { getAllBookings } from "../../_actions/getBookings";
import { IBooking, BookingStatus } from "@/lib/type";
import { CalendarDays, CheckCircle, Clock, XCircle, Package, FileText } from "lucide-react";
import Link from "next/link";
import { BookingCard } from "./_components/BookingCard";

type StatusFilter = BookingStatus | "ALL";

const statusTabs: { label: string; value: StatusFilter; icon: React.ReactNode }[] = [
    { label: "All", value: "ALL", icon: <Package className="h-4 w-4" /> },
    { label: "Requested", value: "REQUESTED", icon: <Clock className="h-4 w-4" /> },
    { label: "Accepted", value: "ACCEPTED", icon: <CheckCircle className="h-4 w-4" /> },
    { label: "Declined", value: "DECLINED", icon: <XCircle className="h-4 w-4" /> },
    { label: "Paid", value: "PAID", icon: <FileText className="h-4 w-4" /> },
    { label: "In Progress", value: "IN_PROGRESS", icon: <Clock className="h-4 w-4" /> },
    { label: "Completed", value: "COMPLETED", icon: <CheckCircle className="h-4 w-4" /> },
    { label: "Cancelled", value: "CANCELLED", icon: <XCircle className="h-4 w-4" /> },
];

const statusColors: Record<BookingStatus, string> = {
    REQUESTED: "bg-blue-50 text-blue-700 border-blue-200",
    ACCEPTED: "bg-teal-100 text-teal-700 border-teal-200",
    DECLINED: "bg-indigo-50 text-indigo-700 border-indigo-200",
    PAID: "bg-indigo-50 text-indigo-700 border-indigo-200",
    IN_PROGRESS: "bg-amber-50 text-amber-700 border-amber-200",
    COMPLETED: "bg-green-50 text-green-700 border-green-200",
    CANCELLED: "bg-red-50 text-red-700 border-red-200",
};

export default async function CustomerDashboardPage({
    searchParams,
}: {
    searchParams: Promise<{ status?: string }>;
}) {
    const params = await searchParams;
    const activeStatus = (params.status as StatusFilter) || "ALL";

    const result = await getAllBookings(activeStatus === "ALL" ? undefined : activeStatus);
    const bookings: IBooking[] = result?.data ?? [];

    // Stats from all bookings (we fetch all once for stats, filter separately)
    const allResult = await getAllBookings();

    const allBookings = Array.isArray(allResult?.data)
        ? allResult.data
        : [];

    const stats = {
        total: allBookings.length,
        requested: allBookings.filter((b: IBooking) => b.status === "REQUESTED").length,
        accepted: allBookings.filter((b: IBooking) => b.status === "ACCEPTED").length,
        declined: allBookings.filter((b: IBooking) => b.status === "DECLINED").length,
        paid: allBookings.filter((b: IBooking) => b.status === "PAID").length,
        inProgress: allBookings.filter((b: IBooking) => b.status === "IN_PROGRESS").length,
        completed: allBookings.filter((b: IBooking) => b.status === "COMPLETED").length,
        cancelled: allBookings.filter((b: IBooking) => b.status === "CANCELLED").length,
    };

    return (
        <div className="space-y-8">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Dashboard Overview</h1>
                    <p className="mt-1 text-sm text-gray-500">Manage all your service bookings here.</p>
                </div>
                <Link
                    href="/services"
                    className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-white transition hover:bg-primary/90"
                >
                    <CalendarDays className="h-4 w-4" />
                    Book a Service
                </Link>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 xl:grid-cols-5">
                {[
                    { label: "Total", value: stats.total, color: "bg-gray-900", text: "text-white" },
                    { label: "Requested", value: stats.requested, color: "bg-blue-500", text: "text-white" },
                    { label: "Accepted", value: stats.accepted, color: "bg-teal-500", text: "text-white" },
                    { label: "Declined", value: stats.declined, color: "bg-indigo-500", text: "text-white" },
                    { label: "Paid", value: stats.paid, color: "bg-indigo-500", text: "text-white" },
                    { label: "Completed", value: stats.completed, color: "bg-green-500", text: "text-white" },
                    { label: "Cancelled", value: stats.cancelled, color: "bg-red-400", text: "text-white" },
                ].map((stat) => (
                    <div key={stat.label} className={`rounded-xl p-5 ${stat.color} shadow-sm`}>
                        <p className={`text-2xl font-bold ${stat.text}`}>{stat.value}</p>
                        <p className={`text-xs mt-1 font-medium ${stat.text} opacity-80`}>{stat.label}</p>
                    </div>
                ))}
            </div>

            {/* Status Tabs */}
            <div>
                <div className="flex flex-wrap gap-2 border-b pb-4">
                    {statusTabs.map((tab) => {
                        const isActive = activeStatus === tab.value;
                        return (
                            <Link
                                key={tab.value}
                                href={tab.value === "ALL" ? "/dashboard/customer" : `/dashboard/customer?status=${tab.value}`}
                                className={`flex items-center gap-1.5 rounded-lg px-4 py-2 text-sm font-medium transition-all border ${
                                    isActive
                                        ? "border-primary bg-primary text-white"
                                        : "border-gray-200 bg-white text-gray-600 hover:border-primary/40 hover:text-primary"
                                }`}
                            >
                                {tab.icon}
                                {tab.label}
                            </Link>
                        );
                    })}
                </div>

                {/* Bookings List */}
                <div className="mt-6 space-y-4">
                    {bookings.length === 0 ? (
                        <div className="flex flex-col items-center justify-center rounded-xl border border-dashed bg-white py-16 text-center">
                            <CalendarDays className="h-12 w-12 text-gray-300" />
                            <h3 className="mt-4 text-lg font-semibold text-gray-600">No bookings found</h3>
                            <p className="mt-1 text-sm text-gray-400">
                                {activeStatus === "ALL"
                                    ? "You haven't booked any services yet."
                                    : `No ${activeStatus.toLowerCase()} bookings.`}
                            </p>
                            <Link
                                href="/services"
                                className="mt-6 rounded-lg bg-primary px-6 py-2.5 text-sm font-semibold text-white hover:bg-primary/90"
                            >
                                Browse Services
                            </Link>
                        </div>
                    ) : (
                        bookings.map((booking) => (
                            <BookingCard
                                key={booking.id}
                                booking={booking}
                                statusColors={statusColors}
                            />
                        ))
                    )}
                </div>
            </div>
        </div>
    );
}
