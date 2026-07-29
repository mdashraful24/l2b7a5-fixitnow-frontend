import React from "react";
import { getMe } from "@/services/getMe";
import { redirect } from "next/navigation";
import { TechnicianSidebar } from "./_components/TechnicianSidebar";

const TechnicianDashboardLayout = async ({
    children,
}: {
    children: React.ReactNode;
}) => {
    const user = await getMe();

    if (!user?.success) {
        redirect("/auth/login");
    }

    if (user.data?.role !== "TECHNICIAN") {
        redirect("/");
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="container mx-auto max-w-7xl px-4 py-8">
                <div className="flex flex-col gap-8 lg:flex-row">
                    <aside className="w-full shrink-0 lg:w-72">
                        <TechnicianSidebar user={user.data} />
                    </aside>
                    <main className="min-w-0 flex-1">{children}</main>
                </div>
            </div>
        </div>
    );
};

export default TechnicianDashboardLayout;