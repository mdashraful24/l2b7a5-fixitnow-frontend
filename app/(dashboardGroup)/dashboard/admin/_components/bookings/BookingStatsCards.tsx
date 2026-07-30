"use client";

import {
    Calendar,
    Clock,
    CheckCircle,
    XCircle,
    Loader2
} from "lucide-react";
import { BookingStats } from "@/lib/type";

export function BookingStatsCards({ stats }: { stats: BookingStats }) {
    const statItems = [
        {
            title: "Total Bookings",
            value: stats.totalBookings || 0,
            icon: Calendar,
            color: "text-blue-500",
            bgColor: "bg-blue-50 dark:bg-blue-950/30",
            borderColor: "border-blue-200 dark:border-blue-800",
        },
        {
            title: "Pending",
            value: (stats.requestedBookings || 0) + (stats.acceptedBookings || 0),
            icon: Clock,
            color: "text-yellow-500",
            bgColor: "bg-yellow-50 dark:bg-yellow-950/30",
            borderColor: "border-yellow-200 dark:border-yellow-800",
        },
        {
            title: "In Progress",
            value: stats.inProgressBookings || 0,
            icon: Loader2,
            color: "text-purple-500",
            bgColor: "bg-purple-50 dark:bg-purple-950/30",
            borderColor: "border-purple-200 dark:border-purple-800",
        },
        {
            title: "Completed",
            value: stats.completedBookings || 0,
            icon: CheckCircle,
            color: "text-green-500",
            bgColor: "bg-green-50 dark:bg-green-950/30",
            borderColor: "border-green-200 dark:border-green-800",
        },
        {
            title: "Cancelled",
            value: stats.cancelledBookings || 0,
            icon: XCircle,
            color: "text-red-500",
            bgColor: "bg-red-50 dark:bg-red-950/30",
            borderColor: "border-red-200 dark:border-red-800",
        }
    ];

    return (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {statItems.map((item) => (
                <div
                    key={item.title}
                    className={`border-l-4 ${item.borderColor} bg-white dark:bg-zinc-900 rounded-lg shadow-sm hover:shadow-lg transition-all duration-300`}
                >
                    <div className="p-4">
                        <div className="flex items-center justify-between">
                            <span className="text-sm font-medium text-zinc-500 dark:text-zinc-400">
                                {item.title}
                            </span>
                            <div className={`p-2 rounded-lg ${item.bgColor}`}>
                                <item.icon className={`h-4 w-4 ${item.color}`} />
                            </div>
                        </div>
                        <div className="mt-2">
                            <span className="text-2xl font-bold text-zinc-900 dark:text-white">
                                {item.value}
                            </span>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}
