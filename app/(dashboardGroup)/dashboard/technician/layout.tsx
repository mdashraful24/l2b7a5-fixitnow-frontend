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
        <div className="min-h-screen bg-background">
            <div className="lg:container mx-auto max-w-7xl px-4 py-8">
                <div className="flex flex-col gap-10 md:gap-8 md:flex-row">
                    <aside className="w-full shrink-0 md:w-48 lg:w-64">
                        <TechnicianSidebar user={user.data} />
                    </aside>
                    <main className="min-w-0 flex-1">{children}</main>
                </div>
            </div>
        </div>
    );
};

export default TechnicianDashboardLayout;