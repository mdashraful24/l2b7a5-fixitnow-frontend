import { getSingleBooking } from "../../../../../_actions/getBookings";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, FileText, } from "lucide-react";

export default async function InvoicePage({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const { id } = await params;

    const response = await getSingleBooking(id);

    if (!response.success || !response.data) {
        notFound();
    }

    const booking = response.data;
    const payment = booking.payment;

    if (!payment) {
        return (
            <div className="space-y-4">
                <Link
                    href={`/dashboard/customer/bookings/${id}`}
                    className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary"
                >
                    <ArrowLeft className="h-4 w-4" />
                    Back to Booking
                </Link>

                <div className="rounded-xl border bg-card p-8 text-center">
                    <FileText className="mx-auto h-12 w-12 text-muted-foreground" />
                    <h2 className="mt-4 text-xl font-semibold">
                        Invoice Not Available
                    </h2>
                    <p className="mt-2 text-muted-foreground">
                        Payment is not completed yet.
                    </p>
                </div>
            </div>
        );
    }


    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <Link
                        href={`/dashboard/customer/bookings/${id}`}
                        className="mb-2 inline-flex items-center gap-2 text-sm text-gray-600 hover:text-primary"
                    >
                        <ArrowLeft className="h-4 w-4" />
                        Back to Booking
                    </Link>
                    <h1 className="text-2xl font-bold">
                        Invoice
                    </h1>
                </div>
            </div>

            {/* Invoice Card */}
            <div className="rounded-xl border bg-card p-8 shadow-sm">
                {/* Company */}
                <div className="flex justify-between border-b pb-6">
                    <div>
                        <h2 className="text-2xl font-bold text-primary dark:text-blue-500">
                            FixItNow
                        </h2>
                        <p className="text-sm text-muted-foreground">
                            Home Service Marketplace
                        </p>
                    </div>
                    <div className="text-right">
                        <p className="text-sm text-muted-foreground">
                            Invoice Date
                        </p>
                        <p className="font-medium">
                            {new Date(
                                payment.paidAt
                            ).toLocaleDateString()}
                        </p>
                    </div>
                </div>

                {/* Customer */}
                <div className="mt-6 grid gap-6 md:grid-cols-2">
                    <div>
                        <p className="text-sm text-muted-foreground">
                            Customer
                        </p>
                        <p className="font-semibold">
                            {booking.customer?.name}
                        </p>
                        <p className="text-sm">
                            {booking.customer?.email}
                        </p>
                    </div>

                    <div>
                        <p className="text-sm text-muted-foreground">
                            Technician
                        </p>
                        <p className="font-semibold">
                            {booking.technician?.user?.name}
                        </p>
                        <p className="text-sm">
                            {booking.technician?.location}
                        </p>
                    </div>
                </div>

                {/* Service */}
                <div className="mt-8 border-t pt-6">
                    <h3 className="font-semibold">
                        Service Details
                    </h3>
                    <div className="mt-4 space-y-3">
                        <div className="flex justify-between">
                            <span>
                                Service
                            </span>
                            <span className="font-medium">
                                {booking.service?.title}
                            </span>
                        </div>
                        <div className="flex justify-between">
                            <span>
                                Duration
                            </span>
                            <span>
                                {booking.service?.duration} minutes
                            </span>
                        </div>
                        <div className="flex justify-between">
                            <span>
                                Booking Date
                            </span>
                            <span>
                                {new Date(
                                    booking.scheduledAt
                                ).toLocaleString()}
                            </span>
                        </div>
                    </div>
                </div>

                {/* Payment */}
                <div className="mt-8 border-t pt-6">
                    <h3 className="font-semibold">
                        Payment Information
                    </h3>
                    <div className="mt-4 space-y-3">
                        <div className="flex justify-between">
                            <span>
                                Amount
                            </span>
                            <span className="text-xl font-bold text-primary">
                                ${payment.amount}
                            </span>
                        </div>
                        <div className="flex justify-between">
                            <span>
                                Payment Status
                            </span>
                            <span className="font-medium text-green-600">
                                {payment.status}
                            </span>
                        </div>
                        <div className="flex justify-between">
                            <span>
                                Provider
                            </span>
                            <span>
                                {payment.provider}
                            </span>
                        </div>
                        <div className="flex justify-between">
                            <span>
                                Transaction ID
                            </span>
                            <span className="font-mono text-sm">
                                {payment.transactionId}
                            </span>
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <div className="mt-8 border-t pt-6 text-center text-sm text-muted-foreground">
                    Thank you for choosing FixItNow.
                </div>
            </div>
        </div>
    );
}
