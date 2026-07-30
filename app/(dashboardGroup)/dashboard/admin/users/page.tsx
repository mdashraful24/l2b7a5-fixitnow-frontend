import { Suspense } from "react";
import UserSkeleton from "../_components/users/UserSkeleton";
import { UserList } from "../_components/users/UserList";
import { UserSearchBar } from "../_components/users/UserSearchBar";
import { Users, ShieldCheck, UserCog } from "lucide-react";

const AdminUsersPage = async ({
    searchParams
}: {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) => {
    return (
        <div className="space-y-8">

            {/* Header */}
            <div className="rounded-xl border bg-card p-6 shadow-sm">
                <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">

                    <div className="space-y-2">
                        <h1 className="text-3xl font-bold tracking-tight">
                            User Management
                        </h1>

                        <p className="text-sm text-muted-foreground max-w-xl">
                            Manage customer accounts, technicians, and admin
                            users across your platform.
                        </p>
                    </div>

                    <UserSearchBar />

                </div>
            </div>


            {/* Stats */}
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">

                <div className="rounded-xl border bg-card p-5 shadow-sm">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-muted-foreground">
                                Total Users
                            </p>
                            <h2 className="mt-2 text-3xl font-bold">
                                --
                            </h2>
                        </div>

                        <div className="rounded-full bg-primary/10 p-3">
                            <Users className="h-6 w-6 text-primary" />
                        </div>
                    </div>
                </div>


                <div className="rounded-xl border bg-card p-5 shadow-sm">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-muted-foreground">
                                Technicians
                            </p>
                            <h2 className="mt-2 text-3xl font-bold">
                                --
                            </h2>
                        </div>

                        <div className="rounded-full bg-green-500/10 p-3">
                            <UserCog className="h-6 w-6 text-green-600" />
                        </div>
                    </div>
                </div>


                <div className="rounded-xl border bg-card p-5 shadow-sm">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-muted-foreground">
                                Admin Accounts
                            </p>
                            <h2 className="mt-2 text-3xl font-bold">
                                --
                            </h2>
                        </div>

                        <div className="rounded-full bg-blue-500/10 p-3">
                            <ShieldCheck className="h-6 w-6 text-blue-600" />
                        </div>
                    </div>
                </div>

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