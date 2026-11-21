import React from "react";
import { getMe } from "@/services/getMe";
import { redirect } from "next/navigation";
import { DashboardShell } from "@/components/dashboard/dashboard-shell";

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

    return <DashboardShell role="CUSTOMER" user={user.data}>{children}</DashboardShell>;
};

export default CustomerDashboardLayout;
