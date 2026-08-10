import { getTechServices } from "@/app/(dashboardGroup)/_actions/technician";
// import { getAllCategories } from "@/app/(publicGroup)/_actions/allCategories";
import { ITechService } from "@/lib/type";
import { TechServicePostCard } from "./TechServiceCard";
import { getAllPublicCategories } from "@/app/(publicGroup)/_actions/getAllPublicCategories";
import Pagination from "@/app/(publicGroup)/_components/categories/Pagination";

export async function TechServiceList({
    searchParams
}: {
    searchParams?: Promise<{ [key: string]: string | string[] | undefined }>
}) {
    const query = await searchParams;
    const [result, categoriesResult] = await Promise.all([
        getTechServices({query}),
        getAllPublicCategories(),
    ]);

    const categories = categoriesResult?.data ?? [];

    const services: ITechService[] = Array.isArray(result?.data?.data)
        ? result.data.data
        : [];

    if (!result.success || services.length === 0) {
        return (
            <p className="py-12 text-center text-muted-foreground">
                You haven&apos;t created any services yet.
            </p>
        );
    }

    return (
        <div className="space-y-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch">
                {services.map((service: ITechService) => (
                    <TechServicePostCard
                        key={service.id}
                        service={service}
                        categories={categories}
                    />
                ))}
            </div>
            {result.data?.meta && (
                <Pagination
                    currentPage={result.data.meta.page}
                    totalPages={result.data.meta.totalPage}
                    totalItems={result.data.meta.total}
                    itemsPerPage={result.data.meta.limit}
                    itemLabel="services"
                />
            )}
        </div>
    );
}
