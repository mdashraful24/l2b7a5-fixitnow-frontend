/* eslint-disable @typescript-eslint/no-explicit-any */
import { getAdminCategories, getAllBookings, getAllUsers } from "@/app/(dashboardGroup)/_actions/admin";
import { BookingStats, DashboardStats, UserStats } from "./type";

export async function getDashboardStats(): Promise<DashboardStats> {
    const [bookingsResult, usersResult, categoriesResult] = await Promise.all([
        getAllBookings({}),
        getAllUsers({}),
        getAdminCategories({})
    ]);

    const allBookings = bookingsResult.data || [];
    const allUsers = usersResult.data || [];
    const categories = categoriesResult.data || [];

    // Calculate booking stats
    const bookingStats: BookingStats = {
        totalBookings: allBookings.length,
        requestedBookings: allBookings.filter((b: any) => b.status === "REQUESTED").length,
        acceptedBookings: allBookings.filter((b: any) => b.status === "ACCEPTED").length,
        declinedBookings: allBookings.filter((b: any) => b.status === "DECLINED").length,
        paidBookings: allBookings.filter((b: any) => b.status === "PAID").length,
        inProgressBookings: allBookings.filter((b: any) => b.status === "IN_PROGRESS").length,
        completedBookings: allBookings.filter((b: any) => b.status === "COMPLETED").length,
        cancelledBookings: allBookings.filter((b: any) => b.status === "CANCELLED").length,
        thisMonth: allBookings.filter((b: any) => {
            const now = new Date();
            const bookingDate = new Date(b.createdAt);
            return bookingDate.getMonth() === now.getMonth() &&
                bookingDate.getFullYear() === now.getFullYear();
        }).length
    };

    // Calculate user stats
    const userStats: UserStats = {
        totalUsers: allUsers.length,
        totalTechnicians: allUsers.filter((u: any) => u.role === "TECHNICIAN").length,
        totalCustomers: allUsers.filter((u: any) => u.role === "CUSTOMER").length,
        activeUsers: allUsers.filter((u: any) => u.status === "ACTIVE").length,
        bannedUsers: allUsers.filter((u: any) => u.status === "BANNED").length
    };

    // Calculate total revenue from completed bookings
    const totalRevenue = allBookings
        .filter((b: any) => b.status === "COMPLETED" || b.status === "PAID")
        .reduce((sum: number, b: any) => sum + (b.totalAmount || 0), 0);

    // Calculate average rating from technicians
    const techs = allUsers.filter((u: any) => u.role === "TECHNICIAN" && u.technicianProfile);
    const totalRating = techs.reduce((sum: number, u: any) => sum + (u.technicianProfile?.rating || 0), 0);
    const averageRating = techs.length > 0 ? totalRating / techs.length : 0;

    // Calculate growth rate (simple: compare current month vs previous month)
    const currentMonth = new Date().getMonth();
    const currentYear = new Date().getFullYear();
    const thisMonthBookings = allBookings.filter((b: any) => {
        const d = new Date(b.createdAt);
        return d.getMonth() === currentMonth && d.getFullYear() === currentYear;
    });
    const lastMonthBookings = allBookings.filter((b: any) => {
        const d = new Date(b.createdAt);
        return d.getMonth() === currentMonth - 1 && d.getFullYear() === currentYear;
    });
    const growthRate = lastMonthBookings.length > 0
        ? ((thisMonthBookings.length - lastMonthBookings.length) / lastMonthBookings.length) * 100
        : 0;

    return {
        bookings: bookingStats,
        users: userStats,
        totalRevenue,
        averageRating,
        totalCategories: categories.length,
        growthRate
    };
}
