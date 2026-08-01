const TechServiceSkeleton = () => {
    return (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => (
                <div
                    key={i}
                    className="rounded-xl border border-border bg-card p-6 animate-pulse"
                >
                    {/* Header */}
                    <div className="mb-4 flex items-start justify-between gap-4">
                        <div className="h-6 w-3/5 rounded-md bg-muted/50 dark:bg-muted/30" />
                        <div className="h-8 w-16 rounded-md bg-muted/50 dark:bg-muted/30" />
                    </div>

                    {/* Description */}
                    <div className="space-y-2">
                        <div className="h-4 w-full rounded bg-muted/50 dark:bg-muted/30" />
                        <div className="h-4 w-[90%] rounded bg-muted/50 dark:bg-muted/30" />
                        <div className="h-4 w-[70%] rounded bg-muted/50 dark:bg-muted/30" />
                    </div>

                    {/* Badges */}
                    <div className="mt-5 flex flex-wrap gap-2">
                        <div className="h-6 w-20 rounded-full bg-muted/50 dark:bg-muted/30" />
                        <div className="h-6 w-16 rounded-full bg-muted/50 dark:bg-muted/30" />
                        <div className="h-6 w-24 rounded-full bg-muted/50 dark:bg-muted/30" />
                    </div>
                </div>
            ))}
        </div>
    );
};

export default TechServiceSkeleton;
