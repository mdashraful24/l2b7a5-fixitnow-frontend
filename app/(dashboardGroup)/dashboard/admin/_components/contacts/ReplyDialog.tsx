/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Loader2, Send } from "lucide-react";
import { replyContact } from "@/app/(publicGroup)/_actions/contact";
import { IContact } from "@/lib/type";

interface ReplyDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    contact: IContact | null;
    onReplySuccess?: () => void;
}

const ReplyDialog = ({
    open,
    onOpenChange,
    contact,
    onReplySuccess
}: ReplyDialogProps) => {
    const [reply, setReply] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!reply.trim()) {
            toast.error("Please enter a reply");
            return;
        }

        if (!contact?.id) {
            toast.error("Contact not found");
            return;
        }

        setIsSubmitting(true);

        try {
            const result = await replyContact(contact.id, { reply: reply.trim() });

            if (result.success) {
                toast.success("Reply sent successfully!");
                setReply("");
                onOpenChange(false);
                if (onReplySuccess) {
                    onReplySuccess();
                }
            } else {
                toast.error(result.message || "Failed to send reply");
            }
        } catch (error) {
            toast.error("Something went wrong");
            console.error(error);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-137.5">
                <DialogHeader>
                    <DialogTitle>Reply to {contact?.name}</DialogTitle>
                    <div className="text-sm text-foreground/80">
                        Replying to: {contact?.subject || "No subject"}
                    </div>
                </DialogHeader>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="reply">Your Reply <span className="text-red-500">*</span></Label>
                        <Textarea
                            id="reply"
                            value={reply}
                            onChange={(e) => setReply(e.target.value)}
                            placeholder="Type your reply here..."
                            rows={6}
                            disabled={isSubmitting}
                            className="resize-none"
                            required
                        />
                    </div>

                    {/* Show original message for context */}
                    {contact?.message && (
                        <div className="bg-slate-50 dark:bg-slate-800 p-4 rounded-lg space-y-1">
                            <Label className="text-sm text-foreground/80">Original Message:</Label>
                            <p className="text-sm text-foreground whitespace-pre-wrap">
                                {contact.message}
                            </p>
                        </div>
                    )}

                    <DialogFooter>
                        <Button
                            type="button"
                            variant="outline"
                            onClick={() => onOpenChange(false)}
                            disabled={isSubmitting}
                        >
                            Cancel
                        </Button>
                        <Button
                            type="submit"
                            disabled={isSubmitting || !reply.trim()}
                            className="bg-blue-600 hover:bg-blue-700"
                        >
                            {isSubmitting ? (
                                <>
                                    <Loader2 className="h-4 w-4 animate-spin mr-2" />
                                    Sending...
                                </>
                            ) : (
                                <>
                                    Send Reply
                                    <Send className="h-4 w-4 ml-2" />
                                </>
                            )}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
};

export default ReplyDialog;
