import { Skeleton } from "@/components/ui/skeleton";

export default function TechnicianProfileSkeleton() {
    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 animate-pulse">
            {/* Left Column - Profile Info */}
            <div className="md:col-span-1 space-y-6">
                <div className="bg-white dark:bg-card rounded-xl shadow-sm border border-gray-200 dark:border-border p-6 text-center">
                    {/* Avatar */}
                    <div className="relative mx-auto h-24 w-24 rounded-full bg-gray-200 dark:bg-gray-700 mb-4">
                        <Skeleton className="h-full w-full rounded-full" />
                        <div className="absolute -right-4 top-0">
                            <Skeleton className="h-6 w-16 rounded-full" />
                        </div>
                    </div>

                    {/* Name */}
                    <Skeleton className="h-8 w-40 mx-auto mb-2" />

                    {/* Location */}
                    <div className="flex items-center justify-center gap-2 mt-2">
                        <Skeleton className="h-4 w-4 rounded-full" />
                        <Skeleton className="h-4 w-32" />
                    </div>

                    {/* Rating */}
                    <div className="flex items-center justify-center gap-2 mt-2">
                        <Skeleton className="h-5 w-5 rounded-full" />
                        <Skeleton className="h-6 w-8" />
                        <Skeleton className="h-4 w-20" />
                    </div>
                </div>

                {/* Contact Information */}
                <div className="bg-white dark:bg-card rounded-xl shadow-sm border border-gray-200 dark:border-border p-6">
                    <Skeleton className="h-6 w-40 mb-4" />
                    <div className="space-y-3">
                        <div className="flex items-center gap-3">
                            <Skeleton className="h-4 w-4 rounded-full" />
                            <Skeleton className="h-4 w-48" />
                        </div>
                        <div className="flex items-center gap-3">
                            <Skeleton className="h-4 w-4 rounded-full" />
                            <Skeleton className="h-4 w-32" />
                        </div>
                        <div className="flex items-center gap-3">
                            <Skeleton className="h-4 w-4 rounded-full" />
                            <Skeleton className="h-4 w-24" />
                        </div>
                    </div>
                </div>
            </div>

            {/* Right Column - Details */}
            <div className="md:col-span-2 space-y-6">
                {/* About */}
                <div className="bg-white dark:bg-card rounded-xl shadow-sm border border-gray-200 dark:border-border p-6">
                    <Skeleton className="h-7 w-28 mb-4" />
                    <div className="space-y-2">
                        <Skeleton className="h-4 w-full" />
                        <Skeleton className="h-4 w-full" />
                        <Skeleton className="h-4 w-3/4" />
                    </div>

                    <div className="mt-6 flex items-center gap-2">
                        <Skeleton className="h-5 w-5 rounded-full" />
                        <Skeleton className="h-4 w-24" />
                        <Skeleton className="h-4 w-32" />
                    </div>

                    <div className="mt-4">
                        <Skeleton className="h-4 w-16 mb-2" />
                        <div className="flex flex-wrap gap-2">
                            <Skeleton className="h-8 w-20 rounded-full" />
                            <Skeleton className="h-8 w-24 rounded-full" />
                            <Skeleton className="h-8 w-28 rounded-full" />
                            <Skeleton className="h-8 w-16 rounded-full" />
                        </div>
                    </div>
                </div>

                {/* Services */}
                <div className="bg-white dark:bg-card rounded-xl shadow-sm border border-gray-200 dark:border-border p-6">
                    <Skeleton className="h-7 w-40 mb-4" />
                    <div className="space-y-4">
                        {[1, 2, 3].map((index) => (
                            <div key={index} className="border border-gray-200 dark:border-border rounded-lg p-4 flex justify-between items-center">
                                <div className="flex-1">
                                    <Skeleton className="h-5 w-32 mb-2" />
                                    <Skeleton className="h-4 w-48" />
                                </div>
                                <div className="text-right">
                                    <Skeleton className="h-6 w-16 mb-1" />
                                    <Skeleton className="h-3 w-12 ml-auto" />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Availability */}
                {/* <div className="bg-white dark:bg-card rounded-xl shadow-sm border border-gray-200 dark:border-border p-6">
                    <div className="flex items-center gap-2 mb-4">
                        <Skeleton className="h-5 w-5 rounded-full" />
                        <Skeleton className="h-7 w-28" />
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                        {[1, 2, 3, 4, 5, 6].map((index) => (
                            <div key={index} className="bg-gray-50 dark:bg-muted/50 border border-gray-200 dark:border-border rounded-lg p-3 text-center">
                                <Skeleton className="h-5 w-16 mx-auto mb-1" />
                                <Skeleton className="h-4 w-20 mx-auto" />
                            </div>
                        ))}
                    </div>
                </div> */}
            </div>
        </div>
    );
}
