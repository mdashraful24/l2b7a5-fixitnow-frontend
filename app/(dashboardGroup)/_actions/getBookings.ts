"use server";

import { cookies } from "next/headers";

export const getAllBookings = async (status?: string) => {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get("accessToken")?.value;

    if (!accessToken) {
        return { success: false, message: "Not authenticated", data: [], meta: null };
    }

    const params = new URLSearchParams();
    if (status) params.set("status", status);

    const res = await fetch(
        `${process.env.BACKEND_API_URL}/api/bookings?${params}`,
        {
            headers: {
                cookie: `accessToken=${accessToken}`,
            },
            cache: "force-cache",
            next: {
                revalidate: 60 * 60 * 1,
                tags: ["bookings"],
            },
        }
    );

    const result = await res.json();

    const bookings = Array.isArray(result?.data?.data)
        ? result.data.data
        : Array.isArray(result?.data)
            ? result.data
            : [];

    return {
        ...result,
        data: bookings,
        meta: result?.data?.meta ?? result?.meta ?? null,
    };
};

export const getSingleBooking = async (id: string) => {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get("accessToken")?.value;

    if (!accessToken) {
        return { success: false, message: "Not authenticated", data: null };
    }

    const res = await fetch(
        `${process.env.BACKEND_API_URL}/api/bookings/${id}`,
        {
            headers: {
                cookie: `accessToken=${accessToken}`,
            },
            cache: "force-cache",
            next: {
                revalidate: 60 * 60 * 6,
                tags: ["bookings", `booking-${id}`],
            },
        }
    );

    return res.json();
};
