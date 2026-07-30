import { ICategory } from "@/lib/type";
import { CategoriesCard } from "./CategoriesCard";
import { getAdminCategories } from "@/app/(dashboardGroup)/_actions/admin";

export async function CategoriesList({
    searchParams
}: {
    searchParams?: Promise<{ [key: string]: string | string[] | undefined }>
}) {
    const query = await searchParams;
    const result = await getAdminCategories({ query });

    if (!result.success || !result.data?.length) {
        return (
            <div className="py-12 text-center">
                <div className="flex flex-col items-center gap-3">
                    <div className="rounded-full bg-muted/30 p-4">
                        <svg className="h-8 w-8 text-muted-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                        </svg>
                    </div>
                    <p className="text-muted-foreground">No categories found.</p>
                    <p className="text-sm text-muted-foreground">Create your first category to get started.</p>
                </div>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch">
            {result.data.map((category: ICategory) => (
                <CategoriesCard key={category.id} category={category} />
            ))}
        </div>
    );
}
