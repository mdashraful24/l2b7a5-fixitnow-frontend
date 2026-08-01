import { Suspense } from "react";
import { ServiceList } from "../_components/serviceInfo/ServiceList";
import ServiceSkeleton from "../_components/serviceInfo/ServiceSkeleton";
import { ServiceSearchBar } from "../_components/serviceInfo/ServiceSearchBar";
import { ServiceFilters } from "../_components/serviceInfo/ServiceFilters";
import { getAllCategories } from "../_actions/allCategories";

export default async function ServicesPage({
    searchParams
}: {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
    // Fetch categories for the filter sidebar
    const categoriesResult = await getAllCategories();
    const categories = categoriesResult?.success ? categoriesResult.data : [];

    return (
        <div className="container mx-auto space-y-6 px-4 py-8">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-foreground">
                        Find the Right Service
                    </h1>
                    <p className="mt-1 text-sm text-muted-foreground">
                        Browse our extensive list of professional home services.
                    </p>
                </div>

                <div className="w-full sm:w-auto">
                    <ServiceSearchBar />
                </div>
            </div>

            <div className="flex flex-col lg:flex-row lg:gap-8">
                {/* Sidebar Filters */}
                <aside className="w-full shrink-0 lg:w-64">
                    <div className="rounded-xl border border-border bg-card/50 p-6 shadow-sm backdrop-blur-sm transition-colors">
                        <ServiceFilters categories={categories} />
                    </div>
                </aside>

                {/* Main Content Area */}
                <main className="mt-6 flex-1 lg:mt-0">
                    <Suspense fallback={<ServiceSkeleton />}>
                        <ServiceList searchParams={searchParams} />
                    </Suspense>
                </main>
            </div>
        </div>
    );
}
