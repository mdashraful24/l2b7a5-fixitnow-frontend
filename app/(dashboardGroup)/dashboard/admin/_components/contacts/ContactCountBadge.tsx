"use client";

import { getContacts } from "@/app/(publicGroup)/_actions/contact";
import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Mail, AlertCircle } from "lucide-react";
import Link from "next/link";

interface ContactCountBadgeProps {
    className?: string;
}

const ContactCountBadge = ({ className }: ContactCountBadgeProps) => {
    const [count, setCount] = useState<number | null>(null);
    const [unrepliedCount, setUnrepliedCount] = useState<number | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCounts = async () => {
            try {
                setLoading(true);
                const result = await getContacts({
                    limit: 100,
                    page: 1
                });

                if (result.success && result.meta) {
                    setCount(result.meta.total);

                    // Count unreplied contacts
                    const unreplied = result.data.filter(c => !c.reply).length;
                    setUnrepliedCount(unreplied);
                }
            } catch (error) {
                console.error("Failed to fetch contact counts:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchCounts();
    }, []);

    if (loading) {
        return (
            <Card className={`border-border/80 bg-card p-5 shadow-sm ${className ?? ""}`}>
                <CardHeader className="flex flex-row items-center justify-between p-0">
                    <CardTitle className="text-[11px] font-semibold uppercase tracking-[0.12em] text-muted-foreground">
                        Messages
                    </CardTitle>
                    <div className="grid size-10 place-items-center rounded-lg bg-blue-500/10">
                        <Mail className="size-5 text-blue-600 dark:text-blue-400" />
                    </div>
                </CardHeader>
                <CardContent className="p-0 pt-4">
                    <p className="text-2xl font-semibold tracking-tight text-foreground">...</p>
                </CardContent>
            </Card>
        );
    }

    return (
        <Link href="/dashboard/admin/contacts" className="block">
            <Card className={`border-border/80 bg-card p-5 shadow-sm transition-shadow hover:shadow-md ${className ?? ""}`}>
                <CardHeader className="flex flex-row items-center justify-between p-0">
                    <CardTitle className="text-[11px] font-semibold uppercase tracking-[0.12em] text-muted-foreground">
                        Messages
                    </CardTitle>
                    <div className="grid size-10 place-items-center rounded-lg bg-blue-500/10">
                        <Mail className="size-5 text-blue-600 dark:text-blue-400" />
                    </div>
                </CardHeader>
                <CardContent className="p-0 pt-4">
                    <div className="flex flex-wrap items-center gap-2">
                        <p className="text-2xl font-semibold tracking-tight text-foreground">{count}</p>
                        {unrepliedCount !== null && (
                            <div className={`flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-medium ${
                                unrepliedCount > 0
                                    ? "bg-amber-500/10 text-amber-600 dark:text-amber-400"
                                    : "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
                            }`}>
                                <AlertCircle className="size-3" />
                                {unrepliedCount > 0 ? `${unrepliedCount} pending` : "All replied"}
                            </div>
                        )}
                    </div>
                </CardContent>
            </Card>
        </Link>
    );
};

export default ContactCountBadge;
