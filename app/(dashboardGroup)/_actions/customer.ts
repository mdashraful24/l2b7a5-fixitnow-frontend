"use server";

import { ICreateBookingPayload } from "@/lib/type";
import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";

export const getAvailableSlotsForTechnician = async (technicianId: string, date?: string) => {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get("accessToken")?.value;

    const params = new URLSearchParams();
    if (date) params.set("date", date);

    const res = await fetch(
        `${process.env.BACKEND_API_URL}/api/technicians/${technicianId}/availability?${params}`,
        {
            headers: {
                ...(accessToken && { cookie: `accessToken=${accessToken}` }),
            },
            cache: "no-store",
        }
    );

    return res.json();
};

export const getSlotDetails = async (slotId: string) => {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get("accessToken")?.value;

    const res = await fetch(
        `${process.env.BACKEND_API_URL}/api/availability-slots/${slotId}`,
        {
            headers: {
                ...(accessToken && { cookie: `accessToken=${accessToken}` }),
            },
            cache: "no-store",
        }
    );

    return res.json();
};

export const updateBooking = async (bookingId: string, prevState: ICreateBookingPayload | null, formData: FormData) => {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get("accessToken")?.value;

    if (!accessToken) {
        return {
            success: false,
            message: "Not authenticated",
        };
    }

    const payload: {
        scheduledAt: string;
        address: string;
        notes: string;
        availableSlotId?: string;
    } = {
        scheduledAt: formData.get("scheduledAt") as string,
        address: formData.get("address") as string,
        notes: formData.get("notes") as string || "",
    };

    // Include availableSlotId if it's being updated
    const slotId = formData.get("availableSlotId") as string;
    if (slotId) {
        payload.availableSlotId = slotId;
    }

    const res = await fetch(
        `${process.env.BACKEND_API_URL}/api/bookings/${bookingId}`,
        {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                cookie: `accessToken=${accessToken}`,
            },
            body: JSON.stringify(payload),
        }
    );

    const result = await res.json();

    if (result.success) {
        revalidateTag("bookings", {
            expire: 0
        });
        revalidateTag(`booking-${bookingId}`, {
            expire: 0
        });
    }

    return result;
};

