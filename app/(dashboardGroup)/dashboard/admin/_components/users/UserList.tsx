import { getAllUsers } from "@/app/(dashboardGroup)/_actions/admin";
import { IAdminUsers } from "@/lib/type";
import { UsersCard } from "./UserCard";
import Pagination from "@/app/(publicGroup)/_components/categories/Pagination";

export async function UserList({
    searchParams
}: {
    searchParams?: Promise<{ [key: string]: string | string[] | undefined }>
}) {
    const query = await searchParams;
    const result = await getAllUsers({ query });

    if (!result.success || !result.data?.length) {
        return (
            <div className="py-12 text-center">
                <p className="text-muted-foreground">No users found.</p>
                {result.message && (
                    <p className="text-sm text-muted-foreground mt-2">{result.message}</p>
                )}
            </div>
        )
    }

    return (
        <div className='space-y-8'>
            <div className="grid gap-6 grid-cols-1 lg:grid-cols-2">
                {result.data.map((user: IAdminUsers) => (
                    <UsersCard key={user.id} user={user} />
                ))}
            </div>
            {result.meta && (
                <Pagination
                    currentPage={result.meta.page}
                    totalPages={result.meta.totalPage}
                    totalItems={result.meta.total}
                    itemsPerPage={result.meta.limit}
                    itemLabel="users"
                />
            )}
        </div>
    )
}
