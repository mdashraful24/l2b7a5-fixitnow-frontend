import { getAllServices } from "../../_actions/allServices";
import { IService, PaginationMeta } from "@/lib/type";
import { SearchX } from "lucide-react";
import Link from "next/link";
import { ServiceCard } from "./ServiceCard";
import Pagination from "../categories/Pagination";

type ServiceMeta = PaginationMeta & { totalPage?: number };

export async function ServiceList({
    searchParams,
    services: propServices,
    meta: propMeta,
    showPagination = true,
    showHeading = true
}: {
    searchParams?: Promise<{ [key: string]: string | string[] | undefined }>
    services?: IService[];
    meta?: PaginationMeta;
    showPagination?: boolean;
    showHeading?: boolean;
}) {
    let services: IService[] = [];
    let meta: PaginationMeta = { total: 0, page: 1, limit: 9, totalPages: 0 };

    if (propServices && propMeta) {
        services = propServices;
        meta = propMeta;
    } else if (searchParams) {
        const query = await searchParams;
        const queryWithDefaults = {
            ...query,
            page: query?.page ?? "1",
            limit: query?.limit ?? "9"
        };
        const result = await getAllServices({ query: queryWithDefaults });
        const responseMeta = result?.meta as ServiceMeta | undefined;

        services = result?.data || [];
        meta = responseMeta
            ? {
                page: responseMeta.page || 1,
                limit: responseMeta.limit || 9,
                total: responseMeta.total || 0,
                totalPages: responseMeta.totalPages ?? responseMeta.totalPage ?? Math.ceil((responseMeta.total || 0) / (responseMeta.limit || 9))
            }
            : { total: 0, page: 1, limit: 9, totalPages: 0 };
    }

    const currentPage = meta?.page || 1;
    const limit = meta?.limit || 9;
    const total = meta?.total || services.length;
    const totalPages = meta?.totalPages ?? Math.ceil(total / limit);

    if (!services.length) {
        return (
            <section className="rounded-2xl border border-dashed border-border/80 bg-card/50 px-6 py-16 text-center">
                <div className="mx-auto flex size-14 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                    <SearchX className="size-7" />
                </div>
                <h2 className="mt-4 text-lg font-semibold text-foreground">No services found</h2>
                <p className="mx-auto mt-1 max-w-sm text-sm text-muted-foreground">
                    Try a different search term or adjust your filters to see more results.
                </p>
                <Link
                    href="/services"
                    className="mt-5 inline-flex h-10 items-center justify-center rounded-xl bg-primary px-4 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/85"
                >
                    Reset search
                </Link>
            </section>
        );
    }

    return (
        <div className="space-y-6">
            {showHeading && (
                <div className="lg:hidden flex flex-wrap items-center justify-between gap-3">
                    <p className="text-sm text-muted-foreground">
                        Showing <span className="font-semibold text-foreground">{services.length}</span> of{" "}
                        <span className="font-semibold text-foreground">{total}</span> services
                    </p>
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-semibold text-emerald-600 dark:text-emerald-400">
                        <span className="size-1.5 rounded-full bg-emerald-500" />
                        Available now
                    </span>
                </div>
            )}

            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
                {services.map((service) => (
                    <ServiceCard key={service.id} service={service} />
                ))}
            </div>

            {showPagination && totalPages > 1 && (
                <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    totalItems={total}
                    itemsPerPage={limit}
                    itemLabel="services"
                />
            )}
        </div>
    );
}
