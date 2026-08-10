import { JwtPayload } from 'jsonwebtoken';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { getNewAccessToken } from './services/refreshToken';
import { jwtUtils } from './utils/jwt';

const AUTH_ROUTES = [
    "/auth/login",
    "/auth/register",
    "/auth/forgot-password",
];

const PUBLIC_ROUTES = [
    "/",
    "/services",
    "/technicians",
    "/technicians/[id]",
    "/all-categories",
    "/contact"
];

// This function can be marked `async` if using `await` inside
export async function proxy(request: NextRequest) {
    const pathName = request.nextUrl.pathname;

    const cookieStore = await cookies();
    // const accessToken = cookieStore.get('accessToken')?.value;

    let accessToken = request.cookies.get("accessToken")?.value;
    const refreshToken = request.cookies.get("refreshToken")?.value;

    let decodedAccessToken = accessToken ? jwtUtils.verifyToken(accessToken, process.env.JWT_ACCESS_SECRET as string) : null;
    const decodedRefreshToken = refreshToken ? jwtUtils.verifyToken(refreshToken, process.env.JWT_REFRESH_SECRET as string) : null;

    if (!decodedAccessToken?.success && decodedRefreshToken?.success) {
        // console.log("refresh token is valid");
        // access token has expired and refresh token is valid
        const result = await getNewAccessToken();
        // console.log(result);

        if (result.success) {
            // console.log("new access token received");
            const newAccessToken = result.data.accessToken;

            cookieStore.set("accessToken", newAccessToken, {
                httpOnly: true,
                maxAge: 60 * 60 * 24,
                sameSite: "lax",
            });

            accessToken = newAccessToken;
            decodedAccessToken = jwtUtils.verifyToken(accessToken!, process.env.JWT_ACCESS_SECRET as string);
        }
    }

    let userRole = null;

    if (!decodedAccessToken?.success) {
        // Token has expired or invalid, clear the cookies
        cookieStore.delete("accessToken");
    }

    if (decodedAccessToken?.success && decodedAccessToken.data) {
        userRole = (decodedAccessToken.data as JwtPayload).role;
    }

    // If access token is present and trying to access auth routes then redirect to dashboard based on role
    if (accessToken && AUTH_ROUTES.includes(pathName)) {
        if (userRole === "CUSTOMER") {
            return NextResponse.redirect(new URL('/dashboard/customer', request.url));
        } else if (userRole === "TECHNICIAN") {
            return NextResponse.redirect(new URL('/dashboard/technician', request.url));
        } else if (userRole === "ADMIN") {
            return NextResponse.redirect(new URL('/dashboard/admin', request.url));
        } else {
            return NextResponse.redirect(new URL('/', request.url));
        }
    }

    const isPublicRoute = PUBLIC_ROUTES.some((route) => pathName === route || pathName.startsWith(route + "/"));
    const isAuthRoute = AUTH_ROUTES.some((route) => pathName === route || pathName.startsWith(route + "/"));

    // Authenticated pages protection : Authorization is not handled yet
    if (!accessToken && !isPublicRoute && !isAuthRoute) {
        const loginUrl = new URL('/auth/login', request.url);

        const fullRedirectUrl = request.nextUrl.pathname + request.nextUrl.search;

        loginUrl.searchParams.set("redirectTo", fullRedirectUrl);

        return NextResponse.redirect(loginUrl);
    }

    // Authorization : Role based access control (RBAC) for authenticated users 
    if (pathName.startsWith("/dashboard/customer") && userRole !== "CUSTOMER") {
        return NextResponse.redirect(new URL('/not-found', request.url));
    } else if (pathName.startsWith("/dashboard/technician") && userRole !== "TECHNICIAN") {
        return NextResponse.redirect(new URL('/not-found', request.url));
    } else if (pathName.startsWith("/dashboard/admin") && userRole !== "ADMIN") {
        return NextResponse.redirect(new URL('/not-found', request.url));
    }

    return NextResponse.next()
}

export const config = {
    matcher: [
        '/((?!api|_next/static|favicon.ico|_next/image|.*\\.png$).*)',
    ],
}
