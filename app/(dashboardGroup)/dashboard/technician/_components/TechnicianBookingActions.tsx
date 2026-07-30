"use client";

import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { toast } from "sonner";
import {
    CheckCircle2,
    XCircle,
    PlayCircle,
    ClipboardCheck,
    CheckCircle,
    AlertCircle,
    CreditCard,
    Ban
} from "lucide-react";
import { updateTechnicianBookingStatus } from "@/app/(dashboardGroup)/_actions/technician";

type TechnicianBookingActionsProps = {
    bookingId: string;
    currentStatus: string;
    compact?: boolean;
};

const statusActions: Record<string, { label: string; status: string; icon: React.ElementType; variant?: string }[]> = {
    REQUESTED: [
        {
            label: "Accept",
            status: "ACCEPTED",
            icon: CheckCircle2,
            variant: "bg-emerald-600 hover:bg-emerald-700 text-white",
        },
        {
            label: "Decline",
            status: "DECLINED",
            icon: XCircle,
            variant: "bg-red-600 hover:bg-red-700 text-white",
        },
        {
            label: "Cancel",
            status: "CANCELLED",
            icon: Ban,
            variant: "bg-gray-600 hover:bg-gray-700 text-white",
        },
    ],
    ACCEPTED: [
        {
            label: "Start Work",
            status: "IN_PROGRESS",
            icon: PlayCircle,
            variant: "bg-sky-600 hover:bg-sky-700 text-white",
        },
    ],
    PAID: [
        {
            label: "Start Work",
            status: "IN_PROGRESS",
            icon: PlayCircle,
            variant: "bg-sky-600 hover:bg-sky-700 text-white",
        },
    ],
    IN_PROGRESS: [
        {
            label: "Mark as Completed",
            status: "COMPLETED",
            icon: ClipboardCheck,
            variant: "bg-green-600 hover:bg-green-700 text-white",
        },
    ],
    COMPLETED: [
        {
            label: "Completed",
            status: "COMPLETED",
            icon: CheckCircle,
            variant: "bg-gray-400 cursor-not-allowed text-white",
        },
    ],
    DECLINED: [
        {
            label: "Declined",
            status: "DECLINED",
            icon: XCircle,
            variant: "bg-gray-400 cursor-not-allowed text-white",
        },
    ],
    CANCELLED: [
        {
            label: "Cancelled",
            status: "CANCELLED",
            icon: Ban,
            variant: "bg-gray-400 cursor-not-allowed text-white",
        },
    ],
};

// ✅ Status info messages
const statusInfo: Record<string, { label: string; color: string; icon: React.ElementType }> = {
    REQUESTED: {
        label: "Pending",
        color: "bg-yellow-50 text-yellow-700 border-yellow-200",
        icon: AlertCircle,
    },
    ACCEPTED: {
        label: "Accepted",
        color: "bg-emerald-50 text-emerald-700 border-emerald-200",
        icon: CheckCircle2,
    },
    PAID: {
        label: "Paid",
        color: "bg-indigo-50 text-indigo-700 border-indigo-200",
        icon: CreditCard,
    },
    IN_PROGRESS: {
        label: "In Progress",
        color: "bg-sky-50 text-sky-700 border-sky-200",
        icon: PlayCircle,
    },
    COMPLETED: {
        label: "Completed",
        color: "bg-green-50 text-green-700 border-green-200",
        icon: CheckCircle,
    },
    DECLINED: {
        label: "Declined",
        color: "bg-red-50 text-red-700 border-red-200",
        icon: XCircle,
    },
    CANCELLED: {
        label: "Cancelled",
        color: "bg-gray-50 text-gray-700 border-gray-200",
        icon: Ban,
    },
};

export function TechnicianBookingActions({ bookingId, currentStatus, compact = false }: TechnicianBookingActionsProps) {
    const router = useRouter();
    const [isPending, startTransition] = useTransition();

    const actions = statusActions[currentStatus] ?? [];
    const info = statusInfo[currentStatus] || {
        label: currentStatus,
        color: "bg-gray-100 text-gray-600 border-gray-200",
        icon: AlertCircle,
    };

    const handleStatusChange = (status: string) => {
        startTransition(async () => {
            try {
                const result = await updateTechnicianBookingStatus({ bookingId, status });

                if (result.success) {
                    toast.success(result.message || `Booking ${status.toLowerCase()} successfully`);
                    router.refresh();
                } else {
                    toast.error(result.message || "Unable to update booking status");
                }
            } catch (error) {
                console.error("Error updating booking:", error);
                toast.error("An error occurred while updating the booking");
            }
        });
    };

    // ✅ If no actions available, show status badge
    if (!actions.length) {
        return (
            <span className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-sm font-medium ${info.color}`}>
                <info.icon className="h-4 w-4" />
                {info.label}
            </span>
        );
    }

    // ✅ Check if any action is disabled (for non-actionable statuses)
    const isActionable = currentStatus !== "COMPLETED" && currentStatus !== "DECLINED" && currentStatus !== "CANCELLED";

    return (
        <div className={`flex flex-wrap gap-2 ${compact ? "justify-start" : "justify-end"}`}>
            {/* Status badge */}
            <span className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-sm font-medium ${info.color}`}>
                <info.icon className="h-4 w-4" />
                {info.label}
            </span>

            {/* Action buttons */}
            {actions.map((action) => {
                const isDisabled = !isActionable || isPending || action.status === currentStatus;
                const isCancelAction = action.status === "CANCELLED" || action.status === "DECLINED";

                return (
                    <button
                        key={action.status}
                        type="button"
                        disabled={isDisabled}
                        onClick={() => handleStatusChange(action.status)}
                        className={`inline-flex items-center gap-1.5 rounded-lg px-3 py-2 text-xs font-semibold transition disabled:opacity-60 disabled:cursor-not-allowed ${isDisabled
                                ? "bg-gray-200 text-gray-500"
                                : action.variant || (isCancelAction
                                    ? "bg-red-600 hover:bg-red-700 text-white"
                                    : "bg-primary hover:bg-primary/90 text-white")
                            }`}
                    >
                        <action.icon className="h-3.5 w-3.5" />
                        {isPending ? "Processing..." : action.label}
                    </button>
                );
            })}
        </div>
    );
}
