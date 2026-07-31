"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import { AlertCircle } from "lucide-react";
import { updateTechnicianBookingStatus } from "@/app/(dashboardGroup)/_actions/technician";
import { bookingStatusBadge, statusActions } from "@/lib/bookingConstants";
import { TechnicianBookingActionsProps } from "@/lib/type";

export function TechnicianBookingActions({ bookingId, currentStatus, compact = false }: TechnicianBookingActionsProps) {
    const router = useRouter();
    const [loadingStatus, setLoadingStatus] = useState<string | null>(null);

    const actions = statusActions[currentStatus] ?? [];

    const badge = bookingStatusBadge[currentStatus as keyof typeof bookingStatusBadge];
    const info = badge || {
        label: currentStatus,
        bg: "bg-gray-100",
        text: "text-gray-600",
        border: "border-gray-200",
        icon: AlertCircle,
    };

    const handleStatusChange = async (status: string) => {
        setLoadingStatus(status);

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
        } finally {
            // Clear loading state
            setLoadingStatus(null);
        }
    };

    // If no actions available, show status badge
    if (!actions.length) {
        return (
            <span className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-sm font-medium ${info.bg} ${info.text} ${info.border}`}>
                <info.icon className="h-4 w-4" />
                {info.label}
            </span>
        );
    }

    // Check if any action is disabled (for non-actionable statuses)
    const isActionable = currentStatus !== "COMPLETED" && currentStatus !== "CANCELLED";

    return (
        <div className={`flex flex-wrap gap-4 ${compact ? "justify-start" : "justify-end"}`}>
            {/* Status badge */}
            <span className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-sm font-medium ${info.bg} ${info.text} ${info.border}`}>
                <info.icon className="h-4 w-4" />
                {info.label}
            </span>

            {/* Action buttons */}
            {actions.map((action) => {
                const isDisabled = !isActionable || loadingStatus !== null || action.status === currentStatus;
                const isCancelAction = action.status === "CANCELLED";
                const isLoading = loadingStatus === action.status;

                return (
                    <button
                        key={action.status}
                        type="button"
                        disabled={isDisabled}
                        onClick={() => handleStatusChange(action.status)}
                        className={`inline-flex items-center gap-1.5 rounded-lg px-3 py-2 text-xs font-semibold transition disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer ${isDisabled
                                ? "bg-gray-200 text-gray-500"
                                : action.variant || (isCancelAction
                                    ? "bg-red-600 hover:bg-red-700 text-white"
                                    : "bg-primary hover:bg-primary/90 text-white")
                            }`}
                    >
                        <action.icon className={`h-3.5 w-3.5 ${isLoading ? "animate-spin" : ""}`} />
                        {isLoading ? "Processing..." : action.label}
                    </button>
                );
            })}
        </div>
    );
}
