// app/admin/contacts/page.tsx
import { getContacts } from "@/app/(publicGroup)/_actions/contact";
import ContactList from "../_components/contacts/ContactList";
import Pagination from "@/app/(publicGroup)/_components/categories/Pagination";
import { Suspense } from "react";
import ContactSkeleton from "../_components/contacts/ContactSkeleton";
import { Button } from "@/components/ui/button";

export default async function AdminContactsPage({
    searchParams,
}: {
    searchParams: Promise<{ page?: string; search?: string }>;
}) {
    const query = await searchParams;
    const page = query.page ? parseInt(query.page) : 1;
    const searchTerm = query.search || "";

    const result = await getContacts({
        page,
        limit: 10,
        searchTerm: searchTerm || undefined,
        sortBy: "createdAt",
        sortOrder: "desc",
    });

    if (!result.success) {
        return (
            <div className="flex items-center justify-center min-h-100">
                <div className="text-center">
                    <h3 className="text-lg font-semibold">Failed to load contacts</h3>
                    <p className="text-sm text-foreground/80 mt-1">{result.message}</p>
                    {result.message?.includes("authenticated") && (
                        <Button
                            className="mt-4"
                            onClick={() => window.location.href = "/auth/login"}
                        >
                            Go to Login
                        </Button>
                    )}
                </div>
            </div>
        );
    }

    return (
        <div>
            <Suspense fallback={<ContactSkeleton />}>
                <ContactList
                    initialContacts={result.data}
                    initialMeta={{
                        page: result.meta.page,
                        limit: result.meta.limit,
                        total: result.meta.total,
                        totalPages: result.meta.totalPages || result.meta.totalPages || 1
                    }}
                    searchTerm={searchTerm}
                />
            </Suspense>
            {result.meta && (result.meta.totalPages || result.meta.totalPages) > 1 && (
                <Pagination
                    currentPage={result.meta.page}
                    totalPages={result.meta.totalPages || result.meta.totalPages || 1}
                    totalItems={result.meta.total}
                    itemsPerPage={result.meta.limit}
                    itemLabel="contacts"
                />
            )}
        </div>
    );
}
