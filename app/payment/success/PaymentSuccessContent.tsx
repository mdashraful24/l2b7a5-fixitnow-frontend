/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { CheckCircle, XCircle, Loader2 } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { confirmPayment, revalidateBookingCache } from "@/app/(dashboardGroup)/_actions/customer";

export function PaymentSuccessClient() {
    const searchParams = useSearchParams();
    const sessionId = searchParams.get("session_id");
    const bookingIdParam = searchParams.get("bookingId");

    const [loading, setLoading] = useState(true);
    const [bookingId, setBookingId] = useState<string | null>(bookingIdParam);
    const [error, setError] = useState<string | null>(null);
    const [paymentConfirmed, setPaymentConfirmed] = useState(false);

    useEffect(() => {
        if (!sessionId) {
            setError("Missing session ID. Please contact support.");
            setLoading(false);
            return;
        }

        const confirm = async () => {
            try {
                const result = await confirmPayment(sessionId);

                if (result.success) {
                    const newBookingId = result.data?.bookingId;

                    if (newBookingId) {
                        setBookingId(newBookingId);
                        setPaymentConfirmed(true);
                        await revalidateBookingCache(newBookingId);
                    } else {
                        setError("Payment confirmed but no booking ID returned.");
                    }
                } else {
                    if (result.message?.includes("already been confirmed")) {
                        setPaymentConfirmed(true);
                        if (bookingIdParam) {
                            setBookingId(bookingIdParam);
                            await revalidateBookingCache(bookingIdParam);
                        }
                    } else {
                        setError(result.message || "Payment confirmation failed.");
                    }
                }
            } catch (err) {
                console.error("Confirmation error:", err);
                setError("An unexpected error occurred.");
            } finally {
                setLoading(false);
            }
        };

        confirm();
    }, [sessionId, bookingIdParam]);

    if (loading) {
        return (
            <div className="flex min-h-[80vh] flex-col items-center justify-center">
                <Loader2 className="h-12 w-12 animate-spin text-primary" />
                <p className="mt-4 text-muted-foreground">Confirming your payment...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex min-h-[80vh] flex-col items-center justify-center px-4">
                <div className="max-w-md text-center">
                    <div className="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-red-100 dark:bg-red-950/30">
                        <XCircle className="h-12 w-12 text-red-600 dark:text-red-400" />
                    </div>
                    <h1 className="text-3xl font-bold text-red-600 dark:text-red-400">Payment Confirmation Error</h1>
                    <p className="mt-3 text-muted-foreground">{error}</p>
                    <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
                        {bookingIdParam && (
                            <Link href={`/dashboard/customer/bookings/${bookingIdParam}/pay`}>
                                <Button size="lg" className="cursor-pointer">Check Booking Status</Button>
                            </Link>
                        )}
                        <Link href="/dashboard/customer/bookings">
                            <Button size="lg" variant="outline" className="cursor-pointer">Go to My Bookings</Button>
                        </Link>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="flex min-h-[80vh] flex-col items-center justify-center px-4">
            <div className="max-w-md text-center">
                <div className="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-green-100 dark:bg-green-950/30">
                    <CheckCircle className="h-12 w-12 text-green-600 dark:text-green-400" />
                </div>
                <h1 className="text-3xl font-bold text-foreground">Payment Successful! 🎉</h1>
                <p className="mt-3 text-muted-foreground">
                    Your payment has been confirmed. Your booking is now confirmed and the technician has been notified.
                </p>
                {paymentConfirmed && (
                    <div className="mt-4 rounded-lg bg-green-50 dark:bg-green-950/30 p-4 border border-green-200 dark:border-green-800">
                        <p className="text-sm text-green-700 dark:text-green-300 flex items-center gap-2">
                            <CheckCircle className="h-4 w-4" />
                            ✓ Payment confirmed successfully
                        </p>
                    </div>
                )}
                <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
                    {bookingId && (
                        <Link href={`/dashboard/customer/bookings/${bookingId}/pay`}>
                            <Button size="lg" className="cursor-pointer">View Booking Details</Button>
                        </Link>
                    )}
                    <Link href="/dashboard/customer/bookings">
                        <Button variant="outline" size="lg" className="cursor-pointer">View All Bookings</Button>
                    </Link>
                </div>
            </div>
        </div>
    );
}
