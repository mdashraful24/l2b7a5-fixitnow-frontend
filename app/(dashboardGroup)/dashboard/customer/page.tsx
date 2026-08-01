import { getAllBookings } from "../../_actions/getBookings";
import { IBooking } from "@/lib/type";
import {
    CalendarDays,
    CheckCircle,
    Clock,
    Loader2,
    Ban,
    ThumbsUp,
    ThumbsDown,
    CreditCard
} from "lucide-react";
import Link from "next/link";
import { BookingCard } from "./_components/BookingCard";
import { statusColors, StatusFilter, statusTabs } from "@/lib/bookingConstants";

export default async function CustomerDashboardPage({
    searchParams,
}: {
    searchParams: Promise<{ status?: string }>;
}) {
    const params = await searchParams;
    const activeStatus = (params.status as StatusFilter) || "ALL";

    const result = await getAllBookings(activeStatus === "ALL" ? undefined : activeStatus);
    const bookings: IBooking[] = result?.data ?? [];

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
            <div className="flex flex-col gap-4 rounded-2xl border border-border bg-card p-6 shadow-sm lg:flex-row lg:items-center lg:justify-between">
                <div>
                    <p className="text-sm font-medium text-primary dark:text-blue-500">Customer dashboard</p>
                    <h1 className="mt-1 text-2xl font-bold text-foreground">Dashboard Overview</h1>
                    <p className="mt-1 text-sm text-muted-foreground">Manage all your service bookings here.</p>
                </div>
                <Link
                    href="/services"
                    className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground transition hover:bg-primary/90"
                >
                    <CalendarDays className="h-4 w-4" />
                    Book a Service
                </Link>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-4 xl:grid-cols-4">
                {[
                    {
                        label: "Total Bookings",
                        value: stats.total,
                        icon: CalendarDays,
                        color: "bg-gradient-to-br from-gray-700 to-gray-900",
                        iconColor: "text-gray-300"
                    },
                    {
                        label: "Requested",
                        value: stats.requested,
                        icon: Clock,
                        color: "bg-gradient-to-br from-blue-500 to-blue-600",
                        iconColor: "text-blue-200"
                    },
                    {
                        label: "Declined",
                        value: stats.declined,
                        icon: ThumbsDown,
                        color: "bg-gradient-to-br from-gray-400 to-gray-500",
                        iconColor: "text-gray-200"
                    },
                    {
                        label: "Accepted",
                        value: stats.accepted,
                        icon: CheckCircle,
                        color: "bg-gradient-to-br from-teal-500 to-teal-600",
                        iconColor: "text-teal-200"
                    },
                    {
                        label: "Paid",
                        value: stats.paid,
                        icon: CreditCard,
                        color: "bg-gradient-to-br from-indigo-500 to-indigo-600",
                        iconColor: "text-indigo-200"
                    },
                    {
                        label: "In Progress",
                        value: stats.inProgress,
                        icon: Loader2,
                        color: "bg-gradient-to-br from-amber-500 to-amber-600",
                        iconColor: "text-amber-200"
                    },
                    {
                        label: "Completed",
                        value: stats.completed,
                        icon: ThumbsUp,
                        color: "bg-gradient-to-br from-green-500 to-green-600",
                        iconColor: "text-green-200"
                    },
                    {
                        label: "Cancelled",
                        value: stats.cancelled,
                        icon: Ban,
                        color: "bg-gradient-to-br from-red-500 to-red-600",
                        iconColor: "text-red-200"
                    },
                ].map((item) => (
                    <div key={item.label} className={`${item.color} rounded-xl px-5 py-3 text-white shadow-lg transition-transform hover:scale-[1.02]`}>
                        <div className="flex items-center gap-2 mb-2">
                            <item.icon className={`h-5 w-5 ${item.iconColor}`} />
                            <p className="text-sm text-white/90">{item.label}</p>
                        </div>
                        <p className="text-3xl font-bold">{item.value}</p>
                    </div>
                ))}
            </div>

            {/* Status Tabs */}
            <div>
                <div className="flex flex-wrap gap-2 border-b border-border pb-4">
                    {statusTabs.map((tab) => {
                        const isActive = activeStatus === tab.value;
                        return (
                            <Link
                                key={tab.value}
                                href={tab.value === "ALL" ? "/dashboard/customer" : `/dashboard/customer?status=${tab.value}`}
                                className={`flex items-center gap-1.5 rounded-lg px-3.5 py-2 text-sm font-medium transition-all border ${isActive
                                    ? "border-primary bg-primary text-primary-foreground"
                                    : "border-border bg-background text-muted-foreground hover:border-primary/40 hover:text-primary dark:hover:text-blue-500"
                                    }`}
                            >
                                <tab.icon className="h-4 w-4" />
                                {tab.label}
                            </Link>
                        );
                    })}
                </div>

                {/* Bookings List */}
                <div className="mt-6 space-y-4">
                    {bookings.length === 0 ? (
                        <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-border bg-card py-16 text-center">
                            <CalendarDays className="h-12 w-12 text-muted-foreground" />
                            <h3 className="mt-4 text-lg font-semibold text-foreground">No bookings found</h3>
                            <p className="mt-1 text-sm text-muted-foreground">
                                {activeStatus === "ALL"
                                    ? "You haven't booked any services yet."
                                    : `No ${activeStatus.toLowerCase()} bookings.`}
                            </p>
                            <Link
                                href="/services"
                                className="mt-6 rounded-lg bg-primary px-6 py-2.5 text-sm font-semibold text-primary-foreground hover:bg-primary/90"
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
