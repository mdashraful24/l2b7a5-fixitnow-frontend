import { Skeleton } from "@/components/ui/skeleton";

export default function MyProfileSkeleton() {
    return (
        <div className="min-h-screen bg-linear-to-br from-background via-background to-secondary/5">
            {/* Hero Section */}
            <div className="mb-10">
                <div className="flex flex-col items-center gap-6 sm:flex-row sm:items-start">
                    {/* Avatar */}
                    <div className="relative shrink-0">
                        <Skeleton className="h-30 w-30 rounded-full border-4" />
                        <Skeleton className="absolute bottom-1 right-1 h-6 w-6 rounded-full" />
                    </div>

                    {/* User Info */}
                    <div className="flex-1 text-center sm:text-left min-w-0 space-y-3">
                        <Skeleton className="h-10 w-48 mx-auto sm:mx-0" />
                        <Skeleton className="h-5 w-64 mx-auto sm:mx-0" />
                        <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
                            <Skeleton className="h-8 w-24 rounded-full" />
                            <Skeleton className="h-8 w-20 rounded-full" />
                        </div>
                    </div>
                </div>
            </div>

            {/* Content */}
            <main className="">
                <div className="grid gap-6 lg:grid-cols-3">
                    {/* Left Column */}
                    <div className="space-y-6 lg:col-span-2">
                        {/* Contact Information - Common for all roles */}
                        <div className="rounded-xl border bg-card/50 p-6 shadow-sm backdrop-blur">
                            <Skeleton className="h-7 w-48 mb-4" />
                            <div className="grid gap-4 sm:gap-5 grid-cols-1 sm:grid-cols-2">
                                <div className="space-y-2">
                                    <div className="flex items-center gap-2">
                                        <Skeleton className="h-4 w-4 rounded-full" />
                                        <Skeleton className="h-4 w-12" />
                                    </div>
                                    <Skeleton className="h-5 w-48" />
                                </div>
                                <div className="space-y-2">
                                    <div className="flex items-center gap-2">
                                        <Skeleton className="h-4 w-4 rounded-full" />
                                        <Skeleton className="h-4 w-12" />
                                    </div>
                                    <Skeleton className="h-5 w-32" />
                                </div>
                                <div className="space-y-2">
                                    <div className="flex items-center gap-2">
                                        <Skeleton className="h-4 w-4 rounded-full" />
                                        <Skeleton className="h-4 w-12" />
                                    </div>
                                    <Skeleton className="h-5 w-40" />
                                </div>
                            </div>
                        </div>

                        {/* Technician Sections - These will only show for TECHNICIAN in the actual component */}
                        {/* About */}
                        <div className="rounded-xl border bg-card/50 p-6 shadow-sm backdrop-blur">
                            <Skeleton className="h-7 w-24 mb-4" />
                            <div className="space-y-2">
                                <Skeleton className="h-4 w-full" />
                                <Skeleton className="h-4 w-full" />
                                <Skeleton className="h-4 w-3/4" />
                            </div>
                        </div>

                        {/* Skills */}
                        <div className="rounded-xl border bg-card/50 p-6 shadow-sm backdrop-blur">
                            <div className="flex items-center gap-2 mb-4">
                                <Skeleton className="h-5 w-5 rounded-full" />
                                <Skeleton className="h-7 w-16" />
                            </div>
                            <div className="flex flex-wrap gap-1.5 sm:gap-2">
                                <Skeleton className="h-8 w-20 rounded-full" />
                                <Skeleton className="h-8 w-24 rounded-full" />
                                <Skeleton className="h-8 w-28 rounded-full" />
                                <Skeleton className="h-8 w-16 rounded-full" />
                            </div>
                        </div>

                        {/* Experience */}
                        <div className="rounded-xl border bg-card/50 p-6 shadow-sm backdrop-blur">
                            <div className="flex items-center gap-2 mb-4">
                                <Skeleton className="h-5 w-5 rounded-full" />
                                <Skeleton className="h-7 w-24" />
                            </div>
                            <Skeleton className="h-5 w-32 mb-2" />
                            <Skeleton className="h-4 w-48" />
                        </div>

                        {/* Service Location */}
                        <div className="rounded-xl border bg-card/50 p-6 shadow-sm backdrop-blur">
                            <div className="flex items-center gap-2 mb-4">
                                <Skeleton className="h-5 w-5 rounded-full" />
                                <Skeleton className="h-7 w-32" />
                            </div>
                            <Skeleton className="h-5 w-40" />
                        </div>

                        {/* Admin/Customer Specific Sections - These will only show for respective roles */}
                        {/* Admin Information */}
                        <div className="rounded-xl border bg-card/50 p-6 shadow-sm backdrop-blur">
                            <div className="flex items-center gap-2 mb-4">
                                <Skeleton className="h-5 w-5 rounded-full" />
                                <Skeleton className="h-7 w-48" />
                            </div>
                            <div className="space-y-2">
                                <div className="flex items-center gap-2">
                                    <Skeleton className="h-4 w-4 rounded-full" />
                                    <Skeleton className="h-4 w-16" />
                                    <Skeleton className="h-4 w-32" />
                                </div>
                                <div className="flex items-center gap-2">
                                    <Skeleton className="h-4 w-4 rounded-full" />
                                    <Skeleton className="h-4 w-16" />
                                    <Skeleton className="h-4 w-32" />
                                </div>
                            </div>
                        </div>

                        {/* Customer Information */}
                        <div className="rounded-xl border bg-card/50 p-6 shadow-sm backdrop-blur">
                            <div className="flex items-center gap-2 mb-4">
                                <Skeleton className="h-5 w-5 rounded-full" />
                                <Skeleton className="h-7 w-44" />
                            </div>
                            <div className="space-y-2">
                                <div className="flex items-center gap-2">
                                    <Skeleton className="h-4 w-4 rounded-full" />
                                    <Skeleton className="h-4 w-24" />
                                    <Skeleton className="h-4 w-32" />
                                </div>
                                <div className="flex items-center gap-2">
                                    <Skeleton className="h-4 w-4 rounded-full" />
                                    <Skeleton className="h-4 w-20" />
                                    <Skeleton className="h-4 w-40" />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Sidebar */}
                    <aside className="space-y-5">
                        {/* Rating - Only for TECHNICIAN */}
                        <div className="rounded-xl border bg-card/50 p-6 shadow-sm backdrop-blur">
                            <Skeleton className="h-7 w-20 mb-4" />
                            <div className="flex items-center gap-2">
                                <Skeleton className="h-6 w-6 rounded-full" />
                                <Skeleton className="h-9 w-12" />
                                <Skeleton className="h-4 w-20" />
                            </div>
                        </div>

                        {/* Account Status - Common for all roles */}
                        <div className="rounded-xl border bg-card/50 p-6 shadow-sm backdrop-blur">
                            <Skeleton className="h-7 w-32 mb-4" />
                            <Skeleton className="h-8 w-20 rounded-full" />
                        </div>

                        {/* Role - Common for all roles */}
                        <div className="rounded-xl border bg-card/50 p-6 shadow-sm backdrop-blur">
                            <Skeleton className="h-7 w-16 mb-4" />
                            <Skeleton className="h-5 w-24" />
                        </div>

                        {/* Member Since - Common for all roles */}
                        <div className="rounded-xl border bg-card/50 p-6 shadow-sm backdrop-blur">
                            <Skeleton className="h-7 w-28 mb-4" />
                            <Skeleton className="h-5 w-32" />
                        </div>

                        {/* Service Area - Only for TECHNICIAN */}
                        <div className="rounded-xl border bg-card/50 p-6 shadow-sm backdrop-blur">
                            <Skeleton className="h-7 w-28 mb-4" />
                            <Skeleton className="h-5 w-40" />
                        </div>

                        {/* Total Reviews - Only for TECHNICIAN */}
                        <div className="rounded-xl border bg-card/50 p-6 shadow-sm backdrop-blur">
                            <Skeleton className="h-7 w-28 mb-4" />
                            <Skeleton className="h-8 w-16" />
                        </div>
                    </aside>
                </div>
            </main>
        </div>
    );
}
