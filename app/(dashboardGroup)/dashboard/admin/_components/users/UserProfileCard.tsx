"use client";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
    Mail,
    Calendar,
    MapPin,
    Wrench,
    Phone,
    Star,
    Clock
} from "lucide-react";
import { IAdminUsers } from "@/lib/type";
import { cn } from "@/lib/utils";

const UserProfileCard = ({ user }: { user: IAdminUsers }) => {
    if (!user) {
        return (
            <Card>
                <CardContent className="py-12 text-center text-muted-foreground">
                    User data not available
                </CardContent>
            </Card>
        );
    }

    const getRoleStyles = (role: string) => {
        const styles = {
            ADMIN: "bg-amber-500/10 text-amber-600 border-amber-200 dark:bg-amber-500/20 dark:text-amber-400",
            TECHNICIAN: "bg-blue-500/10 text-blue-600 border-blue-200 dark:bg-blue-500/20 dark:text-blue-400",
            CUSTOMER: "bg-purple-500/10 text-purple-600 border-purple-200 dark:bg-purple-500/20 dark:text-purple-400"
        };
        return styles[role as keyof typeof styles] || styles.CUSTOMER;
    };

    return (
        <Card className="overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300">
            <CardHeader>
                <div className="flex items-start justify-between gap-4">
                    <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                            <h2 className="text-xl font-bold truncate">
                                {user.name || "Unnamed User"}
                            </h2>
                            <Badge
                                variant="outline"
                                className={cn("text-xs font-medium px-2.5 py-0.5", getRoleStyles(user.role))}
                            >
                                {user.role}
                            </Badge>
                        </div>
                        <p className="text-sm font-medium text-gray-600 flex items-center gap-1.5">
                            <Mail className="h-3.5 w-3.5" />
                            {user.email || "No email"}
                        </p>
                    </div>
                </div>
            </CardHeader>

            <CardContent className="space-y-4">
                {/* Info Grid */}
                <div className="grid grid-cols-2 gap-2">
                    {user.phone && (
                        <div className="flex items-center gap-2 text-sm bg-muted/30 rounded-lg px-3 py-2">
                            <Phone className="h-3.5 w-3.5 text-muted-foreground shrink-0" />
                            <span className="truncate">{user.phone}</span>
                        </div>
                    )}

                    <div className="flex items-center gap-2 text-sm bg-muted/30 rounded-lg px-3 py-2">
                        <Calendar className="h-3.5 w-3.5 text-muted-foreground shrink-0" />
                        <span>{user.createdAt ? new Date(user.createdAt).toLocaleDateString() : "N/A"}</span>
                    </div>
                </div>

                {/* Technician Section */}
                {user.technicianProfile && (
                    <div className="bg-primary/5 rounded-xl p-4 space-y-3 border border-primary/10">
                        <div className="flex items-center gap-2">
                            <Wrench className="h-4 w-4 text-primary" />
                            <h4 className="font-semibold text-sm">Technician</h4>
                        </div>

                        {user.technicianProfile.bio && (
                            <p className="text-sm text-gray-600 leading-relaxed">
                                {user.technicianProfile.bio}
                            </p>
                        )}

                        <div className="flex flex-wrap gap-2">
                            {user.technicianProfile.experience && (
                                <Badge variant="secondary" className="text-sm bg-background/60">
                                    <Star className="mr-1 text-amber-500" />
                                    {user.technicianProfile.experience}
                                </Badge>
                            )}
                            {user.technicianProfile.location && (
                                <Badge variant="secondary" className="text-sm bg-background/60">
                                    <MapPin />
                                    {user.technicianProfile.location}
                                </Badge>
                            )}
                        </div>

                        {user.technicianProfile.skills?.length > 0 && (
                            <div className="flex flex-wrap gap-1.5 pt-1">
                                {user.technicianProfile.skills.slice(0, 5).map((skill, i) => (
                                    <div
                                        key={i}
                                        className="text-[13px] font-medium bg-blue-600 text-white px-3 py-1 border rounded-full"
                                    >
                                        {skill}
                                    </div>
                                ))}
                                {user.technicianProfile.skills.length > 5 && (
                                    <Badge variant="outline" className="text-xs bg-background/50">
                                        +{user.technicianProfile.skills.length - 5}
                                    </Badge>
                                )}
                            </div>
                        )}
                    </div>
                )}

                {/* Footer Meta */}
                <div className="flex items-center justify-between text-xs pt-2 border-t">
                    <span>User ID: {user.id.slice(0, 8)}</span>
                    <span className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        Updated: {user.updatedAt ? new Date(user.updatedAt).toLocaleDateString() : "N/A"}
                    </span>
                </div>
            </CardContent>
        </Card>
    );
};

export default UserProfileCard;