import React from "react";
import { getMe } from "@/services/getMe";
import { redirect } from "next/navigation";
import { DashboardShell } from "@/components/dashboard/dashboard-shell";

const AdminDashboardLayout = async ({
    children,
}: {
    children: React.ReactNode;
}) => {
    const user = await getMe();

    if (!user?.success) {
        redirect("/auth/login");
    }

    if (user.data?.role !== "ADMIN") {
        redirect("/");
    }

    return <DashboardShell role="ADMIN" user={user.data}>{children}</DashboardShell>;
};

export default AdminDashboardLayout;
