import { Skeleton } from "@/components/ui/skeleton";

const DashboardLoading = () => {
    return (
        <div className="lg:container mx-auto max-w-7xl px-4 py-8">
            <div className="flex flex-col gap-10 md:flex-row md:gap-8">
                {/* Sidebar */}
                <aside className="w-full shrink-0 md:w-48 lg:w-64">
                    <div className="sticky top-[6.6rem] rounded-xl border border-border bg-card p-2 shadow-sm">
                        <div className="space-y-1">
                            {Array.from({ length: 7 }).map((_, index) => (
                                <div
                                    key={index}
                                    className="flex items-center gap-3 px-3 py-2.5"
                                >
                                    <Skeleton className="h-4 w-4 shrink-0 rounded" />
                                    <Skeleton
                                        className="h-4"
                                        style={{ width: `${70 + ((index * 13) % 40)}%` }}
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                </aside>

                {/* Main */}
                <main className="min-w-0 flex-1 space-y-8">
                    {/* Header */}
                    <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                        <div className="space-y-3">
                            <Skeleton className="h-8 w-64 max-w-full" />
                            <Skeleton className="h-4 w-80 max-w-full" />
                        </div>

                        <Skeleton className="h-10 w-40 rounded-lg" />
                    </div>

                    {/* Stat cards */}
                    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
                        {Array.from({ length: 5 }).map((_, index) => (
                            <div
                                key={index}
                                className="rounded-xl border border-border bg-card p-5 shadow-sm"
                            >
                                <div className="flex items-center gap-2">
                                    <Skeleton className="h-5 w-5 shrink-0 rounded" />
                                    <Skeleton className="h-4 w-20" />
                                </div>

                                <Skeleton className="mt-4 h-7 w-16" />

                                <Skeleton className="mt-2 h-3 w-24" />
                            </div>
                        ))}
                    </div>

                    {/* Charts */}
                    <div className="grid gap-4 lg:grid-cols-3">
                        <div className="rounded-2xl border border-border bg-card p-6 shadow-sm lg:col-span-2">
                            <div className="flex items-center justify-between">
                                <Skeleton className="h-5 w-40" />
                                <Skeleton className="h-8 w-28 rounded-lg" />
                            </div>

                            <Skeleton className="mt-6 h-64 w-full rounded-xl" />
                        </div>

                        <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
                            <Skeleton className="h-5 w-32" />

                            <Skeleton className="mx-auto mt-6 h-48 w-48 rounded-full" />

                            <div className="mt-6 space-y-2">
                                {Array.from({ length: 3 }).map((_, index) => (
                                    <Skeleton key={index} className="h-4 w-full" />
                                ))}
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
};

export default DashboardLoading;
