/* eslint-disable @typescript-eslint/no-explicit-any */
import { getAllBookings } from "../../_actions/getBookings";
import { IBooking } from "@/lib/type";
import { CalendarDays } from "lucide-react";
import Link from "next/link";
import { BookingCard } from "./_components/BookingCard";
import { bookingStatCardThemes, buildBookingStatCards, statusColors, StatusFilter, statusTabs } from "@/lib/bookingConstants";
import CustomerCharts from "./_components/CustomerCharts";

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
        earnings: allBookings
            .filter((b: IBooking) => b.status === "COMPLETED" || b.status === "PAID")
            .reduce((total: any, b: { totalAmount: any; }) => total + (b.totalAmount || 0), 0),
    };

    const statCards = buildBookingStatCards(stats).filter((item) => item.key !== "earnings");

    // Prepare data for charts
    const monthlyData = getMonthlyData(allBookings);
    const statusDistribution = getStatusDistribution(allBookings);
    const weeklyTrend = getWeeklyTrend(allBookings);
    const servicePopularity = getServicePopularity(allBookings);

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
                {statCards.map((item) => ( // ${item.color}
                    <div key={item.label} className={`bg-linear-to-br from-blue-700 to-blue-900 rounded-xl px-5 py-3 text-white shadow-lg transition-transform hover:scale-[1.02]`}>
                        <div className="flex items-center gap-2 mb-2">
                            <item.icon className={`h-5 w-5 ${item.iconColor}`} />
                            <p className="text-sm text-white/90">{item.label}</p>
                        </div>
                        <p className="text-2xl font-bold">{item.value}</p>
                    </div>
                ))}
                <div className="rounded-2xl border border-border bg-linear-to-br from-red-700 to-red-900 px-5 py-3 shadow-sm">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-white/90 mb-1">Total Spent</p>
                            <p className="text-2xl font-bold text-white">${stats.earnings.toFixed(2)}</p>
                        </div>
                        <div className="rounded-full bg-red-100 p-2">
                            <CalendarDays className="h-5 w-5 text-red-700" />
                        </div>
                    </div>
                    <p className="mt-2 text-sm text-white/90">
                        {stats.completed} completed bookings
                    </p>
                </div>
            </div>

            {/* Charts Section */}
            <CustomerCharts
                monthlyData={monthlyData}
                statusDistribution={statusDistribution}
                weeklyTrend={weeklyTrend}
                servicePopularity={servicePopularity}
            />

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

// Helper functions for data processing
function getMonthlyData(bookings: IBooking[]) {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const monthlyData = months.map(month => ({ month, bookings: 0, spent: 0 }));

    bookings.forEach((booking) => {
        const date = new Date(booking.createdAt);
        const monthIndex = date.getMonth();
        monthlyData[monthIndex].bookings += 1;
        if (booking.status === 'COMPLETED' || booking.status === 'PAID') {
            monthlyData[monthIndex].spent += booking.totalAmount || 0;
        }
    });

    return monthlyData;
}

