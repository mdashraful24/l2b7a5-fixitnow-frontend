export default function CategoriesSkeleton() {
    return (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => (
                <div
                    key={i}
                    className="rounded-xl border border-border bg-card p-6 animate-pulse"
                >
                    {/* Header */}
                    <div className="flex items-start justify-between gap-4">
                        <div className="flex items-center gap-3">
                            <div className="h-10 w-10 rounded-lg bg-muted/50 dark:bg-muted/30" />
                            <div className="space-y-2">
                                <div className="h-5 w-32 rounded bg-muted/50 dark:bg-muted/30" />
                                <div className="h-4 w-16 rounded bg-muted/50 dark:bg-muted/30" />
                            </div>
                        </div>
                        <div className="flex gap-1">
                            <div className="h-8 w-16 rounded bg-muted/50 dark:bg-muted/30" />
                            <div className="h-8 w-16 rounded bg-muted/50 dark:bg-muted/30" />
                        </div>
                    </div>

                    {/* Description */}
                    <div className="mt-4 space-y-2">
                        <div className="h-4 w-full rounded bg-muted/50 dark:bg-muted/30" />
                        <div className="h-4 w-[90%] rounded bg-muted/50 dark:bg-muted/30" />
                        <div className="h-4 w-[70%] rounded bg-muted/50 dark:bg-muted/30" />
                    </div>

                    {/* Footer */}
                    <div className="mt-4 space-y-2">
                        <div className="h-3 w-3/4 rounded bg-muted/50 dark:bg-muted/30" />
                        <div className="h-3 w-1/2 rounded bg-muted/50 dark:bg-muted/30" />
                    </div>
                </div>
            ))}
        </div>
    );
}
