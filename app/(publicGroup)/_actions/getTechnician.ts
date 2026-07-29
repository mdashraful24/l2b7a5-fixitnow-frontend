export const getTechnicianById = async (id: string) => {
    const res = await fetch(`${process.env.BACKEND_API_URL}/api/technicians/${id}`, {
        next: {
            revalidate: 60 * 5, // Revalidate every 5 minutes
            tags: ["technicians", id],
        },
    });

    return res.json();
};
