import { ICategory } from "@/lib/type";
import { getAdminCategories } from "@/app/(dashboardGroup)/_actions/admin";
import Pagination from "@/app/(publicGroup)/_components/categories/Pagination";
import { Table, TableBody, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { CategoriesTableRow } from "./CategoriesTableRow";

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
        <div className="space-y-8">
            <div className="rounded-md border border-border overflow-x-auto">
                <Table>
                    <TableHeader>
                        <TableRow className="hover:bg-transparent">
                            <TableHead className="w-12">#</TableHead>
                            <TableHead>Name</TableHead>
                            <TableHead>Description</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Created At</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {result.data.map((category: ICategory, index: number) => (
                            <CategoriesTableRow
                                key={category.id}
                                category={category}
                                index={index}
                            />
                        ))}
                    </TableBody>
                </Table>
            </div>
            {result.meta && (
                <Pagination
                    currentPage={result.meta.page}
                    totalPages={result.meta.totalPage}
                    totalItems={result.meta.total}
                    itemsPerPage={result.meta.limit}
                    itemLabel="categories"
                />
            )}
        </div>
    );
}




// import { ICategory } from "@/lib/type";
// import { CategoriesCard } from "./CategoriesCard";
// import { getAdminCategories } from "@/app/(dashboardGroup)/_actions/admin";
// import Pagination from "@/app/(publicGroup)/_components/categories/Pagination";

// export async function CategoriesList({
//     searchParams
// }: {
//     searchParams?: Promise<{ [key: string]: string | string[] | undefined }>
// }) {
//     const query = await searchParams;
//     const result = await getAdminCategories({ query });

//     if (!result.success || !result.data?.length) {
//         return (
//             <div className="py-12 text-center">
//                 <div className="flex flex-col items-center gap-3">
//                     <div className="rounded-full bg-muted/30 p-4">
//                         <svg className="h-8 w-8 text-muted-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
//                         </svg>
//                     </div>
//                     <p className="text-muted-foreground">No categories found.</p>
//                     <p className="text-sm text-muted-foreground">Create your first category to get started.</p>
//                 </div>
//             </div>
//         );
//     }

//     return (
//         <div className="space-y-8">
//             <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch">
//                 {result.data.map((category: ICategory) => (
//                     <CategoriesCard key={category.id} category={category} />
//                 ))}
//             </div>
//             {result.meta && (
//                 <Pagination
//                     currentPage={result.meta.page}
//                     totalPages={result.meta.totalPage}
//                     totalItems={result.meta.total}
//                     itemsPerPage={result.meta.limit}
//                     itemLabel="categories"
//                 />
//             )}
//         </div>
//     );
// }
