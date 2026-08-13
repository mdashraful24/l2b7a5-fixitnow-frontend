/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { IContactResponse, IContactSingleResponse, ICreateContact, IReplyContact } from "@/lib/type";
import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";

export interface ContactResponse {
    success: boolean;
    message: string;
    data?: any;
    error?: string;
}

// Get all contacts with pagination and search
export const getContacts = async (params?: {
    page?: number;
    limit?: number;
    searchTerm?: string;
    sortBy?: string;
    sortOrder?: 'asc' | 'desc';
}): Promise<IContactResponse> => {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get("accessToken")?.value;

    if (!accessToken) {
        return {
            success: false,
            message: "Not authenticated",
            data: [],
            meta: {
                page: 1,
                limit: 10,
                total: 0,
                totalPages: 0
            }
        };
    }

    const queryParams = new URLSearchParams();

    if (params?.page) queryParams.append('page', String(params.page));
    if (params?.limit) queryParams.append('limit', String(params.limit));
    if (params?.searchTerm) queryParams.append('searchTerm', params.searchTerm);
    if (params?.sortBy) queryParams.append('sortBy', params.sortBy);
    if (params?.sortOrder) queryParams.append('sortOrder', params.sortOrder);

    const url = `${process.env.BACKEND_API_URL}/api/contacts?${queryParams.toString()}`;

    const res = await fetch(url, {
        headers: {
            "Content-Type": "application/json",
            cookie: `accessToken = ${accessToken}`,
        },
        next: {
            tags: ['contacts']
        }
    });

    const result = await res.json();

    if (result.success && result.meta) {
        if (result.meta.totalPage !== undefined && result.meta.totalPages === undefined) {
            result.meta.totalPages = result.meta.totalPage;
        }
    }

    return result;
};

// Get single contact by ID
export const getSingleContact = async (id: string): Promise<IContactSingleResponse> => {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get("accessToken")?.value;

    if (!accessToken) {
        return {
            success: false,
            message: "Not authenticated",
            data: null,
        };
    }

    const res = await fetch(`${process.env.BACKEND_API_URL}/api/contacts/${id}`, {
        headers: {
            "Content-Type": "application/json",
            cookie: `accessToken = ${accessToken}`,
        },
        next: {
            tags: [`contact-${id}`]
        }
    });

    const result = await res.json();
    return result;
};

// Create contact
export const createContact = async (
    prevState: ContactResponse | null,
    formData: FormData
): Promise<ContactResponse> => {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get("accessToken")?.value;

    if (!accessToken) {
        return { success: false, message: "Not authenticated" };
    }

    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const subject = formData.get("subject") as string;
    const message = formData.get("message") as string;

    // Validate required fields
    if (!name?.trim()) {
        return {
            success: false,
            message: "Please enter your name.",
            error: "Validation error"
        };
    }

    if (!email?.trim()) {
        return {
            success: false,
            message: "Please enter your email address.",
            error: "Validation error"
        };
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
        return {
            success: false,
            message: "Please enter a valid email address.",
            error: "Validation error"
        };
    }

    if (!message?.trim()) {
        return {
            success: false,
            message: "Please enter your message.",
            error: "Validation error"
        };
    }

    const payload: ICreateContact = {
        name: name.trim(),
        email: email.trim(),
        subject: subject?.trim() || "",
        message: message.trim()
    };

    try {
        const res = await fetch(`${process.env.BACKEND_API_URL}/api/contacts`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                cookie: `accessToken = ${accessToken}`,
            },
            body: JSON.stringify(payload),
        });

        const result = await res.json();

        if (result.success) {
            revalidateTag("contacts", {
                expire: 0
            });
            revalidateTag("my-contacts", {
                expire: 0
            })
            return {
                success: true,
                message: "Thank you! We'll get back to you within 24 hours.",
                data: result.data
            };
        }

        return {
            success: false,
            message: result.message || "Failed to send message. Please try again.",
            error: result.error
        };
    } catch (error) {
        console.error("Contact submission error:", error);
        return {
            success: false,
            message: "Something went wrong. Please try again later.",
            error: String(error)
        };
    }
};

// Reply to contact (admin only)
export const replyContact = async (
    contactId: string,
    replyData: IReplyContact
): Promise<ContactResponse> => {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get("accessToken")?.value;

    if (!accessToken) {
        return {
            success: false,
            message: "Not authenticated",
            error: "Authentication required"
        };
    }

    if (!replyData.reply?.trim()) {
        return {
            success: false,
            message: "Reply cannot be empty",
            error: "Validation error"
        };
    }

    try {
        const res = await fetch(`${process.env.BACKEND_API_URL}/api/contacts/${contactId}/reply`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                cookie: `accessToken = ${accessToken}`,
            },
            body: JSON.stringify(replyData)
        });

        const result = await res.json();

        if (result.success) {
            revalidateTag("contacts", {
                expire: 0
            });
            revalidateTag(`contact-${contactId}`, {
                expire: 0
            });
            return {
                success: true,
                message: "Reply sent successfully",
                data: result.data
            };
        }

        return {
            success: false,
            message: result.message || "Failed to send reply",
            error: result.error
        };
    } catch (error) {
        return {
            success: false,
            message: "Something went wrong. Please try again later.",
            error: String(error)
        };
    }
};

// Get user's own contacts (authenticated users only)
export const getMyContacts = async (params?: {
    page?: number;
    limit?: number;
    searchTerm?: string;
    sortBy?: string;
    sortOrder?: 'asc' | 'desc';
}): Promise<IContactResponse> => {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get("accessToken")?.value;

    if (!accessToken) {
        return {
            success: false,
            message: "Not authenticated",
            data: [],
            meta: {
                page: 1,
                limit: 10,
                total: 0,
                totalPages: 0
            }
        };
    }

    const queryParams = new URLSearchParams();

    if (params?.page) queryParams.append('page', String(params.page));
    if (params?.limit) queryParams.append('limit', String(params.limit));
    if (params?.searchTerm) queryParams.append('searchTerm', params.searchTerm);
    if (params?.sortBy) queryParams.append('sortBy', params.sortBy);
    if (params?.sortOrder) queryParams.append('sortOrder', params.sortOrder);

    const url = `${process.env.BACKEND_API_URL}/api/contacts/my-contacts?${queryParams.toString()}`;

    const res = await fetch(url, {
        headers: {
            "Content-Type": "application/json",
            cookie: `accessToken = ${accessToken}`,
        },
        next: {
            tags: ['my-contacts']
        }
    });

    const result = await res.json();

    if (result.success && result.meta) {
        if (result.meta.totalPage !== undefined && result.meta.totalPages === undefined) {
            result.meta.totalPages = result.meta.totalPage;
        }
    }

    return result;
};
