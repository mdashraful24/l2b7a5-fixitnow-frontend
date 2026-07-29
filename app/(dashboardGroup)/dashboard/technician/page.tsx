import Link from "next/link";
import { redirect } from "next/navigation";
import { CalendarDays, CheckCircle2, Clock3, DollarSign, Star, UserRound, BadgeCheck, XCircle, CreditCard } from "lucide-react";
import { getMe } from "@/services/getMe";
import { getTechnicianById } from "@/app/(publicGroup)/_actions/getTechnician";
import { getTechnicianBookings } from "@/app/(dashboardGroup)/_actions/technician";

const statusBadge: Record<string, string> = {
    REQUESTED: "bg-blue-50 text-blue-700 border-blue-200",
    ACCEPTED: "bg-teal-100 text-teal-700 border-teal-200",
    DECLINED: "bg-indigo-50 text-indigo-700 border-indigo-200",
    PAID: "bg-indigo-50 text-indigo-700 border-indigo-200",
    IN_PROGRESS: "bg-amber-50 text-amber-700 border-amber-200",
    COMPLETED: "bg-green-50 text-green-700 border-green-200",
    CANCELLED: "bg-red-50 text-red-700 border-red-200",
};

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
            <div className="rounded-xl border bg-white p-8 shadow-sm">
                <h1 className="text-2xl font-bold text-gray-900">Technician profile missing</h1>
                <p className="mt-2 text-sm text-gray-500">
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
            <div className="rounded-xl border bg-white p-8 shadow-sm">
                <h1 className="text-2xl font-bold text-gray-900">Unable to load technician dashboard</h1>
                <p className="mt-2 text-sm text-gray-500">{technicianResponse.message || "Please try again later."}</p>
            </div>
        );
    }

    const technician = technicianResponse.data;
    const bookings = bookingsResponse.data ?? [];

    const stats = {
        total: bookings.length,
        requested: bookings.filter((booking) => booking.status === "REQUESTED").length,
        accepted: bookings.filter((booking) => booking.status === "ACCEPTED").length,
        declined: bookings.filter((booking) => booking.status === "DECLINED").length,
        paid: bookings.filter((booking) => booking.status === "PAID").length,
        confirmed: bookings.filter((booking) => booking.status === "CONFIRMED").length,
        inProgress: bookings.filter((booking) => booking.status === "IN_PROGRESS").length,
        completed: bookings.filter((booking) => booking.status === "COMPLETED").length,
        earnings: bookings
            .filter((booking) => booking.status === "COMPLETED")
            .reduce((total, booking) => total + (booking.totalAmount || 0), 0),
    };

    const recentBookings = bookings.slice(0, 5);

    return (
        <div className="space-y-8">
            <div className="flex flex-col gap-4 rounded-2xl border bg-white p-6 shadow-sm lg:flex-row lg:items-center lg:justify-between">
                <div>
                    <p className="text-sm font-medium text-primary">Technician dashboard</p>
                    <h1 className="mt-1 text-2xl font-bold text-gray-900">Welcome back, {technician.user.name}</h1>
                    <p className="mt-1 text-sm text-gray-500">
                        Track bookings, manage availability, and keep your service profile updated.
                    </p>
                </div>
                <div className="flex flex-wrap gap-3">
                    <Link href="/dashboard/technician/updated-profile" className="rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-white hover:bg-primary/90">
                        Update Profile
                    </Link>
                    <Link href="/dashboard/technician/availability" className="rounded-lg border border-gray-200 px-4 py-2 text-sm font-semibold text-gray-700 hover:border-primary/40 hover:text-primary">
                        Manage Availability
                    </Link>
                </div>
            </div>

            <div className="grid grid-cols-2 gap-4 xl:grid-cols-4">
                {[
                    { label: "Total Bookings", value: stats.total, icon: CalendarDays, color: "bg-gray-900" },
                    { label: "Accepted", value: stats.accepted, icon: CheckCircle2, color: "bg-teal-500" },
                    { label: "Declined", value: stats.declined, icon: XCircle, color: "bg-indigo-500" },
                    { label: "Paid", value: stats.paid, icon: CreditCard, color: "bg-indigo-500" },
                    { label: "Requested", value: stats.requested, icon: Clock3, color: "bg-amber-500" },
                    { label: "Confirmed", value: stats.confirmed, icon: BadgeCheck, color: "bg-indigo-500" },
                    { label: "Completed", value: stats.completed, icon: CheckCircle2, color: "bg-green-500" },
                    { label: "Earnings", value: `$${stats.earnings}`, icon: DollarSign, color: "bg-emerald-600" },
                ].map((item) => (
                    <div key={item.label} className={`${item.color} rounded-2xl p-5 text-white shadow-sm`}>
                        <item.icon className="h-5 w-5 opacity-80" />
                        <p className="mt-4 text-3xl font-bold">{item.value}</p>
                        <p className="mt-1 text-sm text-white/80">{item.label}</p>
                    </div>
                ))}
            </div>

            <div className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
                <div className="rounded-2xl border bg-white p-6 shadow-sm">
                    <div className="flex items-center justify-between gap-4">
                        <div>
                            <h2 className="text-lg font-semibold text-gray-900">Recent bookings</h2>
                            <p className="text-sm text-gray-500">Latest booking requests and status updates.</p>
                        </div>
                        <Link href="/dashboard/technician/bookings" className="text-sm font-medium text-primary hover:underline">
                            View all
                        </Link>
                    </div>

                    <div className="mt-5 space-y-3">
                        {recentBookings.length === 0 ? (
                            <div className="rounded-xl border border-dashed bg-gray-50 p-6 text-center text-sm text-gray-500">
                                No bookings have been assigned to you yet.
                            </div>
                        ) : (
                            recentBookings.map((booking) => (
                                <div key={booking.id} className="rounded-xl border p-4 transition hover:border-primary/40 hover:bg-gray-50">
                                    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                                        <div>
                                            <div className="flex flex-wrap items-center gap-2">
                                                <h3 className="font-semibold text-gray-900">{booking.service?.title}</h3>
                                                <span className={`rounded-full border px-2.5 py-0.5 text-xs font-medium ${statusBadge[booking.status] || "bg-gray-100 text-gray-600 border-gray-200"}`}>
                                                    {booking.status}
                                                </span>
                                            </div>
                                            <p className="mt-1 text-sm text-gray-500">
                                                {booking.customer?.name || "Customer"} • {new Date(booking.scheduledAt).toLocaleString("en-US", { dateStyle: "medium", timeStyle: "short" })}
                                            </p>
                                        </div>
                                        <div className="text-sm font-semibold text-gray-900">${booking.totalAmount}</div>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>

                <div className="space-y-6">
                    <div className="rounded-2xl border bg-white p-6 shadow-sm">
                        <h2 className="text-lg font-semibold text-gray-900">Profile snapshot</h2>
                        <p className="mt-1 text-sm text-gray-500">Current public profile information pulled from the backend.</p>

                        <div className="mt-5 space-y-3 text-sm text-gray-600">
                            <div className="flex items-center gap-3">
                                <UserRound className="h-4 w-4 text-primary" />
                                <span>{technician.user.name}</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                                <span>{technician.rating} average rating from {technician.reviewStats.totalReviews} reviews</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <Clock3 className="h-4 w-4 text-primary" />
                                <span>{technician.availability.length} availability slots set</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <CalendarDays className="h-4 w-4 text-primary" />
                                <span>{technician.services.length} services linked</span>
                            </div>
                        </div>

                        <Link href="/dashboard/technician/updated-profile" className="mt-6 inline-flex rounded-lg bg-gray-900 px-4 py-2 text-sm font-semibold text-white hover:bg-gray-800">
                            Edit profile
                        </Link>
                    </div>

                    <div className="rounded-2xl border bg-white p-6 shadow-sm">
                        <h2 className="text-lg font-semibold text-gray-900">Quick links</h2>
                        <div className="mt-4 space-y-2">
                            <Link href="/dashboard/technician/bookings" className="block rounded-lg border border-gray-200 px-4 py-3 text-sm text-gray-700 hover:border-primary/40 hover:text-primary">
                                Manage incoming bookings
                            </Link>
                            <Link href="/dashboard/technician/availability" className="block rounded-lg border border-gray-200 px-4 py-3 text-sm text-gray-700 hover:border-primary/40 hover:text-primary">
                                Set working hours
                            </Link>
                            <Link href="/services" className="block rounded-lg border border-gray-200 px-4 py-3 text-sm text-gray-700 hover:border-primary/40 hover:text-primary">
                                Browse public services
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
