"use server";

import { cookies } from "next/headers";
import { ICreateBookingPayload } from "@/lib/type";
import { revalidateTag } from "next/cache";

export const createBooking = async (payload: ICreateBookingPayload) => {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get("accessToken")?.value;

    if (!accessToken) {
        return { success: false, message: "You must be logged in to book a service." };
    }

    const res = await fetch(`${process.env.BACKEND_API_URL}/api/bookings`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            cookie: `accessToken=${accessToken}`,
        },
        body: JSON.stringify(payload),
    });

    const result = await res.json();

    if (result.success) {
        revalidateTag("bookings", {
            expire: 0
        });
    }

    return result;
};
