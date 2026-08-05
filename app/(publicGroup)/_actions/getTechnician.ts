"use server";

export const getTechnicianById = async (id: string) => {
    const res = await fetch(
        `${process.env.BACKEND_API_URL}/api/technicians/${id}`,
        {
            next: {
                revalidate: 60 * 60 * 24,
                tags: [
                    "technicians",
                    `technician-${id}`,
                ],
            },
        }
    );

    return res.json();
};
