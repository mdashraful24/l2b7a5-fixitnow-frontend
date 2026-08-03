export function PaymentSuccessLoading() {
    return (
        <div className="flex min-h-[80vh] flex-col items-center justify-center">
            <div className="h-12 w-12 animate-spin rounded-full border-4 border-primary dark:border-blue-500 border-t-transparent" />
            <p className="mt-4">Verifying your payment...</p>
        </div>

        // <div className="flex min-h-[80vh] items-center justify-center px-4">
        //     <div className="w-full max-w-md rounded-2xl border bg-card p-8 text-center shadow-sm">
        //         {/* Animated Icon Skeleton */}
        //         <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-muted">
        //             <div className="h-12 w-12 animate-spin rounded-full border-4 border-primary border-t-transparent" />
        //         </div>

        //         {/* Title Skeleton */}
        //         <div className="mx-auto mt-8 h-8 w-64 animate-pulse rounded-lg bg-muted" />

        //         {/* Description Skeleton */}
        //         <div className="mt-4 space-y-2">
        //             <div className="mx-auto h-4 w-72 animate-pulse rounded bg-muted" />
        //             <div className="mx-auto h-4 w-56 animate-pulse rounded bg-muted" />
        //         </div>

        //         {/* Verification Card */}
        //         <div className="mt-8 rounded-xl border bg-muted/30 p-5">
        //             <div className="flex items-center justify-center gap-3">
        //                 <div className="h-5 w-5 animate-spin rounded-full border-2 border-primary border-t-transparent" />
        //                 <p className="text-sm font-medium">
        //                     Verifying your payment
        //                 </p>
        //             </div>
        //             <p className="mt-3 text-sm text-muted-foreground">
        //                 Please wait while we confirm your transaction securely.
        //             </p>
        //         </div>

        //         {/* Security Message */}
        //         <p className="mt-6 text-xs text-muted-foreground">
        //             🔒 Do not refresh or close this page
        //         </p>
        //     </div>
        // </div>
    );
}
