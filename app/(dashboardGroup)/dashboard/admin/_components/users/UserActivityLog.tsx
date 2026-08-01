"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { IAdminUsers } from "@/lib/type";
import { Activity, Clock } from "lucide-react";

const UserActivityLog = ({ user }: { user: IAdminUsers }) => {
    if (!user) {
        return (
            <Card>
                <CardContent className="py-8 text-center text-muted-foreground">
                    No activity data available
                </CardContent>
            </Card>
        );
    }

    const activities = [
        { action: "User registered", timestamp: user.createdAt },
        { action: "Profile updated", timestamp: user.updatedAt },
    ].filter(activity => activity.timestamp);

    if (activities.length === 0) {
        return (
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-foreground">
                        <Activity className="h-5 w-5" />
                        Activity Log
                    </CardTitle>
                    <CardDescription>
                        No recent activity recorded
                    </CardDescription>
                </CardHeader>
            </Card>
        );
    }

    return (
        <div className="shadow-lg hover:shadow-xl rounded-xl">
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-foreground">
                        <Activity className="h-5 w-5" />
                        Activity Log
                    </CardTitle>
                    <CardDescription className="text-muted-foreground">
                        Recent user activity
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        {activities.map((activity, index) => (
                            <div key={index} className="flex items-start gap-3 pb-3 border-b border-border last:border-0">
                                <div className="p-1 bg-muted rounded-full">
                                    <Clock className="h-3.5 w-3.5 text-muted-foreground" />
                                </div>
                                <div className="flex-1 space-y-1.5">
                                    <p className="text-sm font-medium text-foreground">{activity.action}</p>
                                    <p className="text-xs text-muted-foreground">
                                        {activity.timestamp ? new Date(activity.timestamp).toLocaleString() : "N/A"}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

export default UserActivityLog;
