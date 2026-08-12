import Footer from '@/components/shared/footer';
import { Navbar } from '@/components/shared/navbar';
import { getMe } from '@/services/getMe'
import { GoogleOAuthProvider } from "@react-oauth/google";
import React from 'react'

const AuthLayout = async ({
    children
}: {
    children: React.ReactNode
}) => {
    const user = await getMe();

    return (
        <div>
            <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!}>
                <Navbar user={user} />
                {children}
                <Footer />
            </GoogleOAuthProvider>
        </div>
    )
}

export default AuthLayout
