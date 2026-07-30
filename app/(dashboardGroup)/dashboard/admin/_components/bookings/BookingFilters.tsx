"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { 
    Clock, 
    CheckCircle, 
    XCircle, 
    Loader2, 
    DollarSign,
    AlertCircle,
    ListChecks
} from "lucide-react";
import { BookingStats } from "@/lib/type";

type BookingFiltersProps = {
    stats?: BookingStats;
};

export function BookingFilters({ stats }: BookingFiltersProps) {
    const pathName = usePathname();
    const searchParams = useSearchParams();
    const router = useRouter();

    const currentStatus = searchParams.get("status") || "";

    const handleFilterClick = (value: string) => {
        const params = new URLSearchParams(searchParams.toString());
        
        if (value === currentStatus) {
            params.delete("status");
        } else if (value) {
            params.set("status", value);
        } else {
            params.delete("status");
        }
        
        router.replace(`${pathName}?${params.toString()}`);
    };

    const clearFilters = () => {
        const params = new URLSearchParams(searchParams.toString());
        params.delete("status");
        router.replace(`${pathName}?${params.toString()}`);
    };

    const filterOptions = [
        { 
            value: "", 
            label: "All", 
            icon: ListChecks,
            count: stats?.totalBookings || 0,
            color: "bg-blue-500"
        },
        { 
            value: "REQUESTED", 
            label: "Requested", 
            icon: Clock,
            count: stats?.requestedBookings || 0,
            color: "bg-yellow-500"
        },
        { 
            value: "ACCEPTED", 
            label: "Accepted", 
            icon: CheckCircle,
            count: stats?.acceptedBookings || 0,
            color: "bg-green-500"
        },
        { 
            value: "DECLINED", 
            label: "Declined", 
            icon: AlertCircle,
            count: stats?.declinedBookings || 0,
            color: "bg-orange-500"
        },
        { 
            value: "PAID", 
            label: "Paid", 
            icon: DollarSign,
            count: stats?.paidBookings || 0,
            color: "bg-emerald-500"
        },
        { 
            value: "IN_PROGRESS", 
            label: "In Progress", 
            icon: Loader2,
            count: stats?.inProgressBookings || 0,
            color: "bg-purple-500"
        },
        { 
            value: "COMPLETED", 
            label: "Completed", 
            icon: CheckCircle,
            count: stats?.completedBookings || 0,
            color: "bg-indigo-500"
        },
        { 
            value: "CANCELLED", 
            label: "Cancelled", 
            icon: XCircle,
            count: stats?.cancelledBookings || 0,
            color: "bg-red-500"
        }
    ];

    const hasFilters = currentStatus !== "";
    const activeFilter = filterOptions.find(f => f.value === currentStatus);

    return (
        <div className="space-y-3">
            <div className="flex flex-wrap items-center gap-2">
                {filterOptions.map((option) => {
                    const isActive = currentStatus === option.value;
                    const Icon = option.icon;
                    
                    return (
                        <button
                            key={option.value}
                            onClick={() => handleFilterClick(option.value)}
                            className={`
                                flex items-center gap-1.5 px-3.5 py-1.5 text-sm font-medium rounded-full 
                                transition-all duration-200 whitespace-nowrap
                                ${isActive 
                                    ? `${option.color} text-white shadow-md shadow-${option.color}/25 scale-105` 
                                    : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300 hover:bg-zinc-200 dark:hover:bg-zinc-700'
                                }
                            `}
                        >
                            <Icon className="h-3.5 w-3.5" />
                            {option.label}
                            {option.count > 0 && (
                                <span className={`
                                    ml-0.5 px-1.5 py-0.5 text-xs rounded-full
                                    ${isActive 
                                        ? 'bg-white/20 text-white' 
                                        : 'bg-zinc-200 dark:bg-zinc-700 text-zinc-600 dark:text-zinc-300'
                                    }
                                `}>
                                    {option.count}
                                </span>
                            )}
                        </button>
                    );
                })}
            </div>
            
            {hasFilters && activeFilter && (
                <div className="flex items-center gap-3 text-sm">
                    <span className="text-muted-foreground">
                        Showing: <span className="font-medium text-foreground">
                            {activeFilter.label}
                        </span>
                        {activeFilter.count > 0 && (
                            <span className="ml-1 text-muted-foreground">
                                ({activeFilter.count} bookings)
                            </span>
                        )}
                    </span>
                    <button
                        onClick={clearFilters}
                        className="text-xs text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/20 px-2 py-1 rounded transition-colors"
                    >
                        Clear filter ✕
                    </button>
                </div>
            )}
        </div>
    );
}
