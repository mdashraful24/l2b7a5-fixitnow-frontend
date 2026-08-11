"use server";

import { IUpdateMe } from "@/lib/type";
import { cookies } from "next/headers";
import { revalidateTag } from "next/cache";

export const updateMe = async (payload: IUpdateMe) => {
    const cookieStore = await cookies();

    const accessToken = cookieStore.get("accessToken")?.value;

    if (!accessToken) {
        return {
            success: false,
            message: "User not logged in!",
        };
    }

    try {
        const res = await fetch(
            `${process.env.BACKEND_API_URL}/api/auth/update/me`,
            {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    cookie: `accessToken=${accessToken}`,
                },
                body: JSON.stringify(payload),
                cache: "no-store",
            }
        );

        const result = await res.json();

        if (result.success) {
            revalidateTag("my-profile", "max");
        }

        return result;
    } catch (error) {
        console.error("Update profile error:", error);

        return {
            success: false,
            message: "Something went wrong while updating profile.",
        };
    }
};
