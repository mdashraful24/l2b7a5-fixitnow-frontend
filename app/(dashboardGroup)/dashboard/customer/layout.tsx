import React from "react";
import { getMe } from "@/services/getMe";
import { redirect } from "next/navigation";
import { CustomerSidebar } from "./_components/CustomerSidebar";

const CustomerDashboardLayout = async ({
    children,
}: {
    children: React.ReactNode;
}) => {
    const user = await getMe();

    if (!user?.success) {
        redirect("/auth/login");
    }

    if (user.data?.role !== "CUSTOMER") {
        redirect("/");
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="container mx-auto max-w-7xl px-4 py-8">
                <div className="flex flex-col gap-8 lg:flex-row">
                    {/* Sidebar */}
                    <aside className="w-full shrink-0 lg:w-64">
                        <CustomerSidebar user={user.data} />
                    </aside>
                    {/* Main */}
                    <main className="flex-1 min-w-0">
                        {children}
                    </main>
                </div>
            </div>
        </div>
    );
};

export default CustomerDashboardLayout;
