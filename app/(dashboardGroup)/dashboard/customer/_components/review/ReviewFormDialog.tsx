/* eslint-disable react-hooks/set-state-in-effect */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Star, PencilIcon, PlusIcon, Loader2 } from "lucide-react";
import { useActionState, useEffect, useState } from "react";
import { toast } from "sonner";
import { IBooking, IReview } from "@/lib/type";
import { createReview, updateReview } from "@/app/(dashboardGroup)/_actions/customer";

type ReviewFormDialogProps = {
    mode: "create" | "edit";
    booking: IBooking;
    review?: IReview | null;
    onSuccess?: () => void;
};

export function ReviewFormDialog({ mode, booking, review, onSuccess }: ReviewFormDialogProps) {
    const [open, setOpen] = useState(false);
    const [rating, setRating] = useState(review?.rating || 0);
    const [hoverRating, setHoverRating] = useState(0);
    const [comment, setComment] = useState(review?.comment || "");

    // Reset form when dialog opens
    useEffect(() => {
        if (open) {
            setRating(review?.rating || 0);
            setComment(review?.comment || "");
        }
    }, [open, review]);

    // Get the appropriate action with binding
    const action = mode === "edit" && review
        ? updateReview.bind(null, review.id)
        : createReview;

    const [state, formAction, pending] = useActionState(action, null) as any;

    // Handle action response
    useEffect(() => {
        if (!state) return;

        if (state.success) {
            toast.success(
                state.message || (mode === "edit" ? "Review updated successfully" : "Review submitted successfully")
            );
            setOpen(false);
            if (onSuccess) {
                onSuccess();
            }
        } else {
            toast.error(state.message || "Something went wrong");
        }
    }, [state, mode, onSuccess]);

    // Only show for COMPLETED bookings
    if (booking.status !== "COMPLETED") {
        return null;
    }

    // If edit mode and no review exists, don't show edit button
    if (mode === "edit" && !review) {
        return null;
    }

    // If create mode and review already exists, don't show create button
    if (mode === "create" && review) {
        return null;
    }

    const handleRatingClick = (value: number) => {
        setRating(value);
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                {mode === "edit" ? (
                    <button className="flex items-center gap-1 rounded-lg border border-blue-400 bg-blue-50 px-3 py-1.5 text-sm font-semibold text-blue-700 transition hover:bg-blue-100 cursor-pointer">
                        <PencilIcon className="h-4 w-4" />
                        Edit Review
                    </button>
                ) : (
                    <button className="flex items-center gap-1 rounded-lg border border-yellow-400 bg-yellow-50 px-3 py-1.5 text-sm font-semibold text-yellow-700 transition hover:bg-yellow-100 cursor-pointer">
                        <PlusIcon className="h-4 w-4" />
                        Leave Review
                    </button>
                )}
            </DialogTrigger>
            <DialogContent className="max-w-md">
                <DialogHeader>
                    <DialogTitle>
                        {mode === "edit" ? "Edit Your Review" : "Leave a Review"}
                    </DialogTitle>
                    <DialogDescription className="text-gray-700">
                        {mode === "edit"
                            ? "Update your rating and feedback for this service."
                            : `How was your experience with ${booking.technician?.user?.name || "the technician"}?`}
                    </DialogDescription>
                </DialogHeader>

                <form action={formAction} className="space-y-6 py-4">
                    {/* Hidden fields */}
                    <input type="hidden" name="bookingId" value={booking.id} />
                    <input type="hidden" name="rating" value={rating} />

                    {/* Rating Stars */}
                    <div className="space-y-2">
                        <Label>Rating <span className="text-red-500">*</span></Label>
                        <div className="flex gap-1.5">
                            {[1, 2, 3, 4, 5].map((star) => {
                                const isFilled = (hoverRating || rating) >= star;
                                return (
                                    <button
                                        key={star}
                                        type="button"
                                        onMouseEnter={() => setHoverRating(star)}
                                        onMouseLeave={() => setHoverRating(0)}
                                        onClick={() => handleRatingClick(star)}
                                        className="focus:outline-none transition-transform hover:scale-110"
                                        disabled={pending}
                                    >
                                        <Star
                                            className={`h-6 w-6 ${isFilled
                                                    ? "fill-yellow-400 text-yellow-400"
                                                    : "fill-gray-300 text-gray-300"
                                                } transition-colors`}
                                        />
                                    </button>
                                );
                            })}
                        </div>
                        <p className="text-sm text-gray-700">
                            {rating > 0 ? `${rating} out of 5 stars` : "Select a rating"}
                        </p>
                        {state?.fieldErrors?.rating && (
                            <p className="text-sm text-red-500">{state.fieldErrors.rating}</p>
                        )}
                    </div>

                    {/* Comment */}
                    <div className="space-y-2">
                        <Label htmlFor="comment">Comment <span className="text-gray-600 text-xs">(optional)</span></Label>
                        <Textarea
                            id="comment"
                            name="comment"
                            placeholder="Share your experience with this service..."
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                            rows={4}
                            disabled={pending}
                            className="resize-none"
                        />
                        {state?.fieldErrors?.comment && (
                            <p className="text-sm text-red-500">{state.fieldErrors.comment}</p>
                        )}
                        <p className="text-xs text-gray-700">
                            {comment.length}/500 characters
                        </p>
                    </div>

                    {/* Technician Info */}
                    <div className="rounded-lg bg-gray-50 p-3 text-sm">
                        <p className="text-gray-700">
                            <span className="font-medium">Technician:</span> {booking.technician?.user?.name}
                        </p>
                        <p className="text-gray-700">
                            <span className="font-medium">Service:</span> {booking.service?.title}
                        </p>
                    </div>

                    <div className="flex gap-3 pt-2">
                        <Button
                            type="button"
                            variant="outline"
                            onClick={() => setOpen(false)}
                            disabled={pending}
                            className="flex-1"
                        >
                            Cancel
                        </Button>
                        <Button
                            type="submit"
                            disabled={pending || rating === 0}
                            className="flex-1 bg-yellow-500 hover:bg-yellow-600 text-white"
                        >
                            {pending ? (
                                <>
                                    <Loader2 className="h-4 w-4 animate-spin mr-2" />
                                    {mode === "edit" ? "Updating..." : "Submitting..."}
                                </>
                            ) : (
                                <>
                                    <Star className="h-4 w-4 mr-2 fill-white" />
                                    {mode === "edit" ? "Update Review" : "Submit Review"}
                                </>
                            )}
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
}