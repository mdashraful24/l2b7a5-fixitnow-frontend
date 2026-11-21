"use server";

const SORT_MAPPINGS: Record<string, { sortBy: string; sortOrder: string }> = {
    newest: { sortBy: "createdAt", sortOrder: "desc" },
    "price-low": { sortBy: "price", sortOrder: "asc" },
    "price-high": { sortBy: "price", sortOrder: "desc" },
    duration: { sortBy: "duration", sortOrder: "asc" },
    title: { sortBy: "title", sortOrder: "asc" }
};

export const getAllServices = async ({
    query
}: {
    query?: { [key: string]: string | string[] | undefined }
}) => {
    const params = new URLSearchParams();

    if (query && query.searchTerm) {
        params.set("searchTerm", query.searchTerm as string);
    }

    // Add additional filters
    if (query?.category) params.set("category", query.category as string);
    if (query?.location) params.set("location", query.location as string);
    if (query?.minPrice) params.set("minPrice", query.minPrice as string);
    if (query?.maxPrice) params.set("maxPrice", query.maxPrice as string);
    if (query?.rating) params.set("rating", query.rating as string);
    if (query?.page) params.set("page", query.page as string);
    if (query?.limit) params.set("limit", query.limit as string);

    const sort = typeof query?.sort === "string" ? query.sort : "";
    const sortMapping = SORT_MAPPINGS[sort];

    if (sortMapping) {
        params.set("sortBy", sortMapping.sortBy);
        params.set("sortOrder", sortMapping.sortOrder);
    }

    const res = await fetch(`${process.env.BACKEND_API_URL}/api/services?${params}`, {
        next: {
            revalidate: 60 * 60,
            tags: [
                "services",
                `services-${params.toString()}`
            ],
        },
    });

    return res.json();
};

export const getServiceById = async (id: string) => {
    const res = await fetch(
        `${process.env.BACKEND_API_URL}/api/services/${id}`,
        {
            cache: "no-store",
        }
    );

    return res.json();
};
