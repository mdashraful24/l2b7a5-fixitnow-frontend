import { Skeleton } from "@/components/ui/skeleton";

const UserDetailSkeleton = () => {
    return (
        <div className="container mx-auto py-8 space-y-6">
            <div className="flex items-center justify-between">
                <Skeleton className="h-10 w-48" />
                <Skeleton className="h-8 w-24" />
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 space-y-6">
                    <Skeleton className="h-75 w-full" />
                    <Skeleton className="h-50 w-full" />
                </div>
                <div>
                    <Skeleton className="h-62.5 w-full" />
                </div>
            </div>
        </div>
    );
}

export default UserDetailSkeleton;
