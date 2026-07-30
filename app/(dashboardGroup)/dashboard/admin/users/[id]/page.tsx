import { Suspense } from "react";
import { getUserById } from "@/app/(dashboardGroup)/_actions/admin";
import { notFound } from "next/navigation";
import UserProfileCard from "../../_components/users/UserProfileCard";
import UserActivityLog from "../../_components/users/UserActivityLog";
import UserStatusManager from "../../_components/users/UserStatusManager";
import UserDetailSkeleton from "../../_components/users/UserDetailSkeleton";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

interface UserDetailPageProps {
    params: Promise<{
        id: string;
    }>;
}

const UserDetailPage = async ({ params }: UserDetailPageProps) => {
    const { id } = await params;

    // Fetch user data
    const result = await getUserById(id);

    // Handle not found
    if (!result.success || !result.data) {
        notFound();
    }

    const user = result.data;

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="mx-auto">
                <Link
                    href="/dashboard/admin/users"
                    className="mb-4 inline-flex items-center gap-2 text-sm text-gray-500 hover:text-primary transition-colors"
                >
                    <ArrowLeft className="h-4 w-4" />
                    Back to Users
                </Link>

                <div className="mb-8">
                    <h1 className="text-3xl font-bold">User Details</h1>
                    <p className="mt-1 text-gray-700">View and manage user details and activity.</p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <Suspense fallback={<UserDetailSkeleton />}>
                        <div className="lg:col-span-2 space-y-6">
                            <UserProfileCard user={user} />
                            <UserActivityLog user={user} />
                        </div>
                        <div className="space-y-6">
                            <UserStatusManager user={user} />
                        </div>
                    </Suspense>
                </div>
            </div>
        </div>
    );
};

export default UserDetailPage;
