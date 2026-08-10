import { getAllServices } from "../../_actions/allServices";
import { IService, PaginationMeta } from "@/lib/type";
import { ServiceCard } from "./ServiceCard";
import Pagination from "../categories/Pagination";

export async function ServiceList({
    searchParams,
    services: propServices,
    meta: propMeta,
    showPagination = true,
}: {
    searchParams?: Promise<{ [key: string]: string | string[] | undefined }>
    services?: IService[];
    meta?: PaginationMeta;
    showPagination?: boolean;
}) {
    let services: IService[] = [];
    let meta: PaginationMeta = { total: 0, page: 1, limit: 9, totalPages: 0 };

    if (propServices && propMeta) {
        // Use provided data
        services = propServices;
        meta = propMeta;
    } else if (searchParams) {
        // Fetch data with searchParams
        const query = await searchParams;
        const queryWithDefaults = {
            ...query,
            page: query?.page ?? '1',
            limit: query?.limit ?? '9',
        };
        const result = await getAllServices({ query: queryWithDefaults });
        services = result?.data || [];
        meta = result?.meta || { total: 0, page: 1, limit: 9, totalPage: 0 };
    }

    if (!services?.length) {
        return (
            <div className="text-center py-20">
                <div className="text-6xl mb-4">🔍</div>
                <p className="text-xl">No services found</p>
                <p className="mt-2">Please, try another time</p>
            </div>
        );
    }

    const currentPage = meta?.page || 1;
    const limit = meta?.limit || 9;
    const total = meta?.total || services.length;
    const totalPages = meta?.totalPages ?? Math.ceil(total / limit);

    return (
        <div className='space-y-8'>
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                {services.map((service: IService) => (
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
