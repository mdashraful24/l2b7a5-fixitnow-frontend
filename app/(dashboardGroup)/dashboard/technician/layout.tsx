import React from "react";
import { getMe } from "@/services/getMe";
import { redirect } from "next/navigation";
import { DashboardShell } from "@/components/dashboard/dashboard-shell";

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

    return <DashboardShell role="TECHNICIAN" user={user.data}>{children}</DashboardShell>;
};

export default TechnicianDashboardLayout;