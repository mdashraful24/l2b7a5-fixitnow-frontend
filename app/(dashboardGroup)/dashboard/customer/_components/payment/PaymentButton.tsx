"use client";

import { useState } from "react";
import { toast } from "sonner";
import { Loader2, CreditCard } from "lucide-react";
import { Button } from "@/components/ui/button";
import { createPaymentIntent } from "@/app/(dashboardGroup)/_actions/customer";

interface PaymentButtonProps {
    bookingId: string;
    amount: number;
    status: string;
}

export function PaymentButton({ bookingId, amount, status }: PaymentButtonProps) {
    const [loading, setLoading] = useState(false);

    if (status !== "ACCEPTED") {
        return null;
    }

    const handlePayment = async () => {
        setLoading(true);
        try {
            const result = await createPaymentIntent(bookingId);

            if (result.success && result.data?.checkoutUrl) {
                window.location.href = result.data.checkoutUrl;
            } else {
                toast.error(result.message || "Failed to initiate payment");
            }
        } catch (error) {
            console.error("Payment error:", error);
            toast.error("An error occurred while initiating payment");
        } finally {
            setLoading(false);
        }
    };

    return (
        <Button
            onClick={handlePayment}
            disabled={loading}
            className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white dark:bg-green-700 dark:hover:bg-green-800 cursor-pointer"
            size="lg"
        >
            {loading ? (
                <Loader2 className="h-5 w-5 animate-spin" />
            ) : (
                <CreditCard className="h-5 w-5" />
            )}
            Pay ${amount}
        </Button>
    );
}
