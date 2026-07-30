"use server";

import { cookies } from "next/headers";
import { revalidateTag } from "next/cache";
import { z } from "zod";
import { CreateAvailabilityPayload, ICreateTechServicePayload, TechnicianActionResult, TechnicianBookingsResponse, UpdateTechnicianAvailabilityPayload, UpdateTechnicianBookingStatusPayload, UpdateTechnicianProfilePayload } from "@/lib/type";
import { getValidAccessToken } from "@/services/refreshToken";

const dayOptions = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
] as const;

const technicianBookingStatusOptions = [
    "CONFIRMED",
    "CANCELLED",
    "IN_PROGRESS",
    "COMPLETED",
] as const;

const optionalText = z
    .string()
    .trim()
    .optional()
    .transform((value) => (value && value.length > 0 ? value : undefined));

const profileSchema = z.object({
    name: z.string().trim().min(2, "Name is required"),
    email: z.string().trim().email("Enter a valid email address"),
    password: optionalText.pipe(z.string().min(6, "Password must be at least 6 characters").optional()),
    phone: optionalText,
    address: optionalText,
    bio: optionalText,
    skills: z.array(z.string().trim().min(1)).default([]),
    experience: optionalText,
    description: optionalText,
    location: optionalText,
});

const availabilitySchema = z.object({
    availabilitySlotId: z.string().trim().optional(),
    dayOfWeek: z.enum(dayOptions),
    startAt: z.string().trim().min(1, "Start time is required"),
    endAt: z.string().trim().min(1, "End time is required"),
    isAvailable: z.coerce.boolean().optional(),
});

const bookingStatusSchema = z.object({
    bookingId: z.string().trim().min(1, "Booking ID is required"),
    status: z.enum(technicianBookingStatusOptions),
});

const flattenFieldErrors = (error: z.ZodError) => {
    const fieldErrors: Record<string, string> = {};

    const errors = error.flatten().fieldErrors as Record<
        string,
        string[] | undefined
    >;

    for (const [field, messages] of Object.entries(errors)) {
        const firstMessage = messages?.[0];

        if (firstMessage) {
            fieldErrors[field] = firstMessage;
        }
    }

    return fieldErrors;
};

const getAccessToken = async () => {
    const cookieStore = await cookies();
    return cookieStore.get("accessToken")?.value ?? null;
};

const getAuthFailure = () => ({
    success: false,
    message: "Not authenticated",
    data: [],
    meta: null,
});

export const getTechnicianBookings = async (query?: {
    status?: string;
    page?: string;
    limit?: string;
    sortBy?: string;
    sortOrder?: string;
}) => {
    const accessToken = await getAccessToken();

    if (!accessToken) {
        return getAuthFailure();
    }

    const params = new URLSearchParams();

    if (query?.status) params.set("status", query.status);
    if (query?.page) params.set("page", query.page);
    if (query?.limit) params.set("limit", query.limit);
    if (query?.sortBy) params.set("sortBy", query.sortBy);
    if (query?.sortOrder) params.set("sortOrder", query.sortOrder);

    const res = await fetch(
        `${process.env.BACKEND_API_URL}/api/technicians/bookings?${params.toString()}`,
        {
            headers: {
                cookie: `accessToken=${accessToken}`,
            },
            next: {
                revalidate: 0,
                tags: ["technician-bookings"],
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
    } as TechnicianBookingsResponse;
};

export const updateTechnicianProfile = async (payload: UpdateTechnicianProfilePayload): Promise<TechnicianActionResult> => {
    const parsed = profileSchema.safeParse(payload);

    if (!parsed.success) {
        return {
            success: false,
            message: "Please fix the highlighted profile fields.",
            fieldErrors: flattenFieldErrors(parsed.error),
        };
    }

    const accessToken = await getAccessToken();

    if (!accessToken) {
        return { success: false, message: "Not authenticated" };
    }

    const res = await fetch(`${process.env.BACKEND_API_URL}/api/technicians/profile`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            cookie: `accessToken=${accessToken}`,
        },
        body: JSON.stringify(parsed.data),
    });

    const result = await res.json();

    if (result.success) {
        revalidateTag("my-profile", {
            expire: 0
        });
        revalidateTag("technicians", {
            expire: 0
        });
    }

    return result;
};

