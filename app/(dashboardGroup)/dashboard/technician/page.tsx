/* eslint-disable @typescript-eslint/no-explicit-any */
import Link from "next/link";
import { redirect } from "next/navigation";
import { getMe } from "@/services/getMe";
import { getTechnicianById } from "@/app/(publicGroup)/_actions/getTechnician";
import { getTechnicianBookings } from "@/app/(dashboardGroup)/_actions/technician";
import { bookingStatCardThemes, buildBookingStatCards } from "@/lib/bookingConstants";
import ClientCharts from "./_components/dashboard/ClientCharts";
import BookingsTable from "./_components/dashboard/BookingsTable";

export default async function TechnicianDashboardPage() {
    const user = await getMe();

    if (!user?.success) {
        redirect("/auth/login");
    }

    if (user.data?.role !== "TECHNICIAN") {
        redirect("/");
    }

    const technicianId = user.data?.technicianProfile?.id;

    if (!technicianId) {
        return (
            <div className="rounded-xl border border-border bg-card p-8 shadow-sm">
                <h1 className="text-2xl font-bold text-foreground">Technician profile missing</h1>
                <p className="mt-2 text-sm text-muted-foreground">
                    Your account is missing a technician profile. Please contact an admin or update your profile setup.
                </p>
            </div>
        );
    }

    const [technicianResponse, bookingsResponse] = await Promise.all([
        getTechnicianById(technicianId),
        getTechnicianBookings(),
    ]);

    if (!technicianResponse.success) {
        return (
            <div className="rounded-xl border border-border bg-card p-8 shadow-sm">
                <h1 className="text-2xl font-bold text-foreground">Unable to load technician dashboard</h1>
                <p className="mt-2 text-sm text-muted-foreground">{technicianResponse.message || "Please try again later."}</p>
            </div>
        );
    }

    const technician = technicianResponse.data;
    const bookings = bookingsResponse.data ?? [];

    // Calculate statistics
    const stats = {
        total: bookings.length,
        requested: bookings.filter((booking) => booking.status === "REQUESTED").length,
        accepted: bookings.filter((booking) => booking.status === "ACCEPTED").length,
        declined: bookings.filter((booking) => booking.status === "DECLINED").length,
        paid: bookings.filter((booking) => booking.status === "PAID").length,
        inProgress: bookings.filter((booking) => booking.status === "IN_PROGRESS").length,
        completed: bookings.filter((booking) => booking.status === "COMPLETED").length,
        cancelled: bookings.filter((booking) => booking.status === "CANCELLED").length,
        earnings: bookings
            .filter((booking) => booking.status === "COMPLETED" || booking.status === "IN_PROGRESS" || booking.status === "PAID")
            .reduce((total, booking) => total + (booking.totalAmount || 0), 0),
    };

    // Calculate monthly data for charts
    const monthlyData = getMonthlyData(bookings);
    const statusDistribution = getStatusDistribution(bookings);
    const weeklyTrend = getWeeklyTrend(bookings);
    const recentBookings = bookings.slice(0, 10);
    const statCards = buildBookingStatCards(stats);

    return (
        <div className="space-y-8">
            {/* Header Section */}
            <div className="flex flex-col gap-4 rounded-2xl border border-border bg-card p-6 shadow-sm lg:flex-row lg:items-center lg:justify-between">
                <div>
                    <p className="text-sm font-medium text-primary dark:text-blue-500">Technician dashboard</p>
                    <h1 className="mt-1 text-2xl font-bold text-foreground">Welcome back, {technician.user.name}</h1>
                    <p className="mt-1 text-sm text-muted-foreground">
                        Track bookings, manage availability, and keep your service profile updated.
                    </p>
                </div>
                <div className="flex flex-wrap gap-3">
                    <Link href="/dashboard/technician/updated-profile" className="rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground hover:bg-primary/90">
                        Edit Profile
                    </Link>
                    <Link href="/dashboard/technician/availability" className="rounded-lg border border-border px-4 py-2 text-sm font-semibold text-muted-foreground hover:border-primary/40 hover:text-primary">
                        Manage Availability
                    </Link>
                </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-2 gap-4 xl:grid-cols-5">
                {statCards.map((item) => ( // ${item.color} 
                    <div key={item.label} className={`bg-linear-to-br from-blue-700 to-blue-900 rounded-xl px-5 py-3 text-white shadow-lg transition-transform hover:scale-[1.02]`}>
                        <div className="flex items-center gap-2 mb-2">
                            <item.icon className={`h-5 w-5 ${item.iconColor}`} />
                            <p className="text-sm text-white/90">{item.label}</p>
                        </div>
                        <p className="text-2xl font-bold">{item.value}</p>
                    </div>
                ))}
            </div>

            {/* Charts Section */}
            <ClientCharts
                monthlyData={monthlyData}
                statusDistribution={statusDistribution}
                weeklyTrend={weeklyTrend}
            />

            {/* Data Table Section */}
            <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
                <div className="flex items-center justify-between gap-4 mb-4">
                    <div>
                        <h2 className="text-lg font-semibold text-foreground">Recent Bookings</h2>
                        <p className="text-sm text-muted-foreground">Complete history of all your bookings</p>
                    </div>
                    <Link href="/dashboard/technician/bookings" className="text-sm font-medium text-primary hover:underline">
                        View all
                    </Link>
                </div>
                <BookingsTable bookings={recentBookings} />
            </div>
        </div>
    );
}

