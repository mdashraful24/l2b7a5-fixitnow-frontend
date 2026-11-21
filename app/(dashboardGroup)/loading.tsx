import { Skeleton } from "@/components/ui/skeleton";
import { Wrench } from "lucide-react";

const DashboardLoading = () => {
    return (
        <div className="flex min-h-screen bg-background">
            <aside className="hidden w-[264px] shrink-0 border-r border-border/70 bg-muted/30 lg:block">
                <div className="relative sticky top-0 h-screen">
                    <div className="flex h-16 shrink-0 items-center gap-2 border-b border-border/70 px-3">
                        <Skeleton className="size-8 shrink-0 rounded-md" />
                        <div className="brand min-w-0">
                            <span className="brand-mark">
                                <Wrench size={17} strokeWidth={2.5} />
                            </span>
                            <p className="truncate">
                                FixIt<span>Now</span>
                            </p>
                        </div>
                    </div>

                    <div className="space-y-6 px-3 py-5">
                        {Array.from({ length: 2 }).map((_, groupIndex) => (
                            <div key={groupIndex} className="space-y-2">
                                <Skeleton className="ml-3 h-3 w-20" />
                                {Array.from({ length: groupIndex === 0 ? 5 : 1 }).map((_, index) => (
                                    <div
                                        key={index}
                                        className="flex items-center gap-3 rounded-full px-3 py-2.5"
                                    >
                                        <Skeleton className="size-4 shrink-0 rounded" />
                                        <Skeleton
                                            className="h-4"
                                            style={{ width: `${60 + ((index * 11) % 35)}%` }}
                                        />
                                    </div>
                                ))}
                            </div>
                        ))}
                    </div>

                    <div className="absolute inset-x-0 bottom-0 border-t border-border/70 bg-muted/30 p-3">
                        <div className="flex items-center gap-3 rounded-lg bg-card p-3">
                            <Skeleton className="size-9 shrink-0 rounded-full" />
                            <div className="min-w-0 flex-1 space-y-2">
                                <Skeleton className="h-3.5 w-28 max-w-full" />
                                <Skeleton className="h-3 w-36 max-w-full" />
                            </div>
                            <Skeleton className="size-4 shrink-0 rounded" />
                        </div>
                    </div>
                </div>
            </aside>

            <div className="min-w-0 flex-1">
                <div className="mx-auto w-full max-w-[1600px] px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
                    <div className="mb-6 flex items-center gap-3 lg:hidden">
                        <Skeleton className="size-9 shrink-0 rounded-md" />
                        <div className="brand min-w-0">
                            <span className="brand-mark">
                                <Wrench size={17} strokeWidth={2.5} />
                            </span>
                            <p className="truncate">
                                FixIt<span>Now</span>
                            </p>
                        </div>
                    </div>

                    <main className="space-y-6">
                        <section className="flex flex-col gap-4 border-b border-border/70 pb-5 sm:flex-row sm:items-end sm:justify-between">
                            <div className="min-w-0 space-y-3">
                                <Skeleton className="h-3 w-28" />
                                <Skeleton className="h-8 w-64 max-w-full" />
                                <Skeleton className="h-4 w-80 max-w-full" />
                            </div>
                            <Skeleton className="h-10 w-36 rounded-lg" />
                        </section>

                        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
                            {Array.from({ length: 5 }).map((_, index) => (
                                <div
                                    key={index}
                                    className="rounded-xl border border-border/80 bg-card p-5 shadow-sm"
                                >
                                    <div className="flex items-start justify-between gap-3">
                                        <div className="min-w-0 flex-1 space-y-2">
                                            <Skeleton className="h-3 w-24" />
                                            <Skeleton className="h-7 w-16" />
                                        </div>
                                        <Skeleton className="size-10 shrink-0 rounded-lg" />
                                    </div>
                                    <Skeleton className="mt-4 h-3 w-32" />
                                </div>
                            ))}
                        </div>

                        <div className="grid gap-4 lg:grid-cols-2">
                            {Array.from({ length: 2 }).map((_, index) => (
                                <div
                                    key={index}
                                    className="rounded-xl border border-border/80 bg-card p-5 shadow-sm"
                                >
                                    <Skeleton className="h-5 w-40" />
                                    <Skeleton className="mt-6 h-64 w-full rounded-lg" />
                                </div>
                            ))}
                        </div>
                    </main>
                </div>
            </div>
        </div>
    );
};

export default DashboardLoading;
