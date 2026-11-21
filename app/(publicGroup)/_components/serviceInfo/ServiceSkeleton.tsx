const ServiceSkeleton = () => {
    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div className="h-4 w-40 animate-pulse rounded-full bg-muted" />
                <div className="h-6 w-24 animate-pulse rounded-full bg-muted" />
            </div>
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
                {Array.from({ length: 6 }).map((_, index) => (
                    <div
                        key={index}
                        className="overflow-hidden rounded-2xl border border-border/70 bg-card/70"
                    >
                        <div className="aspect-[16/10] animate-pulse bg-muted" />
                        <div className="space-y-3 p-5">
                            <div className="flex items-center justify-between gap-3">
                                <div className="h-6 w-24 animate-pulse rounded-full bg-muted" />
                                <div className="h-4 w-12 animate-pulse rounded-full bg-muted" />
                            </div>
                            <div className="h-5 w-4/5 animate-pulse rounded bg-muted" />
                            <div className="h-4 w-full animate-pulse rounded bg-muted" />
                            <div className="h-4 w-2/3 animate-pulse rounded bg-muted" />
                            <div className="h-px bg-border/70" />
                            <div className="flex items-center gap-3">
                                <div className="size-8 animate-pulse rounded-full bg-muted" />
                                <div className="flex-1 space-y-2">
                                    <div className="h-3 w-1/2 animate-pulse rounded bg-muted" />
                                    <div className="h-3 w-2/5 animate-pulse rounded bg-muted" />
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-2 pt-1">
                                <div className="h-10 animate-pulse rounded-xl bg-muted" />
                                <div className="h-10 animate-pulse rounded-xl bg-muted" />
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ServiceSkeleton;
