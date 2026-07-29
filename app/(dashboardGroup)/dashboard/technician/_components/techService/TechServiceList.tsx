import { getTechServices } from "@/app/(dashboardGroup)/_actions/technician";
import { getAllCategories } from "@/app/(publicGroup)/_actions/allCategories";
import { ITechService } from "@/lib/type";
import { TechServicePostCard } from "./TechServiceCard";

export async function TechServiceList() {
    const [result, categoriesResult] = await Promise.all([
        getTechServices(),
        getAllCategories(),
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
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6 items-stretch">
            {services.map((service: ITechService) => (
                <TechServicePostCard
                    key={service.id}
                    service={service}
                    categories={categories}
                />
            ))}
        </div>
    );
}
