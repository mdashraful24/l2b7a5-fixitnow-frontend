import { Suspense } from "react";
import { redirect } from "next/navigation";
import { PaymentSuccessClient } from "../_components/PaymentSuccessContent";
import { PaymentSuccessLoading } from "../_components/PaymentSuccessLoading";

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
