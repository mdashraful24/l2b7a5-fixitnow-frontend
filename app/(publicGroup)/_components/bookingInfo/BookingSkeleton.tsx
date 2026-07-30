export function BookingSkeleton() {
    return (
        <div className="space-y-6">
            {/* Step 1: Slot selector skeleton */}
            <div className="rounded-xl border bg-white p-6 shadow-sm">
                <div className="mb-1 h-6 w-64 animate-pulse rounded bg-gray-200" />
                <div className="mb-4 h-4 w-80 animate-pulse rounded bg-gray-200" />
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                    {[1, 2].map((i) => (
                        <div key={i} className="flex flex-col rounded-xl border-2 border-gray-200 p-4">
                            <div className="h-5 w-32 animate-pulse rounded bg-gray-200" />
                            <div className="mt-1 h-4 w-40 animate-pulse rounded bg-gray-200" />
                        </div>
                    ))}
                </div>
            </div>

            {/* Step 2: Time selector skeleton */}
            <div className="rounded-xl border bg-white p-6 shadow-sm">
                <div className="mb-1 h-6 w-48 animate-pulse rounded bg-gray-200" />
                <div className="mb-4 h-4 w-96 animate-pulse rounded bg-gray-200" />
                <div className="grid grid-cols-3 gap-2 sm:grid-cols-4">
                    {[1, 2, 3, 4].map((i) => (
                        <div key={i} className="h-10 animate-pulse rounded-lg bg-gray-200" />
                    ))}
                </div>
            </div>

            {/* Step 3: Customer details skeleton */}
            <div className="rounded-xl border bg-white p-6 shadow-sm">
                <div className="mb-1 h-6 w-48 animate-pulse rounded bg-gray-200" />
                <div className="mb-4 h-4 w-64 animate-pulse rounded bg-gray-200" />
                <div className="space-y-4">
                    <div>
                        <div className="mb-1.5 h-4 w-32 animate-pulse rounded bg-gray-200" />
                        <div className="h-20 w-full animate-pulse rounded-lg bg-gray-200" />
                    </div>
                    <div>
                        <div className="mb-1.5 h-4 w-24 animate-pulse rounded bg-gray-200" />
                        <div className="h-16 w-full animate-pulse rounded-lg bg-gray-200" />
                    </div>
                </div>
            </div>

            {/* Submit button skeleton */}
            <div className="h-14 w-full animate-pulse rounded-xl bg-gray-200" />
        </div>
    );
}