// Helper functions for data processing
function getMonthlyData(bookings: any[]) {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const monthlyData = months.map(month => ({ month, bookings: 0, earnings: 0 }));

    bookings.forEach(booking => {
        const date = new Date(booking.scheduledAt);
        const monthIndex = date.getMonth();
        monthlyData[monthIndex].bookings += 1;
        if (booking.status === 'COMPLETED' || booking.status === 'IN_PROGRESS' || booking.status === 'PAID') {
            monthlyData[monthIndex].earnings += booking.totalAmount || 0;
        }
    });

    return monthlyData;
}

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

function getWeeklyTrend(bookings: any[]) {
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const weeklyData = days.map(day => ({ day, bookings: 0 }));

    bookings.forEach(booking => {
        const date = new Date(booking.scheduledAt);
        const dayIndex = date.getDay();
        weeklyData[dayIndex].bookings += 1;
    });

    return weeklyData;
}










// import Link from "next/link";
// import { redirect } from "next/navigation";
// import {
//     CalendarDays,
//     Clock3,
//     Star,
//     UserRound,
//     AlertCircle,
// } from "lucide-react";
// import { getMe } from "@/services/getMe";
// import { getTechnicianById } from "@/app/(publicGroup)/_actions/getTechnician";
// import { getTechnicianBookings } from "@/app/(dashboardGroup)/_actions/technician";
// import { buildBookingStatCards, statusBadge } from "@/lib/bookingConstants";

// export default async function TechnicianDashboardPage() {
//     const user = await getMe();

//     if (!user?.success) {
//         redirect("/auth/login");
//     }

//     if (user.data?.role !== "TECHNICIAN") {
//         redirect("/");
//     }

//     const technicianId = user.data?.technicianProfile?.id;

//     if (!technicianId) {
//         return (
//             <div className="rounded-xl border border-border bg-card p-8 shadow-sm">
//                 <h1 className="text-2xl font-bold text-foreground">Technician profile missing</h1>
//                 <p className="mt-2 text-sm text-muted-foreground">
//                     Your account is missing a technician profile. Please contact an admin or update your profile setup.
//                 </p>
//             </div>
//         );
//     }

//     const [technicianResponse, bookingsResponse] = await Promise.all([
//         getTechnicianById(technicianId),
//         getTechnicianBookings(),
//     ]);

//     if (!technicianResponse.success) {
//         return (
//             <div className="rounded-xl border border-border bg-card p-8 shadow-sm">
//                 <h1 className="text-2xl font-bold text-foreground">Unable to load technician dashboard</h1>
//                 <p className="mt-2 text-sm text-muted-foreground">{technicianResponse.message || "Please try again later."}</p>
//             </div>
//         );
//     }

//     const technician = technicianResponse.data;
//     const bookings = bookingsResponse.data ?? [];

//     const stats = {
//         total: bookings.length,
//         requested: bookings.filter((booking) => booking.status === "REQUESTED").length,
//         accepted: bookings.filter((booking) => booking.status === "ACCEPTED").length,
//         declined: bookings.filter((booking) => booking.status === "DECLINED").length,
//         paid: bookings.filter((booking) => booking.status === "PAID").length,
//         inProgress: bookings.filter((booking) => booking.status === "IN_PROGRESS").length,
//         completed: bookings.filter((booking) => booking.status === "COMPLETED").length,
//         cancelled: bookings.filter((booking) => booking.status === "CANCELLED").length,
//         earnings: bookings
//             .filter((booking) => booking.status === "COMPLETED" || booking.status === "PAID")
//             .reduce((total, booking) => total + (booking.totalAmount || 0), 0),
//     };

//     const recentBookings = bookings.slice(0, 5);
//     const statCards = buildBookingStatCards(stats);

//     return (
//         <div className="space-y-8">
//             <div className="flex flex-col gap-4 rounded-2xl border border-border bg-card p-6 shadow-sm lg:flex-row lg:items-center lg:justify-between">
//                 <div>
//                     <p className="text-sm font-medium text-primary dark:text-blue-500">Technician dashboard</p>
//                     <h1 className="mt-1 text-2xl font-bold text-foreground">Welcome back, {technician.user.name}</h1>
//                     <p className="mt-1 text-sm text-muted-foreground">
//                         Track bookings, manage availability, and keep your service profile updated.
//                     </p>
//                 </div>
//                 <div className="flex flex-wrap gap-3">
//                     <Link href="/dashboard/technician/updated-profile" className="rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground hover:bg-primary/90">
//                         Edit Profile
//                     </Link>
//                     <Link href="/dashboard/technician/availability" className="rounded-lg border border-border px-4 py-2 text-sm font-semibold text-muted-foreground hover:border-primary/40 hover:text-primary">
//                         Manage Availability
//                     </Link>
//                 </div>
//             </div>

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

