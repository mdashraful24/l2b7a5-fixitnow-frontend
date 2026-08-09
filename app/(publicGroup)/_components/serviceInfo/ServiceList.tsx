import { getAllServices } from "../../_actions/allServices";
import { IService } from "@/lib/type";
import { ServiceCard } from "./ServiceCard";
import Pagination from "../categories/Pagination";

export async function ServiceList({
    searchParams
}: {
    searchParams?: Promise<{ [key: string]: string | string[] | undefined }>
}) {
    const query = await searchParams;

    // Set default page and limit if not provided
    const queryWithDefaults = {
        ...query,
        page: query?.page ?? '1',
        limit: query?.limit ?? '9',
    };

    const result = await getAllServices({ query: queryWithDefaults });

    if (!result.success || !result.data?.length) {
        return (
            <div className="text-center py-20">
                <div className="text-6xl mb-4">🔍</div>
                <p className="text-xl">No services found</p>
                <p className="mt-2">Please, try another time</p>
            </div>
        )
    }

    const meta = result.meta;
    const currentPage = meta?.page || Number(queryWithDefaults.page);
    const limit = meta?.limit || Number(queryWithDefaults.limit);
    const total = meta?.total || result.data.length;
    const totalPages = meta?.totalPage ?? Math.ceil(total / limit);

    return (
        <div className='space-y-8'>
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                {result.data.map((service: IService) => (
                    <ServiceCard key={service.id} service={service} />
                ))}
            </div>

            {totalPages > 1 && (
                <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    totalItems={total}
                    itemsPerPage={limit}
                    itemLabel="services"
                />
            )}
        </div>
    )
}

