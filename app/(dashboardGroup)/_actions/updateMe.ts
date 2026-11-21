"use server";

import { IUpdateMe } from "@/lib/type";
import { getUploadedImage, toUploadFormData, validateUploadedImage } from "@/lib/utils";
import { cookies } from "next/headers";
import { revalidatePath, revalidateTag } from "next/cache";

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
        // console.error("Update profile error:", error);

        return {
            success: false,
            message: "Something went wrong while updating profile.",
        };
    }
};

export const uploadProfilePicture = async (prevState: unknown, formData: FormData) => {
    const cookieStore = await cookies();

    const accessToken = cookieStore.get("accessToken")?.value;

    if (!accessToken) {
        return {
            success: false,
            message: "User not logged in!",
        };
    }

    const imageFile = getUploadedImage(formData, "profilePicture");

    if (!imageFile) {
        return {
            success: false,
            message: "Please choose an image first.",
            fieldErrors: { profilePicture: "Please choose an image first." },
        };
    }

    const imageError = validateUploadedImage(imageFile);

    if (imageError) {
        return {
            success: false,
            message: imageError,
            fieldErrors: { profilePicture: imageError },
        };
    }

    try {
        const res = await fetch(
            `${process.env.BACKEND_API_URL}/api/auth/upload-profile-picture`,
            {
                method: "PATCH",
                headers: {
                    cookie: `accessToken=${accessToken}`,
                },
                body: toUploadFormData(formData, "profilePicture"),
                cache: "no-store",
            }
        );

        const result = await res.json();

        if (result.success) {
            revalidateTag("my-profile", "max");
            revalidatePath("/dashboard/customer/profile");
            revalidatePath("/dashboard/technician/profile");
            revalidatePath("/dashboard/admin/profile");
        }

        return result;
    } catch {
        return {
            success: false,
            message: "Something went wrong while uploading your profile picture.",
        };
    }
};
