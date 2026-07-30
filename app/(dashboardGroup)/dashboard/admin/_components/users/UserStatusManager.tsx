/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { updateUserStatus } from "@/app/(dashboardGroup)/_actions/admin";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { IAdminUsers } from "@/lib/type";

const UserStatusManager = ({ user }: { user: IAdminUsers }) => {
    const router = useRouter();
    const [isUpdating, setIsUpdating] = useState(false);
    const [currentStatus, setCurrentStatus] = useState(user?.status || "PENDING");

    const handleStatusUpdate = async (newStatus: string) => {
        if (newStatus === currentStatus) {
            toast.info(`User is already ${newStatus.toLowerCase()}`);
            return;
        }

        setIsUpdating(true);
        try {
            const result = await updateUserStatus({
                userId: user.id,
                status: newStatus
            });

            if (result.success) {
                setCurrentStatus(newStatus);
                toast.success(`User status updated to ${newStatus.toLowerCase()}`);
                router.refresh();
            } else {
                toast.error(result.message || "Failed to update status");
            }
        } catch (error) {
            toast.error("An error occurred while updating status");
        } finally {
            setIsUpdating(false);
        }
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case "ACTIVE":
                return "bg-green-500 text-white font-semibold border border-green-300";
            case "BANNED":
                return "bg-red-500 text-white font-semibold border border-red-300";
            default:
                return "bg-gray-500 text-white font-semibold border border-gray-300";
        }
    };

    return (
        <div className="shadow-lg rounded-xl">
            <Card>
                <CardHeader>
                    <CardTitle>Status Management</CardTitle>
                    <CardDescription>
                        Update user account status
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4 -mt-2">
                    <div className="flex flex-col gap-4">
                        <div className="flex items-center gap-4">
                            <span className="text-sm font-medium">Current Status:</span>
                            <Badge className={getStatusColor(currentStatus)}>
                                {currentStatus}
                            </Badge>
                        </div>
                        <div className="flex flex-col sm:flex-row gap-4">
                            <Button
                                variant="default"
                                className="flex-1 bg-green-500 hover:bg-green-600 text-white hover:shadow-lg cursor-pointer"
                                onClick={() => handleStatusUpdate("ACTIVE")}
                                disabled={isUpdating || currentStatus === "ACTIVE"}
                            >
                                {isUpdating && currentStatus !== "ACTIVE" ? "Updating..." : "Active"}
                            </Button>
                            <Button
                                variant="destructive"
                                className="flex-1 hover:shadow-lg cursor-pointer"
                                onClick={() => handleStatusUpdate("BANNED")}
                                disabled={isUpdating || currentStatus === "BANNED"}
                            >
                                {isUpdating && currentStatus !== "BANNED" ? "Updating..." : "Banned"}
                            </Button>
                        </div>
                        {/* {isUpdating && (
                        <p className="text-sm text-muted-foreground text-center animate-pulse">
                            Updating status...
                        </p>
                    )} */}
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

export default UserStatusManager;