// Then in getStatusDistribution function:
function getStatusDistribution(bookings: any[]) {
    const statusColorMap: Record<string, string> = {};

    // Map status keys to colors
    bookingStatCardThemes.forEach(theme => {
        const colorMatch = theme.color.match(/#[0-9a-fA-F]{6}/g);
        if (colorMatch && colorMatch.length > 0) {
            statusColorMap[theme.key.toUpperCase()] = colorMatch[0];
        }
    });

    // Fallback colors if extraction fails
    const fallbackColors: Record<string, string> = {
        'COMPLETED': '#9CA3AF',
        'IN_PROGRESS': '#22C55E',
        'REQUESTED': '#F97316',
        'ACCEPTED': '#3B82F6',
        'CANCELLED': '#B91C1C',
        'DECLINED': '#DC2626',
        'PAID': '#9333EA',
    };

    const statuses = ['COMPLETED', 'IN_PROGRESS', 'REQUESTED', 'ACCEPTED', 'CANCELLED', 'DECLINED', 'PAID'];

    return statuses
        .map((status) => ({
            name: status.replace('_', ' '),
            value: bookings.filter(b => b.status === status).length,
            color: statusColorMap[status] || fallbackColors[status] || '#6B7280'
        }))
        .filter(item => item.value > 0);
}

function getWeeklyTrend(bookings: IBooking[]) {
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const weeklyData = days.map(day => ({ day, bookings: 0 }));

    bookings.forEach((booking) => {
        const date = new Date(booking.createdAt);
        const dayIndex = date.getDay();
        weeklyData[dayIndex].bookings += 1;
    });

    return weeklyData;
}

function getServicePopularity(bookings: IBooking[]) {
    const serviceMap = new Map<string, number>();

    bookings.forEach((booking) => {
        const serviceName = booking.service?.title || 'Unknown';
        serviceMap.set(serviceName, (serviceMap.get(serviceName) || 0) + 1);
    });

    return Array.from(serviceMap.entries())
        .map(([name, bookings]) => ({ name, bookings }))
        .sort((a, b) => b.bookings - a.bookings)
        .slice(0, 10);
}







// import { getAllBookings } from "../../_actions/getBookings";
// import { IBooking } from "@/lib/type";
// import { CalendarDays } from "lucide-react";
// import Link from "next/link";
// import { BookingCard } from "./_components/BookingCard";
// import { buildBookingStatCards, statusColors, StatusFilter, statusTabs } from "@/lib/bookingConstants";

// export default async function CustomerDashboardPage({
//     searchParams,
// }: {
//     searchParams: Promise<{ status?: string }>;
// }) {
//     const params = await searchParams;
//     const activeStatus = (params.status as StatusFilter) || "ALL";

//     const result = await getAllBookings(activeStatus === "ALL" ? undefined : activeStatus);
//     const bookings: IBooking[] = result?.data ?? [];

//     const allResult = await getAllBookings();

//     const allBookings = Array.isArray(allResult?.data)
//         ? allResult.data
//         : [];

//     const stats = {
//         total: allBookings.length,
//         requested: allBookings.filter((b: IBooking) => b.status === "REQUESTED").length,
//         accepted: allBookings.filter((b: IBooking) => b.status === "ACCEPTED").length,
//         declined: allBookings.filter((b: IBooking) => b.status === "DECLINED").length,
//         paid: allBookings.filter((b: IBooking) => b.status === "PAID").length,
//         inProgress: allBookings.filter((b: IBooking) => b.status === "IN_PROGRESS").length,
//         completed: allBookings.filter((b: IBooking) => b.status === "COMPLETED").length,
//         cancelled: allBookings.filter((b: IBooking) => b.status === "CANCELLED").length,
//     };

//     const statCards = buildBookingStatCards(stats).filter((item) => item.key !== "earnings");

//     return (
//         <div className="space-y-8">
//             {/* Header */}
//             <div className="flex flex-col gap-4 rounded-2xl border border-border bg-card p-6 shadow-sm lg:flex-row lg:items-center lg:justify-between">
//                 <div>
//                     <p className="text-sm font-medium text-primary dark:text-blue-500">Customer dashboard</p>
//                     <h1 className="mt-1 text-2xl font-bold text-foreground">Dashboard Overview</h1>
//                     <p className="mt-1 text-sm text-muted-foreground">Manage all your service bookings here.</p>
//                 </div>
//                 <Link
//                     href="/services"
//                     className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground transition hover:bg-primary/90"
//                 >
//                     <CalendarDays className="h-4 w-4" />
//                     Book a Service
//                 </Link>
//             </div>

//             {/* Stats Grid */}
//             <div className="grid grid-cols-2 gap-4 xl:grid-cols-5">
//                 {statCards.map((item) => (
//                     <div key={item.label} className={`${item.color} rounded-xl px-5 py-3 text-white shadow-lg transition-transform hover:scale-[1.02]`}>
//                         <div className="flex items-center gap-2 mb-2">
//                             <item.icon className={`h-5 w-5 ${item.iconColor}`} />
//                             <p className="text-sm text-white/90">{item.label}</p>
//                         </div>
//                         <p className="text-2xl font-bold">{item.value}</p>
//                     </div>
//                 ))}
//             </div>

//             {/* Status Tabs */}
//             <div>
//                 <div className="flex flex-wrap gap-2 border-b border-border pb-4">
//                     {statusTabs.map((tab) => {
//                         const isActive = activeStatus === tab.value;
//                         return (
//                             <Link
//                                 key={tab.value}
//                                 href={tab.value === "ALL" ? "/dashboard/customer" : `/dashboard/customer?status=${tab.value}`}
//                                 className={`flex items-center gap-1.5 rounded-lg px-3.5 py-2 text-sm font-medium transition-all border ${isActive
//                                     ? "border-primary bg-primary text-primary-foreground"
//                                     : "border-border bg-background text-muted-foreground hover:border-primary/40 hover:text-primary dark:hover:text-blue-500"
//                                     }`}
//                             >
//                                 <tab.icon className="h-4 w-4" />
//                                 {tab.label}
//                             </Link>
//                         );
//                     })}
//                 </div>

//                 {/* Bookings List */}
//                 <div className="mt-6 space-y-4">
//                     {bookings.length === 0 ? (
//                         <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-border bg-card py-16 text-center">
//                             <CalendarDays className="h-12 w-12 text-muted-foreground" />
//                             <h3 className="mt-4 text-lg font-semibold text-foreground">No bookings found</h3>
//                             <p className="mt-1 text-sm text-muted-foreground">
//                                 {activeStatus === "ALL"
//                                     ? "You haven't booked any services yet."
//                                     : `No ${activeStatus.toLowerCase()} bookings.`}
//                             </p>
//                             <Link
//                                 href="/services"
//                                 className="mt-6 rounded-lg bg-primary px-6 py-2.5 text-sm font-semibold text-primary-foreground hover:bg-primary/90"
//                             >
//                                 Browse Services
//                             </Link>
//                         </div>
//                     ) : (
//                         bookings.map((booking) => (
//                             <BookingCard
//                                 key={booking.id}
//                                 booking={booking}
//                                 statusColors={statusColors}
//                             />
//                         ))
//                     )}
//                 </div>
//             </div>
//         </div>
//     );
// }
