import { Suspense } from "react";
import UserSkeleton from "../_components/users/UserSkeleton";
import { UserList } from "../_components/users/UserList";
import { UserSearchBar } from "../_components/users/UserSearchBar";
import { UserStatsCards } from "../_components/users/UserStatsCards";
import { getUserStats } from "@/app/(dashboardGroup)/_actions/admin";
import { UserFilters } from "../_components/users/UserFilters";

const AdminUsersPage = async ({
    searchParams
}: {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) => {
    const statsResult = await getUserStats();

    return (
        <div className="space-y-8">

            {/* Header */}
            <div className="rounded-xl border bg-card p-6 shadow-sm">
                <div className="space-y-2">
                    <h1 className="text-3xl font-bold tracking-tight">
                        User Management
                    </h1>
                    <p className="text-sm text-muted-foreground max-w-xl">
                        Manage customer accounts, technicians, and admin
                        users across your platform.
                    </p>
                </div>
            </div>

            {/* Statistics Cards */}
            {statsResult.success && statsResult.data ? (
                <UserStatsCards stats={statsResult.data} />
            ) : (
                <div className="rounded-xl border bg-card p-6 text-center text-muted-foreground">
                    Failed to load user statistics
                </div>
            )}

            {/* Filters */}
            <div className="flex flex-col-reverse gap-5 md:flex-row md:items-center md:justify-between rounded-xl border bg-card p-4 shadow-sm">
                <UserFilters />
                <UserSearchBar />
            </div>

            {/* Users List */}
            <div className="rounded-xl border bg-card p-6 shadow-sm">
                <div className="mb-6">
                    <h2 className="text-xl font-semibold">
                        All Users
                    </h2>
                    <p className="text-sm text-muted-foreground">
                        View and manage registered users.
                    </p>
                </div>

                <Suspense fallback={<UserSkeleton />}>
                    <UserList searchParams={searchParams} />
                </Suspense>
            </div>

        </div>
    );
};

export default AdminUsersPage;