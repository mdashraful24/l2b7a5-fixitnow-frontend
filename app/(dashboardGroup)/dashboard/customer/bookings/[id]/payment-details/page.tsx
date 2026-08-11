import { getSingleBooking } from "../../../../../_actions/getBookings";
import { notFound } from "next/navigation";
import Link from "next/link";
import {
    ArrowLeft,
    CreditCard,
    Receipt,
    CalendarDays,
    CircleDollarSign,
    ShieldCheck,
    View,
} from "lucide-react";

export default async function PaymentDetailsPage({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const { id } = await params;

    const response = await getSingleBooking(id);

    if (!response.success || !response.data) {
        notFound();
    }

    const payment = response.data.payment;

    if (!payment) {
        return (
            <div className="space-y-4">
                <Link
                    href={`/dashboard/customer/bookings/${id}/pay`}
                    className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary"
                >
                    <ArrowLeft className="h-4 w-4" />
                    Back to Booking
                </Link>

                <div className="rounded-xl border bg-card p-8 text-center">
                    <CreditCard className="mx-auto mb-4 h-12 w-12 text-muted-foreground" />
                    <h2 className="text-xl font-semibold">
                        No Payment Found
                    </h2>
                    <p className="mt-2 text-muted-foreground">
                        This booking does not have any payment information yet.
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                    <Link
                        href={`/dashboard/customer/bookings/${id}/pay`}
                        className="mb-2 inline-flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 hover:text-primary"
                    >
                        <ArrowLeft className="h-4 w-4" />
                        Back to Booking
                    </Link>
                    <h1 className="text-2xl font-bold">
                        Payment Details
                    </h1>
                </div>
                <Link
                    href={`/dashboard/customer/bookings/${id}/invoice`}
                    className="inline-flex items-center gap-2 rounded-lg border border-border bg-card px-4 py-2 text-sm font-medium transition hover:bg-muted"
                >
                    <View className="h-4 w-4" />
                    View Invoice
                </Link>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
                {/* Payment Summary */}
                <div className="rounded-xl border bg-card p-6 shadow-sm">
                    <h2 className="mb-4 flex items-center gap-2 font-semibold">
                        <CircleDollarSign className="h-5 w-5" />
                        Payment Summary
                    </h2>

                    <div className="space-y-4">
                        <div className="space-y-1.5">
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                                Amount
                            </p>
                            <p className="text-3xl font-bold text-primary dark:text-blue-500">
                                ${payment.amount}
                            </p>
                        </div>
                        <div className="space-y-1.5">
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                                Status
                            </p>
                            <span className={`font-medium ${payment.status === "COMPLETED" ? "text-green-600" :
                                payment.status === "FAILED" ? "text-red-600" :
                                    "text-yellow-600"
                                }`}>
                                {payment.status === "COMPLETED" ? "PAID" : payment.status}
                            </span>
                        </div>
                        <div className="space-y-1.5">
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                                Provider
                            </p>
                            <p className="font-medium">
                                {payment.provider}
                            </p>
                        </div>
                        <div className="space-y-1.5">
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                                Currency
                            </p>
                            <p className="font-medium uppercase">
                                {payment.currency}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Transaction Details */}
                <div className="rounded-xl border bg-card p-6 shadow-sm">
                    <h2 className="mb-4 flex items-center gap-2 font-semibold">
                        <Receipt className="h-5 w-5" />
                        Transaction Details
                    </h2>
                    <div className="space-y-4 text-sm">
                        <div className="space-y-2">
                            <p className="text-gray-600 dark:text-gray-400">
                                Transaction ID
                            </p>
                            <p className="font-mono break-all">
                                {payment.transactionId}
                            </p>
                        </div>
                        {/* <div>
                            <p className="text-muted-foreground">
                                Payment Intent ID
                            </p>
                            <p className="font-mono break-all">
                                {payment.paymentIntentId}
                            </p>
                        </div> */}
                        <div className="space-y-2">
                            <p className="text-gray-600 dark:text-gray-400">
                                Session ID
                            </p>
                            <p className="font-mono break-all">
                                {payment.sessionId}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Dates */}
                <div className="rounded-xl border bg-card p-6 shadow-sm md:col-span-2">
                    <h2 className="mb-4 flex items-center gap-2 font-semibold">
                        <CalendarDays className="h-5 w-5" />
                        Payment Timeline
                    </h2>
                    <div className="grid gap-4 md:grid-cols-3">
                        <div>
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                                Paid At
                            </p>
                            <p>
                                {payment.paidAt
                                    ? new Date(
                                        payment.paidAt
                                    ).toLocaleString()
                                    : "N/A"}
                            </p>
                        </div>
                        <div>
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                                Created At
                            </p>
                            <p>
                                {new Date(
                                    payment.createdAt
                                ).toLocaleString()}
                            </p>
                        </div>
                        <div>
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                                Updated At
                            </p>
                            <p>
                                {new Date(
                                    payment.updatedAt
                                ).toLocaleString()}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Booking Reference */}
                <div className="rounded-xl border bg-card p-6 shadow-sm md:col-span-2">
                    <h2 className="mb-4 flex items-center gap-2 font-semibold">
                        <ShieldCheck className="h-5 w-5" />
                        Reference Information
                    </h2>
                    <div className="space-y-3 text-sm">
                        <div>
                            <p className="text-gray-600 dark:text-gray-400">
                                Booking ID
                            </p>
                            <p className="font-mono break-all">
                                {payment.bookingId}
                            </p>
                        </div>
                        <div>
                            <p className="text-gray-600 dark:text-gray-400">
                                Payment ID
                            </p>
                            <p className="font-mono break-all">
                                {payment.id}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