export const createTechnicianAvailability = async (payload: CreateAvailabilityPayload): Promise<TechnicianActionResult> => {
    const parsed = availabilitySchema.safeParse(payload);

    if (!parsed.success) {
        return {
            success: false,
            message: "Please fix the highlighted availability fields.",
            fieldErrors: flattenFieldErrors(parsed.error),
        };
    }

    const accessToken = await getAccessToken();

    if (!accessToken) {
        return { success: false, message: "Not authenticated" };
    }

    const res = await fetch(`${process.env.BACKEND_API_URL}/api/technicians/availability`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            cookie: `accessToken=${accessToken}`,
        },
        body: JSON.stringify({
            ...parsed.data,
            isAvailable: parsed.data.isAvailable ?? true,
        }),
    });

    const result = await res.json();

    if (result.success) {
        revalidateTag("technicians", {
            expire: 0
        });
        revalidateTag("my-profile", {
            expire: 0
        });
    }

    return result;
};

export const updateTechnicianAvailability = async (payload: UpdateTechnicianAvailabilityPayload): Promise<TechnicianActionResult> => {
    const parsed = availabilitySchema.extend({
        availabilitySlotId: z.string().trim().min(1, "Availability slot ID is required"),
    }).safeParse(payload);

    if (!parsed.success) {
        return {
            success: false,
            message: "Please fix the highlighted availability fields.",
            fieldErrors: flattenFieldErrors(parsed.error),
        };
    }

    const accessToken = await getAccessToken();

    if (!accessToken) {
        return { success: false, message: "Not authenticated" };
    }

    const res = await fetch(`${process.env.BACKEND_API_URL}/api/technicians/availability`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            cookie: `accessToken=${accessToken}`,
        },
        body: JSON.stringify({
            ...parsed.data,
            isAvailable: parsed.data.isAvailable,
        }),
    });

    const result = await res.json();

    if (result.success) {
        revalidateTag("technicians", {
            expire: 0
        });
        revalidateTag("my-profile", {
            expire: 0
        });
    }

    return result;
};

export const updateTechnicianBookingStatus = async (payload: UpdateTechnicianBookingStatusPayload): Promise<TechnicianActionResult> => {
    const parsed = bookingStatusSchema.safeParse(payload);

    if (!parsed.success) {
        return {
            success: false,
            message: "Please provide a valid booking status.",
            fieldErrors: flattenFieldErrors(parsed.error),
        };
    }

    const accessToken = await getAccessToken();

    if (!accessToken) {
        return { success: false, message: "Not authenticated" };
    }

    const res = await fetch(
        `${process.env.BACKEND_API_URL}/api/technicians/bookings/${parsed.data.bookingId}`,
        {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                cookie: `accessToken=${accessToken}`,
            },
            body: JSON.stringify({ status: parsed.data.status }),
        }
    );

    const result = await res.json();

    if (result.success) {
        revalidateTag("technician-bookings", {
            expire: 0
        });
        revalidateTag("bookings", {
            expire: 0
        });
        revalidateTag(`booking-${parsed.data.bookingId}`, {
            expire: 0
        });
    }

    return result;
};

const serviceSchema = z.object({
    title: z.string().trim().min(2, "Title is required"),
    description: z.string().trim().min(2, "Description is required"),
    price: z.coerce.number().positive("Price must be greater than 0"),
    duration: z.coerce.number().int().positive("Duration must be greater than 0"),
    categoryId: z.string().trim().min(1, "Category is required"),
    hourlyRate: z.coerce.number().positive().optional().or(z.literal("")),
    isAvailable: z.coerce.boolean().optional(),
});

