import { Suspense } from "react";
import { CheckCircle, Loader2 } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { confirmPayment } from "@/app/(dashboardGroup)/_actions/customer";

export default function PaymentSuccessPage({
    searchParams,
}: {
    searchParams: Promise<{ session_id?: string; bookingId?: string }>;
}) {
    return (
        <Suspense fallback={<PaymentSuccessLoading />}>
            <PaymentSuccessContent searchParams={searchParams} />
        </Suspense>
    );
}

function PaymentSuccessLoading() {
    return (
        <div className="flex min-h-[70vh] flex-col items-center justify-center">
            <Loader2 className="h-12 w-12 animate-spin text-primary" />
            <p className="mt-4 text-gray-600">Verifying your payment...</p>
        </div>
    );
}

async function PaymentSuccessContent({
    searchParams,
}: {
    searchParams: Promise<{ session_id?: string; bookingId?: string }>;
}) {
    const params = await searchParams;
    const sessionId = params.session_id;
    const bookingId = params.bookingId;

    let paymentConfirmed = false;
    let bookingIdFromPayment: string | null = null;

    if (sessionId) {
        try {
            const result = await confirmPayment(sessionId);
            if (result.success && result.data?.bookingId) {
                paymentConfirmed = true;
                bookingIdFromPayment = result.data.bookingId;
            }
        } catch (error) {
            console.error("Payment confirmation error:", error);
        }
    }

    const finalBookingId = bookingIdFromPayment || bookingId;

    return (
        <div className="flex min-h-[70vh] flex-col items-center justify-center px-4">
            <div className="max-w-md text-center">
                <div className="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-green-100">
                    <CheckCircle className="h-12 w-12 text-green-600" />
                </div>
                <h1 className="text-3xl font-bold text-gray-900">Payment Successful! 🎉</h1>
                <p className="mt-3 text-gray-600">
                    Your payment has been confirmed. Your booking is now confirmed and the technician has been notified.
                </p>
                {paymentConfirmed && (
                    <div className="mt-4 rounded-lg bg-green-50 p-4 border border-green-200">
                        <p className="text-sm text-green-700">✓ Payment confirmed successfully</p>
                    </div>
                )}
                <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
                    {finalBookingId && (
                        <Link href={`/dashboard/customer/bookings/${finalBookingId}`}>
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
