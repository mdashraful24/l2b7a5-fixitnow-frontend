/* eslint-disable react-hooks/immutability */
"use client";

import { useEffect, useState } from "react";
import { Loader2, CreditCard, CheckCircle, XCircle, Clock } from "lucide-react";
import { getPaymentHistory } from "@/app/(dashboardGroup)/_actions/customer";

interface Payment {
    id: string;
    amount: number;
    status: string;
    provider: string;
    createdAt: string;
    bookingId: string;
    transactionId?: string;
    booking?: {
        service?: {
            title: string;
        };
    };
}

const statusConfig: Record<string, { label: string; color: string; icon: React.ReactNode }> = {
    COMPLETED: {
        label: "Completed",
        color: "bg-green-100 text-green-700",
        icon: <CheckCircle className="h-4 w-4" />,
    },
    PENDING: {
        label: "Pending",
        color: "bg-yellow-100 text-yellow-700",
        icon: <Clock className="h-4 w-4" />,
    },
    FAILED: {
        label: "Failed",
        color: "bg-red-100 text-red-700",
        icon: <XCircle className="h-4 w-4" />,
    },
};

export function PaymentHistory() {
    const [payments, setPayments] = useState<Payment[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchPayments();
    }, []);

    const fetchPayments = async () => {
        setLoading(true);
        try {
            const result = await getPaymentHistory();
            if (result.success) {
                setPayments(result.data);
            }
        } catch (error) {
            // console.error("Error fetching payments:", error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center py-12">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
        );
    }

    if (payments.length === 0) {
        return (
            <div className="text-center py-12">
                <CreditCard className="mx-auto h-12 w-12 text-gray-300" />
                <h3 className="mt-4 text-lg font-semibold text-gray-600">No payment history</h3>
                <p className="mt-1 text-sm text-gray-400">You haven&apos;t made any payments yet.</p>
            </div>
        );
    }

    return (
        <div className="overflow-x-auto">
            <table className="w-full text-sm">
                <thead className="bg-gray-50">
                    <tr>
                        <th className="px-4 py-3 text-left font-medium text-gray-600">Transaction ID</th>
                        <th className="px-4 py-3 text-left font-medium text-gray-600">Service</th>
                        <th className="px-4 py-3 text-left font-medium text-gray-600">Amount</th>
                        <th className="px-4 py-3 text-left font-medium text-gray-600">Status</th>
                        <th className="px-4 py-3 text-left font-medium text-gray-600">Date</th>
                    </tr>
                </thead>
                <tbody>
                    {payments.map((payment) => {
                        const status = statusConfig[payment.status] || statusConfig.PENDING;
                        return (
                            <tr key={payment.id} className="border-t hover:bg-gray-50 transition-colors">
                                <td className="px-4 py-3 font-mono text-xs text-gray-600">
                                    {payment.transactionId || payment.id.slice(0, 8)}
                                </td>
                                <td className="px-4 py-3 text-gray-700">
                                    {payment.booking?.service?.title || "N/A"}
                                </td>
                                <td className="px-4 py-3 font-semibold text-primary">
                                    ${payment.amount}
                                </td>
                                <td className="px-4 py-3">
                                    <span className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-medium ${status.color}`}>
                                        {status.icon}
                                        {status.label}
                                    </span>
                                </td>
                                <td className="px-4 py-3 text-gray-500">
                                    {new Date(payment.createdAt).toLocaleDateString()}
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
}