export const createService = async (prevState: unknown, formData: FormData): Promise<TechnicianActionResult> => {
    const raw = {
        title: formData.get("title"),
        description: formData.get("description"),
        price: formData.get("price"),
        duration: formData.get("duration"),
        categoryId: formData.get("categoryId"),
        hourlyRate: formData.get("hourlyRate") || undefined,
        // isAvailable: formData.get("isAvailable") === "on" || formData.get("isAvailable") === "true",
    };

    const parsed = serviceSchema.safeParse(raw);

    if (!parsed.success) {
        return {
            success: false,
            message: "Please fix the highlighted fields.",
            fieldErrors: flattenFieldErrors(parsed.error),
        };
    }

    const accessToken = await getValidAccessToken();

    if (!accessToken) {
        return { success: false, message: "Not authenticated" };
    }

    const payload: ICreateTechServicePayload = {
        title: parsed.data.title,
        description: parsed.data.description,
        price: parsed.data.price,
        duration: parsed.data.duration,
        categoryId: parsed.data.categoryId,
        ...(typeof parsed.data.hourlyRate === "number" && { hourlyRate: parsed.data.hourlyRate }),
        // isAvailable: parsed.data.isAvailable ?? true,
    };

    const res = await fetch(`${process.env.BACKEND_API_URL}/api/services`, {
        method: "POST",
        headers: {
            cookie: `accessToken=${accessToken}`,
            "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
    });

    const result = await res.json();

    if (result.success) {
        revalidateTag("tech-services", {
            expire: 0
        });
    }

    return result;
};

export const getTechServices = async () => {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get("accessToken")?.value;

    if (!accessToken) {
        return {
            success: false,
            message: "User not logged in!",
        };
    }

    const res = await fetch(`${process.env.BACKEND_API_URL}/api/services/my-services`, {
        headers: {
            cookie: `accessToken=${accessToken}`,
        },
        cache: "force-cache",
        next: {
            revalidate: 60 * 60 * 24,
            tags: ["tech-services"],
        },
    });

    const result = await res.json();

    return result;
};

export const updatedService = async (serviceId: string, prevState: unknown, formData: FormData): Promise<TechnicianActionResult> => {
    const raw = {
        title: formData.get("title"),
        description: formData.get("description"),
        price: formData.get("price"),
        duration: formData.get("duration"),
        categoryId: formData.get("categoryId"),
        hourlyRate: formData.get("hourlyRate") || undefined,
        // isAvailable: formData.get("isAvailable") === "on" || formData.get("isAvailable") === "true",
    };

    const parsed = serviceSchema.safeParse(raw);

    if (!parsed.success) {
        return {
            success: false,
            message: "Please fix the highlighted fields.",
            fieldErrors: flattenFieldErrors(parsed.error),
        };
    }

    const accessToken = await getValidAccessToken();

    if (!accessToken) {
        return { success: false, message: "Not authenticated" };
    }

    const res = await fetch(`${process.env.BACKEND_API_URL}/api/services/${serviceId}`, {
        method: "PATCH",
        headers: {
            cookie: `accessToken=${accessToken}`,
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            title: parsed.data.title,
            description: parsed.data.description,
            price: parsed.data.price,
            duration: parsed.data.duration,
            categoryId: parsed.data.categoryId,
            ...(typeof parsed.data.hourlyRate === "number" && { hourlyRate: parsed.data.hourlyRate }),
            // isAvailable: parsed.data.isAvailable,
        }),
    });

    const result = await res.json();

    if (result.success) {
        revalidateTag("tech-services", {
            expire: 0
        });
    }

    return result;
};

export const deleteService = async(serviceId: string)=>{
    const cookieStore = await cookies();
    const accessToken = cookieStore.get("accessToken")?.value;

    if (!accessToken) {
        return {
            success: false,
            message: "User not logged in!",
        };
    }

    const res = await fetch(`${process.env.BACKEND_API_URL}/api/services/${serviceId}`, {
        method: "DELETE",
        headers: {
            cookie: `accessToken=${accessToken}`,
        },
    });

    const result = await res.json();

    if (result.success) {
        revalidateTag("tech-services", {
            expire: 0
        });
    }

    return result;
};