//             <div className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
//                 <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
//                     <div className="flex items-center justify-between gap-4">
//                         <div>
//                             <h2 className="text-lg font-semibold text-foreground">Recent bookings</h2>
//                             <p className="text-sm text-muted-foreground">Latest booking requests and status updates.</p>
//                         </div>
//                         <Link href="/dashboard/technician/bookings" className="text-sm font-medium text-primary hover:underline">
//                             View all
//                         </Link>
//                     </div>

//                     <div className="mt-5 space-y-3">
//                         {recentBookings.length === 0 ? (
//                             <div className="rounded-xl border border-dashed border-border bg-muted/30 p-6 text-center text-sm text-foreground/80 font-semibold">
//                                 No bookings have been assigned to you yet.
//                             </div>
//                         ) : (
//                             recentBookings.map((booking) => {
//                                 const statusInfo = statusBadge[booking.status] || {
//                                     bg: "bg-gray-50 dark:bg-gray-800",
//                                     text: "text-gray-700 dark:text-gray-300",
//                                     border: "border-gray-200 dark:border-gray-700",
//                                     icon: AlertCircle
//                                 };
//                                 const StatusIcon = statusInfo.icon;

//                                 return (
//                                     <div key={booking.id} className="rounded-xl border border-border p-4 transition hover:border-primary/40 hover:bg-muted/30">
//                                         <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
//                                             <div>
//                                                 <div className="flex flex-wrap items-center gap-2">
//                                                     <h3 className="font-semibold text-foreground">{booking.service?.title}</h3>
//                                                     <span className={`inline-flex items-center gap-1 rounded-full border px-2.5 py-0.5 text-xs font-medium ${statusInfo.bg} ${statusInfo.text} ${statusInfo.border}`}>
//                                                         <StatusIcon className="h-3 w-3" />
//                                                         {booking.status}
//                                                     </span>
//                                                 </div>
//                                                 <p className="mt-1 text-sm text-muted-foreground">
//                                                     {booking.customer?.name || "Customer"} • {new Date(booking.scheduledAt).toLocaleString("en-US", { dateStyle: "medium", timeStyle: "short" })}
//                                                 </p>
//                                             </div>
//                                             <div className="text-sm font-semibold text-foreground">${booking.totalAmount}</div>
//                                         </div>
//                                     </div>
//                                 );
//                             })
//                         )}
//                     </div>
//                 </div>

//                 <div className="space-y-6">
//                     <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
//                         <h2 className="text-lg font-semibold text-foreground">Profile snapshot</h2>
//                         <p className="mt-1 text-sm text-muted-foreground">Current public profile information pulled from the backend.</p>

//                         <div className="mt-5 space-y-3 text-sm text-muted-foreground">
//                             <div className="flex items-center gap-3">
//                                 <UserRound className="h-4 w-4 text-primary" />
//                                 <span className="text-foreground">{technician.user.name}</span>
//                             </div>
//                             <div className="flex items-center gap-3">
//                                 <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
//                                 <span>{technician.rating} average rating from {technician.reviewStats.totalReviews} reviews</span>
//                             </div>
//                             <div className="flex items-center gap-3">
//                                 <Clock3 className="h-4 w-4 text-primary" />
//                                 <span>{technician.availability.length} availability slots set</span>
//                             </div>
//                             <div className="flex items-center gap-3">
//                                 <CalendarDays className="h-4 w-4 text-primary" />
//                                 <span>{technician.services.length} services linked</span>
//                             </div>
//                         </div>

//                         <Link href="/dashboard/technician/updated-profile" className="mt-6 inline-flex rounded-lg bg-foreground px-4 py-2 text-sm font-semibold text-background hover:bg-foreground/80">
//                             Edit profile
//                         </Link>
//                     </div>

//                     <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
//                         <h2 className="text-lg font-semibold text-foreground">Quick links</h2>
//                         <div className="mt-4 space-y-2">
//                             <Link href="/dashboard/technician/bookings" className="block rounded-lg border border-border px-4 py-3 text-sm text-muted-foreground hover:border-primary/40 hover:text-primary transition-colors">
//                                 Manage incoming bookings
//                             </Link>
//                             <Link href="/dashboard/technician/availability" className="block rounded-lg border border-border px-4 py-3 text-sm text-muted-foreground hover:border-primary/40 hover:text-primary transition-colors">
//                                 Set working hours
//                             </Link>
//                             <Link href="/services" className="block rounded-lg border border-border px-4 py-3 text-sm text-muted-foreground hover:border-primary/40 hover:text-primary transition-colors">
//                                 Browse public services
//                             </Link>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// }
