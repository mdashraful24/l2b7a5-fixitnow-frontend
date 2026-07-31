import { Suspense } from "react";
import { PaymentSuccessClient } from "./PaymentSuccessContent";

export default function PaymentSuccessPage() {
    return (
        <Suspense fallback={<PaymentSuccessLoading />}>
            <PaymentSuccessClient />
        </Suspense>
    );
}

function PaymentSuccessLoading() {
    return (
        <div className="flex min-h-[70vh] flex-col items-center justify-center">
            <div className="h-12 w-12 animate-spin rounded-full border-4 border-primary border-t-transparent" />
            <p className="mt-4 text-gray-600">Verifying your payment...</p>
        </div>
    );
}
