export default function BookingSkeleton() {
    return (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 overflow-hidden flex flex-col">
                    <div className="h-1 w-full bg-zinc-200 dark:bg-zinc-700 animate-pulse" />
                    <div className="p-4 flex flex-col flex-1">
                        <div className="space-y-3 flex-1">
                            <div className="flex items-start justify-between">
                                <div className="space-y-2 flex-1">
                                    <div className="h-5 w-3/4 bg-zinc-200 dark:bg-zinc-700 rounded animate-pulse" />
                                    <div className="h-4 w-1/2 bg-zinc-200 dark:bg-zinc-700 rounded animate-pulse" />
                                </div>
                                <div className="h-6 w-20 bg-zinc-200 dark:bg-zinc-700 rounded-full animate-pulse" />
                            </div>
                            <div className="bg-zinc-50 dark:bg-zinc-800/50 rounded-lg p-3 space-y-2">
                                <div className="h-4 w-full bg-zinc-200 dark:bg-zinc-700 rounded animate-pulse" />
                                <div className="h-4 w-3/4 bg-zinc-200 dark:bg-zinc-700 rounded animate-pulse" />
                                <div className="h-4 w-1/2 bg-zinc-200 dark:bg-zinc-700 rounded animate-pulse" />
                                <div className="h-4 w-2/3 bg-zinc-200 dark:bg-zinc-700 rounded animate-pulse" />
                            </div>
                        </div>
                        <div className="flex items-center justify-between pt-3 mt-3 border-t border-zinc-200 dark:border-zinc-700">
                            <div className="h-3 w-24 bg-zinc-200 dark:bg-zinc-700 rounded animate-pulse" />
                            <div className="h-8 w-24 bg-zinc-200 dark:bg-zinc-700 rounded animate-pulse" />
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}
