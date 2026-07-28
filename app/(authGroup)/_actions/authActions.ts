"use server";

import { cookies } from "next/headers";
import { LoginState } from "@/lib/type";
import jwt, { JwtPayload } from "jsonwebtoken";
import { redirect } from "next/navigation";

export const loginAction = async (redirectTo: string, prevState: LoginState, formData: FormData) => {
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
}