"use client";

import { IAdminUsers } from "@/lib/type";
import {
    Mail,
    Calendar,
    MapPin,
    Wrench,
    User,
    CheckCircle,
    XCircle,
    Clock,
    Briefcase
} from "lucide-react";
import { useRouter } from "next/navigation";

type UsersCardProps = {
    user: IAdminUsers
}

export function UsersCard({ user }: UsersCardProps) {
    const router = useRouter();

    const getStatusConfig = (status: string) => {
        switch (status) {
            case "ACTIVE":
                return {
                    color: "bg-green-500",
                    textColor: "text-white",
                    bgColor: "bg-green-500",
                    borderColor: "border-green-200",
                    icon: CheckCircle,
                    label: "Active"
                };
            case "BANNED":
                return {
                    color: "bg-red-500",
                    textColor: "text-white",
                    bgColor: "bg-red-500",
                    borderColor: "border-red-200",
                    icon: XCircle,
                    label: "Banned"
                };
            default:
                return {
                    color: "bg-gray-500",
                    textColor: "text-white",
                    bgColor: "bg-gray-600",
                    borderColor: "border-gray-200",
                    icon: Clock,
                    label: "Pending"
                };
        }
    };

    const getRoleConfig = (role: string) => {
        switch (role) {
            case "TECHNICIAN":
                return {
                    icon: Wrench,
                    label: "Technician",
                    bgColor: "bg-blue-600",
                    textColor: "text-white",
                    borderColor: "border-blue-200"
                };
            case "CUSTOMER":
                return {
                    icon: User,
                    label: "Customer",
                    bgColor: "bg-purple-600",
                    textColor: "text-white",
                    borderColor: "border-purple-200"
                };
            case "ADMIN":
                return {
                    icon: User,
                    label: "Admin",
                    bgColor: "bg-red-600",
                    textColor: "text-white",
                    borderColor: "border-red-200"
                };
            default:
                return {
                    icon: User,
                    label: role,
                    bgColor: "bg-gray-600",
                    textColor: "text-white",
                    borderColor: "border-gray-200"
                };
        }
    };

    const handleViewDetails = () => {
        router.push(`/dashboard/admin/users/${user.id}`);
    };

    const statusConfig = getStatusConfig(user.status);
    const StatusIcon = statusConfig.icon;
    const roleConfig = getRoleConfig(user.role);
    const RoleIcon = roleConfig.icon;

    return (
        <div
            onClick={handleViewDetails}
            className="group relative bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 overflow-hidden cursor-pointer flex flex-col h-full"
        >
            {/* Gradient Top Bar */}
            <div className={`h-1 w-full bg-linear-to-r ${statusConfig.color} from-${statusConfig.color}/50 to-${statusConfig.color} shrink-0`} />

            <div className="p-5 flex flex-col flex-1">
                {/* Header - Fixed height section */}
                <div className="flex items-start justify-between mb-4 shrink-0">
                    <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                            <h3 className="text-xl font-semibold truncate">
                                {user.name}
                            </h3>
                            <div className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-sm font-medium ${roleConfig.bgColor} ${roleConfig.textColor} border ${roleConfig.borderColor} shrink-0`}>
                                <RoleIcon className="h-3 w-3" />
                                {roleConfig.label}
                            </div>
                        </div>
                        <div className="flex items-center gap-1.5 mt-1 text-sm text-gray-700 dark:text-gray-300">
                            <Mail className="h-3.5 w-3.5 shrink-0" />
                            <span className="truncate">{user.email}</span>
                        </div>
                    </div>

                    {/* Status Badge */}
                    <div className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-sm font-medium ${statusConfig.bgColor} ${statusConfig.textColor} border ${statusConfig.borderColor} shrink-0 ml-2`}>
                        <StatusIcon className="h-3 w-3" />
                        {statusConfig.label}
                    </div>
                </div>

                {/* Content - Flexible section that grows */}
                <div className="flex-1 flex flex-col">
                    {user.technicianProfile ? (
                        <>
                            {/* Technician Profile */}
                            <div className="bg-gray-50 dark:bg-zinc-800/50 rounded-lg p-3 flex-1">
                                <div className="space-y-2 h-full">
                                    <div className="flex items-start gap-2">
                                        <Briefcase className="h-4 w-4 mt-0.5 shrink-0 text-gray-600 dark:text-gray-400" />
                                        <div>
                                            <p className="text-sm font-medium line-clamp-1 text-gray-900 dark:text-white">
                                                {user.technicianProfile.bio}
                                            </p>
                                            <p className="text-sm text-gray-600 dark:text-gray-400">
                                                {user.technicianProfile.experience} experience
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                                        <MapPin className="h-3.5 w-3.5 shrink-0" />
                                        <span>{user.technicianProfile.location}</span>
                                    </div>

                                    {user.technicianProfile.skills.length > 0 && (
                                        <div className="flex flex-wrap gap-1.5 pt-1">
                                            {user.technicianProfile.skills.slice(0, 3).map((skill, index) => (
                                                <span
                                                    key={index}
                                                    className="px-2 py-1 text-[13px] bg-gray-700 dark:bg-gray-600 rounded-full text-white"
                                                >
                                                    {skill}
                                                </span>
                                            ))}
                                            {user.technicianProfile.skills.length > 3 && (
                                                <span className="px-2 py-1 text-[13px] bg-gray-700 dark:bg-gray-600 rounded-full text-white">
                                                    +{user.technicianProfile.skills.length - 3}
                                                </span>
                                            )}
                                        </div>
                                    )}
                                </div>
                            </div>
                        </>
                    ) : (
                        <div className="bg-gray-50 dark:bg-zinc-800/50 rounded-lg p-3 flex-1 flex items-center">
                            <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                                <User className="h-4 w-4" />
                                <span>Regular user account</span>
                            </div>
                        </div>
                    )}

                    {/* Footer Info */}
                    <div className="flex items-center justify-between pt-3 mt-3 border-t border-zinc-100 dark:border-zinc-800 shrink-0">
                        <div className="flex items-center gap-1.5 text-xs text-gray-500 dark:text-gray-400">
                            <Calendar className="h-3 w-3" />
                            <span>Joined {new Date(user.createdAt).toLocaleDateString('en-US', {
                                month: 'short',
                                day: 'numeric',
                                year: 'numeric'
                            })}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
