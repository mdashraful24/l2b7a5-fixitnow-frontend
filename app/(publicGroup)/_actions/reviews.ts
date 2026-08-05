export const getReviews = async () => {
    const res = await fetch(`${process.env.BACKEND_API_URL}/api/reviews`, {
        next: {
            revalidate: 60 * 60 * 1, // cache for 1 hour
            tags: ["reviews"],
        },
    });

    return res.json();
};
