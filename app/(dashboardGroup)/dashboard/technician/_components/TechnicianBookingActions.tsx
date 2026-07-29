"use client";

import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { toast } from "sonner";
import { CheckCircle2, XCircle, PlayCircle, ClipboardCheck } from "lucide-react";
import { updateTechnicianBookingStatus } from "@/app/(dashboardGroup)/_actions/technician";

type TechnicianBookingActionsProps = {
    bookingId: string;
    currentStatus: string;
    compact?: boolean;
};

const statusActions = {
    REQUESTED: [
        { label: "Accept", status: "CONFIRMED" as const, icon: CheckCircle2 },
        { label: "Decline", status: "CANCELLED" as const, icon: XCircle },
    ],
    CONFIRMED: [
        { label: "Start Job", status: "IN_PROGRESS" as const, icon: PlayCircle },
    ],
    IN_PROGRESS: [
        { label: "Mark Completed", status: "COMPLETED" as const, icon: ClipboardCheck },
    ],
} as const;

export function TechnicianBookingActions({ bookingId, currentStatus, compact = false }: TechnicianBookingActionsProps) {
    const router = useRouter();
    const [isPending, startTransition] = useTransition();

    const actions = statusActions[currentStatus as keyof typeof statusActions] ?? [];

    const handleStatusChange = (status: "CONFIRMED" | "CANCELLED" | "IN_PROGRESS" | "COMPLETED") => {
        startTransition(async () => {
            const result = await updateTechnicianBookingStatus({ bookingId, status });

            if (result.success) {
                toast.success(result.message || "Booking updated successfully");
                router.refresh();
            } else {
                toast.error(result.message || "Unable to update booking status");
            }
        });
    };

    if (!actions.length) {
        return (
            <span className={`inline-flex rounded-full border px-3 py-1 text-xs font-medium ${compact ? "bg-gray-100 text-gray-600 border-gray-200" : "bg-gray-50 text-gray-500 border-gray-200"}`}>
                No actions available
            </span>
        );
    }

    return (
        <div className={`flex flex-wrap gap-2 ${compact ? "justify-start" : "justify-end"}`}>
            {actions.map((action) => (
                <button
                    key={action.status}
                    type="button"
                    disabled={isPending}
                    onClick={() => handleStatusChange(action.status)}
                    className={`inline-flex items-center gap-1.5 rounded-lg px-3 py-2 text-xs font-semibold transition disabled:opacity-60 ${
                        action.status === "CANCELLED"
                            ? "bg-red-500 text-white hover:bg-red-600"
                            : "bg-primary text-white hover:bg-primary/90"
                    }`}
                >
                    <action.icon className="h-3.5 w-3.5" />
                    {action.label}
                </button>
            ))}
        </div>
    );
}