/* eslint-disable @typescript-eslint/no-explicit-any */
import { Calendar, Clock, CheckCircle, XCircle, Loader2, Users, DollarSign, ArrowUpRight, BookOpen, Star, Briefcase } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { getAllBookings, getAllUsers } from "@/app/(dashboardGroup)/_actions/admin";
import { statusBadges } from "@/lib/bookingConstants";
import { getDashboardStats } from "@/lib/adminConstants";
import { StatCard } from "./_components/dashboardStats/StatCard";
import { MiniStatCard } from "./_components/dashboardStats/MiniStatCard";

export default async function AdminDashboardPage() {
    const stats = await getDashboardStats();
    const { bookings, users, totalRevenue, averageRating, totalCategories, growthRate } = stats;

    const bookingsResult = await getAllBookings({});
    const recentBookings = (bookingsResult.data || [])
        .sort((a: any, b: any) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
        .slice(0, 5);

    const usersResult = await getAllUsers({});
    const recentUsers = (usersResult.data || [])
        .sort((a: any, b: any) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
        .slice(0, 5);

    return (
        <div className="space-y-8">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div className="space-y-2">
                    <h1 className="text-3xl font-bold tracking-tight text-foreground">Dashboard Overview</h1>
                    <p className="text-sm text-muted-foreground">
                        Welcome back! Here&apos;s what&apos;s happening with your platform today.
                    </p>
                </div>
                <div className="flex items-center gap-3">
                    <Badge variant="outline" className="px-3 py-4 text-sm bg-background border-border">
                        <Calendar className="h-3.5 w-3.5 mr-1.5" />
                        {new Date().toLocaleDateString('en-US', {
                            weekday: 'long',
                            month: 'long',
                            day: 'numeric',
                            year: 'numeric',
                        })}
                    </Badge>
                    {/* <Button variant="outline" size="sm" asChild>
                        <Link href="/dashboard/admin/bookings">
                            <Activity className="h-4 w-4 mr-1.5" />
                            View All
                        </Link>
                    </Button> */}
                </div>
            </div>

            {/* Main stats cards */}
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                <StatCard
                    title="Total Bookings"
                    value={bookings.totalBookings}
                    icon={Briefcase}
                    description={`${bookings.thisMonth} this month`}
                    trend={growthRate}
                    color="text-blue-500"
                    bgColor="bg-blue-50 dark:bg-blue-950/30"
                />
                <StatCard
                    title="Total Revenue"
                    value={`$${totalRevenue.toLocaleString()}`}
                    icon={DollarSign}
                    description={`${bookings.completedBookings} completed bookings`}
                    color="text-green-500"
                    bgColor="bg-green-50 dark:bg-green-950/30"
                />
                <StatCard
                    title="Total Users"
                    value={users.totalUsers}
                    icon={Users}
                    description={`${users.activeUsers} active, ${users.bannedUsers} banned`}
                    color="text-purple-500"
                    bgColor="bg-purple-50 dark:bg-purple-950/30"
                />
                <StatCard
                    title="Avg. Rating"
                    value={averageRating > 0 ? averageRating.toFixed(1) : 'N/A'}
                    icon={Star}
                    description={`${users.totalTechnicians} technicians`}
                    color="text-yellow-500"
                    bgColor="bg-yellow-50 dark:bg-yellow-950/30"
                />
            </div>

            {/* Bookings Related */}
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
                <MiniStatCard
                    title="Requested"
                    value={bookings.requestedBookings}
                    color="bg-yellow-500"
                    icon={Clock}
                />
                <MiniStatCard
                    title="In Progress"
                    value={bookings.inProgressBookings}
                    color="bg-purple-500"
                    icon={Loader2}
                />
                <MiniStatCard
                    title="Completed"
                    value={bookings.completedBookings}
                    color="bg-green-500"
                    icon={CheckCircle}
                />
                <MiniStatCard
                    title="Cancelled"
                    value={bookings.cancelledBookings}
                    color="bg-red-500"
                    icon={XCircle}
                />
                <MiniStatCard
                    title="Categories"
                    value={totalCategories}
                    color="bg-indigo-500"
                    icon={BookOpen}
                />
            </div>

            {/* Others Contents */}
            <div className="grid gap-6 lg:grid-cols-3">
                {/* Recent Bookings */}
                <div className="lg:col-span-2">
                    <Card className="shadow-sm border-border">
                        <CardHeader className="flex flex-row items-center justify-between">
                            <CardTitle className="text-lg font-semibold text-foreground">Recent Bookings</CardTitle>
                            <Link href="/dashboard/admin/bookings">
                                <Button variant="ghost" size="sm" className="text-sm">
                                    View All
                                    <ArrowUpRight className="h-4 w-4 ml-1" />
                                </Button>
                            </Link>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                {recentBookings.length === 0 ? (
                                    <p className="text-center text-muted-foreground py-8">No bookings yet</p>
                                ) : (
                                    recentBookings.map((booking: any) => (
                                        <Link
                                            key={booking.id}
                                            href={`/dashboard/admin/bookings/${booking.id}`}
                                            className="block"
                                        >
                                            <div className="flex items-center justify-between p-3 rounded-lg hover:bg-muted/50 dark:hover:bg-muted/30 transition-colors border border-transparent hover:border-border">
                                                <div className="flex-1 space-y-2 min-w-0">
                                                    <div className="flex items-center gap-2">
                                                        <p className="font-medium text-base text-foreground truncate">
                                                            {booking.service?.title || 'Unknown Service'}
                                                        </p>
                                                        <Badge
                                                            className={`text-xs ${statusBadges[booking.status] || 'bg-gray-100'}`}
                                                        >
                                                            {booking.status}
                                                        </Badge>
                                                    </div>
                                                    <div className="flex items-center gap-2 mt-1 text-sm text-muted-foreground">
                                                        <span>{booking.customer?.name || 'Unknown'}</span>
                                                        <span>•</span>
                                                        <span>{new Date(booking.scheduledAt).toLocaleDateString()}</span>
                                                        <span>•</span>
                                                        <span className="font-semibold text-foreground">${booking.totalAmount}</span>
                                                    </div>
                                                </div>
                                                <ArrowUpRight className="h-4 w-4 text-muted-foreground" />
                                            </div>
                                        </Link>
                                    ))
                                )}
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Quick Stats & Recent Users */}
                <div className="space-y-6">
                    {/* User Stats */}
                    <Card className="shadow-sm border-border">
                        <CardHeader>
                            <CardTitle className="text-lg font-semibold text-foreground">User Overview</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-3">
                            <div className="flex items-center justify-between">
                                <span className="text-sm text-muted-foreground">Total Users</span>
                                <span className="font-bold text-foreground">{users.totalUsers}</span>
                            </div>
                            <div className="flex items-center justify-between">
                                <span className="text-sm text-muted-foreground">Customers</span>
                                <span className="font-bold text-foreground">{users.totalCustomers}</span>
                            </div>
                            <div className="flex items-center justify-between">
                                <span className="text-sm text-muted-foreground">Technicians</span>
                                <span className="font-bold text-foreground">{users.totalTechnicians}</span>
                            </div>
                            <div className="flex items-center justify-between pt-2 border-t border-border">
                                <span className="text-sm text-muted-foreground">Active / Banned</span>
                                <span className="font-bold text-foreground">
                                    {users.activeUsers} / {users.bannedUsers}
                                </span>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Recent Users */}
                    <Card className="shadow-sm border-border">
                        <CardHeader className="flex flex-row items-center justify-between">
                            <CardTitle className="text-lg font-semibold text-foreground">Recent Users</CardTitle>
                            <Link href="/dashboard/admin/users">
                                <Button variant="ghost" size="sm" className="text-sm">
                                    View All
                                    <ArrowUpRight className="h-4 w-4 ml-1" />
                                </Button>
                            </Link>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-3">
                                {recentUsers.length === 0 ? (
                                    <p className="text-center text-muted-foreground py-4 text-sm">No users yet</p>
                                ) : (
                                    recentUsers.map((user: any) => (
                                        <Link
                                            key={user.id}
                                            href={`/dashboard/admin/users/${user.id}`}
                                            className="block"
                                        >
                                            <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-muted/50 dark:hover:bg-muted/30 transition-colors">
                                                <div className="h-9 w-9 rounded-full bg-primary/10 flex items-center justify-center text-primary font-semibold text-sm">
                                                    {user.name?.charAt(0) || 'U'}
                                                </div>
                                                <div className="flex-1 min-w-0 space-y-1">
                                                    <p className="text-sm font-medium text-foreground truncate">{user.name}</p>
                                                    <p className="text-xs text-muted-foreground dark:text-gray-300 truncate">{user.email}</p>
                                                </div>
                                                <Badge
                                                    variant={user.status === 'ACTIVE' ? 'default' : 'destructive'}
                                                    className="text-xs"
                                                >
                                                    {user.status}
                                                </Badge>
                                            </div>
                                        </Link>
                                    ))
                                )}
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}
