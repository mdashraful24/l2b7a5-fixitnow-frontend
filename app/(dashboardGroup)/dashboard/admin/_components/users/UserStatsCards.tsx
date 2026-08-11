import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { UserStats } from "@/lib/type";
import {
    Users,
    Wrench,
    UserCog,
    UserCheck,
    UserX
} from "lucide-react";

export function UserStatsCards({ stats }: { stats: UserStats }) {
    const statItems = [
        {
            title: "Total Users",
            value: stats.totalUsers || 0,
            icon: Users,
            color: "text-blue-500",
            bgColor: "bg-blue-100 dark:bg-blue-950/30",
            borderColor: "border-blue-500 dark:border-blue-800",
            description: "All registered users",
        },
        {
            title: "Technicians",
            value: stats.totalTechnicians || 0,
            icon: Wrench,
            color: "text-blue-500",
            bgColor: "bg-blue-100 dark:bg-blue-950/30",
            borderColor: "border-blue-500 dark:border-blue-800",
            description: "Service providers",
        },
        {
            title: "Customers",
            value: stats.totalCustomers || 0,
            icon: UserCog,
            color: "text-purple-500",
            bgColor: "bg-purple-100 dark:bg-purple-950/30",
            borderColor: "border-purple-500 dark:border-purple-800",
            description: "Regular users",
        },
        {
            title: "Active",
            value: stats.activeUsers || 0,
            icon: UserCheck,
            color: "text-green-500",
            bgColor: "bg-green-100 dark:bg-green-950/30",
            borderColor: "border-green-500 dark:border-green-800",
            description: "Active accounts",
        },
        {
            title: "Banned",
            value: stats.bannedUsers || 0,
            icon: UserX,
            color: "text-red-500",
            bgColor: "bg-red-100 dark:bg-red-950/30",
            borderColor: "border-red-500 dark:border-red-800",
            description: "Suspended accounts",
        }
    ];

    return (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
            {statItems.map((item) => (
                <Card
                    key={item.title}
                    className={`border-l-4 ${item.borderColor} hover:shadow-lg transition-all duration-300 hover:-translate-y-1`}
                >
                    <CardHeader className="flex flex-row items-center justify-between">
                        <CardTitle className="text-sm font-medium">
                            {item.title}
                        </CardTitle>
                        <div className={`rounded-lg p-2 ${item.bgColor}`}>
                            <item.icon className={`h-4 w-4 ${item.color}`} />
                        </div>
                    </CardHeader>
                    <CardContent className="-mt-5">
                        <div className="flex items-baseline gap-2">
                            <div className="text-2xl font-bold">{item.value}</div>
                        </div>
                        <p className="text-xs mt-1">{item.description}</p>
                        <div className="mt-2 h-1 w-full bg-muted/30 rounded-full">
                            <div
                                className={`h-full rounded-full bg-linear-to-r from-${item.color.split('-')[1]}-400 to-${item.color.split('-')[1]}-600`}
                                style={{
                                    width: `${(item.value / stats.totalUsers) * 100}%`,
                                    backgroundColor: item.color === 'text-blue-500' ? '#3b82f6' :
                                        item.color === 'text-green-500' ? '#22c55e' :
                                            item.color === 'text-orange-500' ? '#f97316' :
                                                item.color === 'text-emerald-500' ? '#10b981' :
                                                    '#ef4444'
                                }}
                            />
                        </div>
                    </CardContent>
                </Card>
            ))}
        </div>
    );
}