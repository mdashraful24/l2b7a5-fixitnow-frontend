export const getAllCategories = async () => {
    const res = await fetch(`${process.env.BACKEND_API_URL}/api/categories`, {
        next: {
            revalidate: 60 * 60 * 24, // cache for 24 hours
            tags: ["categories"],
        },
    });

    return res.json();
};
