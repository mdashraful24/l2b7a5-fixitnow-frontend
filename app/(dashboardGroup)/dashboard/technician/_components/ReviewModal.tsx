"use client";

import { useState } from "react";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Star, ThumbsUp, MessageCircle } from "lucide-react";
import { TechnicianBookingRecord } from "@/lib/type";

interface ReviewModalProps {
    bookings: TechnicianBookingRecord[];
    technicianName?: string;
}

export function ReviewModal({ bookings, technicianName }: ReviewModalProps) {
    const [open, setOpen] = useState(false);

    // Filter completed bookings with reviews
    const reviews = bookings
        .filter((booking) => booking.status === "COMPLETED" && booking.review)
        .map((booking) => ({
            ...booking.review!,
            customerName: booking.customer?.name || "Customer",
            serviceTitle: booking.service?.title || "Service",
            bookingId: booking.id,
        }));

    const totalReviews = reviews.length;
    const averageRating = totalReviews > 0
        ? reviews.reduce((acc, r) => acc + r.rating, 0) / totalReviews
        : 0;

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
        });
    };

    const renderStars = (rating: number) => {
        return (
            <div className="flex gap-0.5">
                {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                        key={star}
                        className={`h-4 w-4 ${star <= rating
                                ? "fill-yellow-400 text-yellow-400"
                                : "fill-gray-200 text-gray-200"
                            }`}
                    />
                ))}
            </div>
        );
    };

    return (
        <>
            <Button
                onClick={() => setOpen(true)}
                variant="outline"
                className="gap-2"
            >
                <Star className="h-4 w-4" />
                View Reviews ({totalReviews})
            </Button>

            <Dialog open={open} onOpenChange={setOpen}>
                <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
                    <DialogHeader>
                        <DialogTitle className="text-xl font-bold">
                            Reviews for {technicianName || "Technician"}
                        </DialogTitle>
                        <DialogDescription>
                            {totalReviews > 0 ? (
                                <div className="flex items-center gap-4 mt-1">
                                    <div className="flex items-center gap-2">
                                        <div className="flex items-center gap-1">
                                            {renderStars(Math.round(averageRating))}
                                        </div>
                                        <span className="font-semibold">
                                            {averageRating.toFixed(1)}
                                        </span>
                                    </div>
                                    <span className="text-sm text-gray-500">
                                        ({totalReviews} {totalReviews === 1 ? "review" : "reviews"})
                                    </span>
                                </div>
                            ) : (
                                "No reviews yet"
                            )}
                        </DialogDescription>
                    </DialogHeader>

                    <div className="space-y-4 mt-4">
                        {reviews.length === 0 ? (
                            <div className="text-center py-8">
                                <div className="flex justify-center mb-4">
                                    <div className="rounded-full bg-gray-100 p-4">
                                        <Star className="h-8 w-8 text-gray-400" />
                                    </div>
                                </div>
                                <p className="text-gray-600">No reviews yet</p>
                                <p className="text-sm text-gray-400 mt-1">
                                    Reviews will appear here once customers complete their feedback
                                </p>
                            </div>
                        ) : (
                            reviews.map((review, index) => (
                                <div
                                    key={review.id}
                                    className={`rounded-lg border p-4 ${index === 0 ? "border-yellow-200 bg-yellow-50" : "bg-white"
                                        }`}
                                >
                                    {index === 0 && (
                                        <div className="mb-2">
                                            <span className="inline-flex items-center gap-1 rounded-full bg-yellow-100 px-2 py-0.5 text-xs font-medium text-yellow-700">
                                                <ThumbsUp className="h-3 w-3" />
                                                Latest Review
                                            </span>
                                        </div>
                                    )}
                                    <div className="flex items-start justify-between">
                                        <div className="space-y-2 flex-1">
                                            <div className="flex items-center gap-2">
                                                {renderStars(review.rating)}
                                                <span className="text-sm font-medium">
                                                    {review.rating}/5
                                                </span>
                                            </div>
                                            {review.comment && (
                                                <div className="flex items-start gap-2">
                                                    <MessageCircle className="h-4 w-4 text-gray-400 mt-0.5" />
                                                    <p className="text-sm text-gray-700 italic">
                                                        {review.comment}
                                                    </p>
                                                </div>
                                            )}
                                            <div className="flex flex-wrap items-center gap-2 text-xs text-gray-400">
                                                <span>From: {review.customerName}</span>
                                                <span>•</span>
                                                <span>Service: {review.serviceTitle}</span>
                                                <span>•</span>
                                                <span>{formatDate(review.createdAt)}</span>
                                                {review.updatedAt && review.createdAt !== review.updatedAt && (
                                                    <>
                                                        <span>•</span>
                                                        <span>Updated: {formatDate(review.updatedAt)}</span>
                                                    </>
                                                )}
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-1 ml-4">
                                            {review.rating >= 4 && (
                                                <span className="flex items-center gap-1 bg-green-100 text-green-700 px-2 py-0.5 rounded-full text-xs whitespace-nowrap">
                                                    <ThumbsUp className="h-3 w-3" />
                                                    Satisfied
                                                </span>
                                            )}
                                            {review.rating <= 2 && (
                                                <span className="flex items-center gap-1 bg-red-100 text-red-700 px-2 py-0.5 rounded-full text-xs whitespace-nowrap">
                                                    Needs Improvement
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>

                    {reviews.length > 0 && (
                        <div className="border-t pt-4 mt-4">
                            <div className="flex items-center justify-between text-sm text-gray-500">
                                <div className="flex items-center gap-2">
                                    <ThumbsUp className="h-4 w-4 text-green-500" />
                                    <span>Satisfied: {reviews.filter(r => r.rating >= 4).length}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <span>Average rating: {averageRating.toFixed(1)}</span>
                                    <span>•</span>
                                    <span>{totalReviews} {totalReviews === 1 ? "review" : "reviews"}</span>
                                </div>
                            </div>
                        </div>
                    )}

                    <div className="flex justify-end mt-4">
                        <Button variant="outline" onClick={() => setOpen(false)}>
                            Close
                        </Button>
                    </div>
                </DialogContent>
            </Dialog>
        </>
    );
}
