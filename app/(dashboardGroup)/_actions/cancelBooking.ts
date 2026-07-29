"use server";

import { cookies } from "next/headers";
import { revalidateTag } from "next/cache";

export const cancelBooking = async (bookingId: string) => {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get("accessToken")?.value;

    if (!accessToken) {
        return { success: false, message: "Not authenticated" };
    }

    const res = await fetch(
        `${process.env.BACKEND_API_URL}/api/bookings/status/${bookingId}`,
        {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                cookie: `accessToken=${accessToken}`,
            },
            body: JSON.stringify({ status: "CANCELLED" }),
        }
    );

    const result = await res.json();

    if (result.success) {
        revalidateTag("bookings", "max");
        revalidateTag(`booking-${bookingId}`, "max");
    }

    return result;
};
