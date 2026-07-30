"use client";

import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { IAdminUsers } from "@/lib/type";
import { Mail, Calendar, MapPin, Wrench, MoreVertical } from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { updateUserStatus } from "@/app/(dashboardGroup)/_actions/admin";
import { toast } from "sonner";

type UsersCardProps = {
    user: IAdminUsers
}

export function UsersCard({ user }: UsersCardProps) {
    const router = useRouter();
    const [isUpdating, setIsUpdating] = useState(false);
    const [currentStatus, setCurrentStatus] = useState(user.status);

    const getStatusColor = (status: string) => {
        switch (status) {
            case "ACTIVE":
                return "bg-green-500/10 text-green-500 hover:bg-green-500/20";
            case "BANNED":
                return "bg-red-500/10 text-red-500 hover:bg-red-500/20";
            default:
                return "bg-gray-500/10 text-gray-500 hover:bg-gray-500/20";
        }
    };

    const getRoleBadge = (role: string) => {
        switch (role) {
            case "TECHNICIAN":
                return <Badge variant="secondary" className="bg-blue-500/10 text-blue-500">Technician</Badge>;
            case "CUSTOMER":
                return <Badge variant="secondary" className="bg-purple-500/10 text-purple-500">Customer</Badge>;
            case "ADMIN":
                return <Badge variant="secondary" className="bg-orange-500/10 text-orange-500">Admin</Badge>;
            default:
                return <Badge variant="secondary">{role}</Badge>;
        }
    };

    const handleViewDetails = () => {
        router.push(`/dashboard/admin/users/${user.id}`);
    };

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

    return (
        <Card className="hover:shadow-lg transition-shadow duration-200">
            <CardHeader className="flex flex-row items-start justify-between space-y-0">
                <div className="space-y-1">
                    <div className="flex items-center gap-2">
                        <CardTitle className="text-lg font-semibold">{user.name}</CardTitle>
                        {getRoleBadge(user.role)}
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Mail className="h-3.5 w-3.5" />
                        <span>{user.email}</span>
                    </div>
                </div>
                <Badge className={getStatusColor(currentStatus)}>
                    {currentStatus}
                </Badge>
            </CardHeader>

            <CardContent className="space-y-3">
                {user.technicianProfile && (
                    <div className="space-y-2">
                        <div className="flex items-start gap-2 text-sm">
                            <Wrench className="h-4 w-4 text-muted-foreground mt-0.5" />
                            <div>
                                <p className="font-medium text-sm">{user.technicianProfile.bio}</p>
                                <p className="text-muted-foreground text-xs">{user.technicianProfile.experience}</p>
                            </div>
                        </div>

                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <MapPin className="h-3.5 w-3.5" />
                            <span>{user.technicianProfile.location}</span>
                        </div>

                        {user.technicianProfile.skills.length > 0 && (
                            <div className="flex flex-wrap gap-1.5 pt-1">
                                {user.technicianProfile.skills.slice(0, 3).map((skill, index) => (
                                    <Badge key={index} variant="outline" className="text-xs">
                                        {skill}
                                    </Badge>
                                ))}
                                {user.technicianProfile.skills.length > 3 && (
                                    <Badge variant="outline" className="text-xs">
                                        +{user.technicianProfile.skills.length - 3} more
                                    </Badge>
                                )}
                            </div>
                        )}
                    </div>
                )}

                <div className="flex items-center gap-4 text-xs text-muted-foreground pt-2 border-t">
                    <div className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        <span>Joined {new Date(user.createdAt).toLocaleDateString()}</span>
                    </div>
                </div>
            </CardContent>

            <CardFooter className="flex justify-between">
                <Button
                    variant="outline"
                    size="sm"
                    onClick={handleViewDetails}
                >
                    View Details
                </Button>

                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm" disabled={isUpdating}>
                            <MoreVertical className="h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Manage User</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={() => handleStatusUpdate("ACTIVE")}>
                            <div className="flex items-center gap-2">
                                <div className="h-2 w-2 rounded-full bg-green-500" />
                                Set Active
                            </div>
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleStatusUpdate("BANNED")}>
                            <div className="flex items-center gap-2">
                                <div className="h-2 w-2 rounded-full bg-red-500" />
                                Set Banned
                            </div>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={handleViewDetails}>
                            View Profile
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </CardFooter>
        </Card>
    );
}
