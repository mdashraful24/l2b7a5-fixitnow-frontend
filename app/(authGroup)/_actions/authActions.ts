"use server";

import { cookies } from "next/headers";
import { LoginState, RegisterState, UserRoleByGoogle } from "@/lib/type";
import jwt, { JwtPayload } from "jsonwebtoken";
import { redirect } from "next/navigation";

export const loginAction = async (redirectTo: string, prevState: LoginState | null, formData: FormData) => {
    const email = formData.get("email");
    const password = formData.get("password");

    const payload = {
        email,
        password
    };

    const res = await fetch(`${process.env.BACKEND_API_URL}/api/auth/login`, {
        method: "POST",
        headers: {
            "content-type": "application/json"
        },
        body: JSON.stringify(payload)
    });

    const result = await res.json();

    if (result.success) {
        const cookieStore = await cookies();

        cookieStore.set("accessToken", result.data.accessToken, {
            httpOnly: true,
            maxAge: 60 * 60 * 24,
            sameSite: "lax"
        });

        cookieStore.set("refreshToken", result.data.refreshToken, {
            httpOnly: true,
            maxAge: 60 * 60 * 24 * 7,
            sameSite: "lax"
        });

        const decodedToken = jwt.decode(result.data.accessToken) as JwtPayload;

        if (redirectTo && typeof redirectTo === "string" && redirectTo.startsWith("/") && !redirectTo.startsWith("//")) {
            redirect(redirectTo);
        }

        if (decodedToken.role === "CUSTOMER") {
            redirect("/dashboard/customer");
        } else if (decodedToken.role === "TECHNICIAN") {
            redirect("/dashboard/technician");
        } else if (decodedToken.role === "ADMIN") {
            redirect("/dashboard/admin");
        }
    }

    return result;
};

export const googleLoginAction = async (idToken: string, role: UserRoleByGoogle["role"], redirectTo?: string) => {
    if (
        role !== "CUSTOMER" &&
        role !== "TECHNICIAN"
    ) {
        return {
            success: false,
            message: "Google login is only available for customers and technicians.",
        };
    }

    if (!idToken) {
        return {
            success: false,
            message: "Google ID token is required.",
        };
    }

    const payload = {
        idToken,
        role,
    };

    const res = await fetch(
        `${process.env.BACKEND_API_URL}/api/auth/google-login`,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(payload),
        }
    );

    const result = await res.json();

    if (!result.success) {
        return result;
    }

    const cookieStore = await cookies();

    cookieStore.set(
        "accessToken",
        result.data.accessToken,
        {
            httpOnly: true,
            maxAge: 60 * 60 * 24,
            sameSite: "lax",
        }
    );

    cookieStore.set(
        "refreshToken",
        result.data.refreshToken,
        {
            httpOnly: true,
            maxAge: 60 * 60 * 24 * 7,
            sameSite: "lax",
        }
    );

    const decodedToken = jwt.decode(
        result.data.accessToken
    ) as JwtPayload;

    // Return success with role information
    // The redirect will be handled by the client
    return {
        success: true,
        message: result.message || "Google login successful",
        role: decodedToken.role,
        accessToken: result.data.accessToken,
        refreshToken: result.data.refreshToken,
    };
};

export const registerAction = async (prevState: RegisterState, formData: FormData) => {
    // console.log(formData);
    // console.log(prevState, "prev");

    const name = formData.get("name");
    const email = formData.get("email");
    const password = formData.get("password");
    const role = formData.get("role");

    const payload = {
        name,
        email,
        password,
        role
    };

    const res = await fetch(`${process.env.BACKEND_API_URL}/api/auth/register`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
    });

    const result = await res.json();

    if (result.success) {
        redirect("/auth/login", "replace");
    }

    return result;
};
