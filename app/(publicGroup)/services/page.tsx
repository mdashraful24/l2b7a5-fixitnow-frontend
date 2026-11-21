import { Suspense } from "react";
import { Clock3, ShieldCheck, SlidersHorizontal, Sparkles } from "lucide-react";
import { ServiceList } from "../_components/serviceInfo/ServiceList";
import ServiceSkeleton from "../_components/serviceInfo/ServiceSkeleton";
import { ServiceSearchBar } from "../_components/serviceInfo/ServiceSearchBar";
import { ServiceFilters } from "../_components/serviceInfo/ServiceFilters";
import { ServiceFilterSheet } from "../_components/serviceInfo/ServiceFilterSheet";
import { ServiceSort } from "../_components/serviceInfo/ServiceSort";
import { getAllCategories } from "../_actions/allCategories";

export default async function ServicesPage({
    searchParams
}: {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
    const query = await searchParams;
    const categoriesResult = await getAllCategories();
    const categories = categoriesResult?.success ? categoriesResult.data : [];

    return (
        <div className="container mx-auto px-4 py-8 md:py-12">
            <section className="relative overflow-hidden rounded-3xl border border-border/70 bg-card/60 p-6 shadow-sm md:p-10">
                <div className="pointer-events-none absolute -top-24 -right-20 size-72 rounded-full bg-primary/10 blur-3xl" />
                <div className="pointer-events-none absolute -bottom-28 -left-16 size-72 rounded-full bg-sky-400/10 blur-3xl" />

                <div className="relative mx-auto max-w-3xl text-center">
                    <span className="inline-flex items-center gap-1.5 rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
                        <Sparkles className="size-3.5" />
                        Trusted local professionals
                    </span>
                    <h1 className="mt-5 text-3xl font-bold tracking-tight text-foreground md:text-5xl">
                        Find the right service, faster
                    </h1>
                    <p className="mx-auto mt-3 max-w-2xl text-sm text-muted-foreground md:text-base">
                        Compare skilled technicians, check ratings and pricing, and book the service that fits your needs.
                    </p>

                    <div className="mt-7">
                        <ServiceSearchBar
                            initialValue={typeof query.searchTerm === "string" ? query.searchTerm : ""}
                        />
                    </div>

                    <div className="mt-5 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-xs font-medium text-muted-foreground md:text-sm">
                        <span className="inline-flex items-center gap-1.5">
                            <ShieldCheck className="size-4 text-emerald-500" />
                            Verified technicians
                        </span>
                        <span className="inline-flex items-center gap-1.5">
                            <Clock3 className="size-4 text-sky-500" />
                            Flexible scheduling
                        </span>
                    </div>
                </div>
            </section>

            <div className="mt-8 grid gap-6 lg:grid-cols-[17rem_minmax(0,1fr)] lg:gap-8">
                <aside className="hidden lg:block">
                    <div className="no-scrollbar sticky top-24 max-h-[calc(100vh-8rem)] overflow-y-auto rounded-2xl border border-border/70 bg-card/70 p-5 shadow-sm backdrop-blur-sm">
                        <div className="mb-5 flex items-center gap-2 border-b border-border/70 pb-4">
                            <span className="flex size-8 items-center justify-center rounded-xl bg-primary/10 text-primary">
                                <SlidersHorizontal className="size-4" />
                            </span>
                            <div>
                                <h2 className="text-sm font-semibold text-foreground">Filters</h2>
                                <p className="text-xs text-muted-foreground">Refine your results</p>
                            </div>
                        </div>
                        <ServiceFilters categories={categories} />
                    </div>
                </aside>

                <main className="min-w-0">
                    <div className="lg:hidden mb-5 flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-border/70 bg-card/60 px-4 py-3 shadow-sm">
                        <div>
                            <p className="text-sm font-semibold text-foreground">Browse services</p>
                            <p className="text-xs text-muted-foreground">Sort and refine your search</p>
                        </div>
                        <div className="flex w-full flex-col gap-2 sm:w-auto sm:flex-row">
                            <ServiceFilterSheet categories={categories} />
                            <ServiceSort />
                        </div>
                    </div>

                    <Suspense fallback={<ServiceSkeleton />}>
                        <ServiceList searchParams={Promise.resolve(query)} />
                    </Suspense>
                </main>
            </div>
        </div>
    );
}
