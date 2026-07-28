export const getAllServices = async ({
    query
}: {
    query?: { [key: string]: string | string[] | undefined }
}) => {
    const params = new URLSearchParams();

    if (query && query.searchTerm) {
        params.set("searchTerm", query.searchTerm as string);
    }

    const res = await fetch(`${process.env.BACKEND_API_URL}/api/services?${params}`, {
        next: {
            revalidate: 60 * 60 * 6,
            tags: ["services"],
        },
    });

    return res.json();
};
