"use server";

import { cookies } from "next/headers";
import { revalidateTag } from "next/cache";

export const getAllUsers = async ({
    query
}: {
    query?: { [key: string]: string | string[] | undefined }
}) => {
    const params = new URLSearchParams();

    // Add all query parameters
    if (query) {
        Object.entries(query).forEach(([key, value]) => {
            if (value && typeof value === 'string') {
                params.set(key, value);
            } else if (Array.isArray(value)) {
                params.set(key, value.join(','));
            }
        });
    }

    const cookieStore = await cookies();
    const accessToken = cookieStore.get("accessToken")?.value;

    if (!accessToken) {
        return { success: false, message: "Not authenticated", data: [], meta: null };
    }

    const url = `${process.env.BACKEND_API_URL}/api/admin/users${params.toString() ? `?${params.toString()}` : ''}`;

    const res = await fetch(url, {
        headers: {
            cookie: `accessToken=${accessToken}`,
        },
        cache: "force-cache",
        next: {
            revalidate: 60 * 60 * 24,
            tags: ["users"],
        },
    });

    return res.json();
};

export const getUserStats = async () => {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get("accessToken")?.value;

    if (!accessToken) {
        return { success: false, message: "Not authenticated", data: null };
    }

    const res = await fetch(`${process.env.BACKEND_API_URL}/api/admin/users/stats`, {
        headers: {
            cookie: `accessToken=${accessToken}`,
        },
        cache: "force-cache",
        next: {
            revalidate: 60 * 60 * 24,
            tags: ["users"],
        },
    });

    return res.json();
};

export const getUserById = async (userId: string) => {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get("accessToken")?.value;

    if (!accessToken) {
        return {
            success: false,
            message: "Not authenticated",
            data: null,
        };
    }

    const res = await fetch(
        `${process.env.BACKEND_API_URL}/api/admin/users/${userId}`,
        {
            headers: {
                "Content-Type": "application/json",
                cookie: `accessToken=${accessToken}`,
            },
            cache: "no-store",
        }
    );

    if (!res.ok) {
        throw new Error(`Failed to fetch user: ${res.status}`);
    }

    const data = await res.json();

    return {
        success: data.success ?? false,
        message: data.message ?? "",
        data: data.data ?? null,
    };
};

export const updateUserStatus = async ({
    userId,
    status
}: {
    userId: string;
    status: string;
}) => {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get("accessToken")?.value;

    if (!accessToken) {
        return { success: false, message: "Not authenticated" };
    }

    const res = await fetch(`${process.env.BACKEND_API_URL}/api/admin/users/${userId}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
            cookie: `accessToken=${accessToken}`,
        },
        body: JSON.stringify({ status }),
    });

    const data = await res.json();

    if (data.success) {
        revalidateTag("users", {
            expire: 0
        });
    }

    return data;
};