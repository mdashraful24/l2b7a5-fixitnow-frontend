import { Suspense } from "react";
import { XCircle } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { redirect } from "next/navigation";
import { getSingleBooking } from "@/app/(dashboardGroup)/_actions/getBookings";

export default function PaymentCancelPage({
    searchParams,
}: {
    searchParams: Promise<{ bookingId?: string }>;
}) {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <PaymentCancelContent searchParams={searchParams} />
        </Suspense>
    );
}

async function PaymentCancelContent({
    searchParams,
}: {
    searchParams: Promise<{ bookingId?: string }>;
}) {
    const params = await searchParams;
    const bookingId = params.bookingId;

    if (!bookingId) {
        redirect("/dashboard/customer/bookings");
    }

    const bookingResult = await getSingleBooking(bookingId);

    if (!bookingResult.success || !bookingResult.data) {
        redirect("/dashboard/customer/bookings");
    }

    return (
        <div className="flex min-h-[90vh] flex-col items-center justify-center px-4">
            <div className="max-w-md text-center">
                <div className="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-red-100 dark:bg-red-950/30">
                    <XCircle className="h-12 w-12 text-red-600 dark:text-red-400" />
                </div>
                <h1 className="text-3xl font-bold text-foreground">Payment Cancelled</h1>
                <p className="mt-3 text-muted-foreground">
                    Your payment was not completed. You can try again or contact support if you need assistance.
                </p>
                <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
                    {bookingId && (
                        <Link href={`/dashboard/customer/bookings/${bookingId}/pay`}>
                            <Button size="lg" className="cursor-pointer">Try Again</Button>
                        </Link>
                    )}
                    <Link href="/dashboard/customer/bookings">
                        <Button variant="outline" size="lg" className="cursor-pointer">Back to Bookings</Button>
                    </Link>
                </div>
            </div>
        </div>
    );
}
