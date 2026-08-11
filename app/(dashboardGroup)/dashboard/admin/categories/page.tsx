import { Suspense } from "react";
import CategoriesSkeleton from "../_components/categories/CategoriesSkeleton";
import { CategoriesList } from "../_components/categories/CategoriesList";
import { CategoriesFormDialog } from "../_components/categories/CategoriesFormDialog";
import { CategoriesFilter } from "../_components/categories/CategoriesFilter";

const AdminCategoriesPage = async ({
    searchParams
}: {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) => {
    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <h1 className="text-2xl font-semibold tracking-tight text-foreground mb-1">
                        Categories Management
                    </h1>
                    <p className="text-foreground/80">
                        Create and manage service categories for your platform.
                    </p>
                </div>
                <CategoriesFormDialog mode="create" />
            </div>

            {/* Filters and Searching */}
            <div className="rounded-xl border border-border bg-card p-4 shadow-sm">
                <CategoriesFilter />
            </div>

            {/* Categories Grid */}
            <div className="rounded-xl border border-border bg-card p-6 shadow-sm">
                <Suspense fallback={<CategoriesSkeleton />}>
                    <CategoriesList searchParams={searchParams} />
                </Suspense>
            </div>
        </div>
    );
};

export default AdminCategoriesPage;
