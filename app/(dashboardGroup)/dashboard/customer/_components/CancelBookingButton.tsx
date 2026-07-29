"use client";

import { useState } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Loader2, X } from "lucide-react";
import { cancelBooking } from "@/app/(dashboardGroup)/_actions/cancelBooking";

export function CancelBookingButton({ bookingId }: { bookingId: string }) {
    const [loading, setLoading] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);
    const router = useRouter();

    const handleCancel = async () => {
        setLoading(true);
        const result = await cancelBooking(bookingId);
        setLoading(false);
        setShowConfirm(false);

        if (result.success) {
            toast.success("Booking cancelled successfully.");
            router.refresh();
        } else {
            toast.error(result.message || "Failed to cancel booking.");
        }
    };

    if (showConfirm) {
        return (
            <div className="flex items-center gap-1">
                <span className="text-xs text-gray-500">Sure?</span>
                <button
                    onClick={handleCancel}
                    disabled={loading}
                    className="flex items-center gap-1 rounded-lg bg-red-500 px-3 py-1.5 text-xs font-medium text-white transition hover:bg-red-600 disabled:opacity-60"
                >
                    {loading ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : "Yes, Cancel"}
                </button>
                <button
                    onClick={() => setShowConfirm(false)}
                    className="rounded-lg border border-gray-200 px-2 py-1.5 text-xs text-gray-600 hover:bg-gray-50"
                >
                    No
                </button>
            </div>
        );
    }

    return (
        <button
            onClick={() => setShowConfirm(true)}
            className="flex items-center gap-1 rounded-lg border border-red-200 px-3 py-1.5 text-xs font-medium text-red-500 transition hover:bg-red-50"
        >
            <X className="h-3.5 w-3.5" />
            Cancel
        </button>
    );
}
