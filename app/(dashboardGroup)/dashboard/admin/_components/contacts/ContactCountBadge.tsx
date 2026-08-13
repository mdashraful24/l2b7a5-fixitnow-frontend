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
            <Card className="shadow-sm hover:shadow-md transition-shadow border-border bg-linear-to-br from-blue-700 to-blue-900">
                <CardHeader className="flex flex-row items-center justify-between">
                    <CardTitle className="text-sm font-medium text-white">
                        Messages
                    </CardTitle>
                    <div className="rounded-full p-1.5 bg-blue-100">
                        <Mail className="h-4 w-4 text-blue-600" />
                    </div>
                </CardHeader>
                <CardContent className="-mt-4">
                    <div className="flex items-baseline gap-2">
                        <div className="text-2xl font-bold text-white">...</div>
                    </div>
                </CardContent>
            </Card>
        );
    }

    return (
        <Link href="/dashboard/admin/contacts" className="block">
            <Card className="shadow-sm hover:shadow-md transition-shadow border-border bg-linear-to-br from-blue-700 to-blue-900 hover:scale-[1.02]">
                <CardHeader className="flex flex-row items-center justify-between">
                    <CardTitle className="text-sm font-medium text-white">
                        Messages
                    </CardTitle>
                    <div className="rounded-full p-1.5 bg-blue-100">
                        <Mail className="h-4 w-4 text-blue-600" />
                    </div>
                </CardHeader>
                <CardContent className="-mt-4">
                    <div className="flex items-baseline gap-2">
                        <div className="text-2xl font-bold text-white">{count}</div>
                        {unrepliedCount !== null && (
                            <div className={`flex items-center gap-1 text-xs px-2 py-0.5 rounded-full ${unrepliedCount > 0
                                    ? 'text-yellow-200 bg-yellow-500/20'
                                    : 'text-green-200 bg-green-500/30'
                                }`}>
                                <AlertCircle className="h-3 w-3" />
                                {unrepliedCount > 0
                                    ? `${unrepliedCount} pending`
                                    : 'All replied ✓'}
                            </div>
                        )}
                    </div>
                </CardContent>
            </Card>
        </Link>
    );
};

export default ContactCountBadge;
