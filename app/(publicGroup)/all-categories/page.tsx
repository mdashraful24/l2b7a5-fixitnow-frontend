import CategoriesList from "@/app/(publicGroup)/_components/categories/CategoriesList";
import { getAllPublicCategories } from "../_actions/getAllPublicCategories";
import { Suspense } from "react";
import CategoriesSkeleton from "@/app/(dashboardGroup)/dashboard/admin/_components/categories/CategoriesSkeleton";
import CategorySearchBar from "../_components/categories/CategorySearchBar";

interface PageProps {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

const AllPublicCategoriesPage = async ({ searchParams }: PageProps) => {
    const resolvedSearchParams = await searchParams;
    const page = Number(resolvedSearchParams?.page) || 1;
    const searchTerm = typeof resolvedSearchParams?.searchTerm === 'string'
        ? resolvedSearchParams.searchTerm
        : '';

    const { data: categories, meta } = await getAllPublicCategories({
        page,
        limit: 9,
        searchTerm: searchTerm || undefined
    });

    return (
        <div className="container mx-auto space-y-6 px-4 pt-8">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-foreground">
                        Browse All Categories
                    </h1>
                    <p className="mt-1 text-foreground">
                        Explore all the categories and find the perfect service for your needs.
                    </p>
                </div>
                <div className="w-full sm:w-auto">
                    <CategorySearchBar />
                </div>
            </div>

            <Suspense fallback={<CategoriesSkeleton />}>
                <CategoriesList categories={categories} meta={meta} showAll={true} />
            </Suspense>
        </div>
    )
}

export default AllPublicCategoriesPage
