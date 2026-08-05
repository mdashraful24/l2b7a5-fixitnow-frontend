const TestimonialsSkeleton = () => {
    return (
        <section className="py-20 bg-background">
            <div className="container mx-auto px-4">
                {/* Heading */}
                {/* <div className="text-center max-w-3xl mx-auto mb-12">
                    <div className="h-10 w-80 bg-muted rounded-lg animate-pulse mx-auto" />
                    <div className="h-5 w-64 bg-muted rounded animate-pulse mx-auto mt-4" />
                </div> */}

                <div className="relative w-full max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {Array.from({ length: 3 }).map((_, index) => (
                            <div
                                key={index}
                                className="rounded-2xl border border-border bg-card p-6"
                            >
                                {/* Rating */}
                                <div className="flex gap-1 mb-4">
                                    {Array.from({ length: 5 }).map((_, i) => (
                                        <div
                                            key={i}
                                            className="h-4 w-4 rounded-full bg-muted animate-pulse"
                                        />
                                    ))}
                                </div>

                                {/* Review */}
                                <div className="min-h-20 space-y-2 mb-3">
                                    <div className="h-4 w-full rounded bg-muted animate-pulse" />
                                    <div className="h-4 w-11/12 rounded bg-muted animate-pulse" />
                                    <div className="h-4 w-4/5 rounded bg-muted animate-pulse" />
                                </div>

                                {/* Customer */}
                                <div className="flex items-center gap-3">
                                    <div className="h-10 w-10 rounded-full bg-muted animate-pulse" />

                                    <div className="flex-1 space-y-2">
                                        <div className="h-4 w-28 rounded bg-muted animate-pulse" />
                                        <div className="h-3 w-20 rounded bg-muted animate-pulse" />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Navigation Skeleton */}
                    <div className="hidden lg:block">
                        <div className="absolute left-0 top-1/2 -translate-x-12 -translate-y-1/2 h-10 w-10 rounded-full bg-muted animate-pulse" />
                        <div className="absolute right-0 top-1/2 translate-x-12 -translate-y-1/2 h-10 w-10 rounded-full bg-muted animate-pulse" />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default TestimonialsSkeleton;
