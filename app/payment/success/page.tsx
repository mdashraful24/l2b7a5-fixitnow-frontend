import { Suspense } from "react";
import { redirect } from "next/navigation";
import { PaymentSuccessClient } from "./PaymentSuccessContent";

export default async function PaymentSuccessPage({
    searchParams,
}: {
    searchParams: Promise<{ session_id?: string }>;
}) {
    const params = await searchParams;

    if (!params.session_id) {
        redirect("/dashboard/customer/bookings");
    }

    return (
        <Suspense fallback={<PaymentSuccessLoading />}>
            <PaymentSuccessClient />
        </Suspense>
    );
}

function PaymentSuccessLoading() {
    return (
        <div className="flex min-h-[80vh] flex-col items-center justify-center">
            <div className="h-12 w-12 animate-spin rounded-full border-4 border-primary border-t-transparent" />
            <p className="mt-4">Verifying your payment...</p>
        </div>
    );
}
