/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
    User,
    Mail,
    CalendarDays,
    MessageSquare,
    Reply,
    CheckCircle2,
    Clock3,
    X,
} from "lucide-react";

interface ContactDetailModalProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    contact: any;
    onRefresh?: () => void;
}

const ContactDetailModal = ({
    open,
    onOpenChange,
    contact,
}: ContactDetailModalProps) => {
    if (!contact) return null;

    const formatDate = (date?: string) => {
        if (!date) return "N/A";

        return new Date(date).toLocaleString("en-US", {
            dateStyle: "medium",
            timeStyle: "short",
        });
    };

    const hasReply =
        typeof contact.reply === "string" &&
        contact.reply.trim().length > 0;

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-4xl overflow-hidden p-0 sm:w-full">
                {/* Header */}
                <DialogHeader className="border-b bg-muted/20 px-5 py-3">
                    <div className="flex min-w-0 items-center gap-3">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-100 text-blue-600 dark:bg-blue-950/50 dark:text-blue-400">
                            <MessageSquare className="h-5 w-5" />
                        </div>
                        <div className="min-w-0">
                            <DialogTitle className="text-xl font-bold">Contact Details</DialogTitle>
                        </div>
                    </div>
                </DialogHeader>

                {/* Content */}
                <div className="max-h-[calc(90vh-150px)] overflow-y-auto">
                    <div className="space-y-6 px-5 pb-6">
                        {/* Customer information */}
                        <div className="rounded-2xl border bg-card p-4">
                            <div className="flex flex-col gap-4">
                                <div className="flex items-center gap-3">
                                    <div className="flex h-11 w-11 items-center justify-center rounded-full bg-primary/10 text-primary">
                                        <User className="h-5 w-5" />
                                    </div>

                                    <div className="min-w-0 space-y-1">
                                        <p className="font-semibold">
                                            {contact.name || "Unknown User"}
                                        </p>

                                        <a
                                            href={`mailto:${ contact.email } `}
                                            className="flex items-center gap-1.5 truncate text-sm text-foreground/80 transition-colors hover:text-blue-500 hover:underline"
                                        >
                                            <Mail className="h-3.5 w-3.5 shrink-0" />
                                            {contact.email}
                                        </a>
                                    </div>
                                </div>

                                <div className="w-fit rounded-lg bg-muted/50 px-3 py-2 text-xs text-foreground/80">
                                    <span className="font-medium text-foreground">
                                        Submitted
                                    </span>{" "}
                                    {formatDate(contact.createdAt)}
                                </div>
                            </div>
                        </div>

                        {/* Subject */}
                        {contact.subject && (
                            <div>
                                <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-foreground/80">
                                    Subject
                                </p>

                                <div className="rounded-xl border bg-muted/30 px-4 py-3">
                                    <p className="font-medium">
                                        {contact.subject}
                                    </p>
                                </div>
                            </div>
                        )}

                        {/* Conversation */}
                        <div>
                            <div className="mb-4 flex items-center gap-2">
                                <div className="h-px flex-1 bg-border" />
                                <span className="px-2 text-xs font-semibold uppercase tracking-wider text-foreground/80">
                                    Conversation
                                </span>
                                <div className="h-px flex-1 bg-border" />
                            </div>

                            <div className="space-y-5">
                                {/* Customer Message */}
                                <div className="flex items-start gap-3">
                                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-blue-100 text-blue-600 dark:bg-blue-950/50 dark:text-blue-400">
                                        <User className="h-4 w-4" />
                                    </div>

                                    <div className="min-w-0 flex-1">
                                        <div className="mb-1.5 flex flex-wrap items-center gap-x-2 gap-y-1">
                                            <span className="text-sm font-semibold">
                                                {contact.name}
                                            </span>

                                            <span className="text-xs text-foreground/70">
                                                {formatDate(contact.createdAt)}
                                            </span>
                                        </div>

                                        <div className="rounded-2xl rounded-tl-md border bg-muted/40 px-4 py-3.5">
                                            <p className="whitespace-pre-wrap text-sm leading-6 text-foreground">
                                                {contact.message}
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                {/* Admin Reply */}
                                {hasReply ? (
                                    <div className="flex items-start gap-3">
                                        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-green-100 text-green-600 dark:bg-green-950/50 dark:text-green-400">
                                            <Reply className="h-4 w-4" />
                                        </div>

                                        <div className="min-w-0 flex-1">
                                            <div className="mb-1.5 flex flex-wrap items-center gap-x-2 gap-y-1">
                                                <span className="text-sm font-semibold">
                                                    {contact.repliedBy?.name ||
                                                        "Support Team"}
                                                </span>

                                                <Badge
                                                    variant="outline"
                                                    className="h-5 border-green-200 bg-green-50 px-1.5 text-[10px] text-green-700 dark:border-green-900 dark:bg-green-950/40 dark:text-green-400"
                                                >
                                                    Admin
                                                </Badge>

                                                <span className="text-xs text-foreground/70">
                                                    {formatDate(
                                                        contact.repliedAt
                                                    )}
                                                </span>
                                            </div>

                                            <div className="rounded-2xl rounded-tl-md border border-green-200 bg-green-50/70 px-4 py-3.5 dark:border-green-900/50 dark:bg-green-950/20">
                                                <p className="whitespace-pre-wrap text-sm leading-6 text-foreground">
                                                    {contact.reply}
                                                </p>
                                            </div>

                                            {contact.repliedBy?.email && (
                                                <p className="mt-2 text-xs text-muted-foreground">
                                                    Reply sent by{" "}
                                                    <span className="font-medium">
                                                        {
                                                            contact.repliedBy
                                                                .email
                                                        }
                                                    </span>
                                                </p>
                                            )}
                                        </div>
                                    </div>
                                ) : (
                                    /* Pending Reply */
                                    <div className="rounded-2xl border border-dashed border-yellow-300 bg-yellow-50/60 p-5 dark:border-yellow-900/60 dark:bg-yellow-950/10">
                                        <div className="flex items-start gap-3">
                                            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-yellow-100 text-yellow-600 dark:bg-yellow-950/50 dark:text-yellow-400">
                                                <Clock3 className="h-4 w-4" />
                                            </div>

                                            <div>
                                                <p className="font-semibold text-yellow-800 dark:text-yellow-400">
                                                    Awaiting response
                                                </p>

                                                <p className="mt-1 text-sm leading-5 text-foreground/80">
                                                    This message has not been
                                                    replied to yet. The support
                                                    team can respond to the
                                                    customer from the contact
                                                    management panel.
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Footer */}
                {/* <DialogFooter className="border-t bg-muted/20 px-5 py-3">
                    <Button
                        variant="outline"
                        onClick={() => onOpenChange(false)}
                        className="w-full sm:w-auto"
                    >
                        <X className="mr-2 h-4 w-4" />
                        Close
                    </Button>
                </DialogFooter> */}
            </DialogContent>
        </Dialog>
    );
};

export default ContactDetailModal;