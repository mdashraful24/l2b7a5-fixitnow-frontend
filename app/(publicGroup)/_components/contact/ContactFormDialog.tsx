/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, useEffect, useActionState } from "react";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import {
    Send,
    MessageSquare,
    User,
    Mail,
    Loader2,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { createContact } from "../../_actions/contact";

// Define the state type for useActionState
type FormState = {
    success: boolean;
    message: string;
    data?: any;
    error?: string;
} | null;

interface ContactFormDialogProps {
    trigger?: React.ReactNode;
    open?: boolean;
    onOpenChange?: (open: boolean) => void;
    className?: string;
    defaultOpen?: boolean;
}

const ContactFormDialog = ({
    trigger,
    open: controlledOpen,
    onOpenChange: controlledOnOpenChange,
    className,
    defaultOpen = false
}: ContactFormDialogProps) => {
    const [open, setOpen] = useState(defaultOpen);

    const initialState: FormState = null;
    const [formState, formAction, isPending] = useActionState(
        createContact,
        initialState
    );

    // Use controlled or uncontrolled state
    const isControlled = controlledOpen !== undefined;
    const isOpen = isControlled ? controlledOpen : open;
    const setIsOpen = isControlled ? controlledOnOpenChange : setOpen;

    useEffect(() => {
        if (formState?.success) {
            // Show success toast
            toast.success("Message Sent!", {
                description: formState.message || "Thank you! We'll get back to you within 24 hours.",
                // duration: 5000,
                icon: "✅",
            });

            // Close dialog after success
            setTimeout(() => {
                if (isControlled && controlledOnOpenChange) {
                    controlledOnOpenChange(false);
                } else {
                    setOpen(false);
                }
            }, 1500);

        } else if (formState?.success === false) {
            // Show error toast
            toast.error("Failed to Send", {
                description: formState.message || "Something went wrong. Please try again.",
                // duration: 5000,
                icon: "❌",
            });
        }
    }, [formState, isControlled, controlledOnOpenChange]);

    // Reset form state when dialog closes
    const handleOpenChange = (newOpen: boolean) => {
        if (setIsOpen) {
            setIsOpen(newOpen);
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={handleOpenChange}>
            {trigger && (
                <DialogTrigger asChild>
                    {trigger}
                </DialogTrigger>
            )}
            <DialogContent className={cn("sm:max-w-125 max-h-[90vh] overflow-y-auto", className)}>
                <DialogHeader>
                    <DialogTitle className="text-2xl font-bold">
                        Send Us a Message
                    </DialogTitle>
                    <p className="text-foreground/80">
                        Fill in the form below and we&apos;ll get back to you within 24 hours.
                    </p>
                </DialogHeader>

                <form action={formAction} className="space-y-5 mt-2">
                    <div className="space-y-6">
                        <div className="space-y-2">
                            <Label htmlFor="name" className="flex items-center gap-2">
                                <User className="h-4 w-4 text-blue-600" />
                                Full Name <span className="text-red-500">*</span>
                            </Label>
                            <Input
                                id="name"
                                name="name"
                                type="text"
                                placeholder="John Doe"
                                // required
                                disabled={isPending}
                                className="bg-slate-50"
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="email" className="flex items-center gap-2">
                                <Mail className="h-4 w-4 text-blue-600" />
                                Email Address <span className="text-red-500">*</span>
                            </Label>
                            <Input
                                id="email"
                                name="email"
                                type="email"
                                placeholder="john@example.com"
                                // required
                                disabled={isPending}
                                className="bg-slate-50"
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="subject" className="flex items-center gap-2">
                                <MessageSquare className="h-4 w-4 text-blue-600" />
                                Subject
                            </Label>
                            <Input
                                id="subject"
                                name="subject"
                                type="text"
                                placeholder="What is this regarding?"
                                disabled={isPending}
                                className="bg-slate-50"
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="message" className="flex items-center gap-2">
                                <MessageSquare className="h-4 w-4 text-blue-600" />
                                Message <span className="text-red-500">*</span>
                            </Label>
                            <Textarea
                                id="message"
                                name="message"
                                placeholder="Tell us about your repair needs or any questions..."
                                // required
                                rows={4}
                                disabled={isPending}
                                className="bg-slate-50 resize-none"
                            />
                        </div>
                    </div>

                    <DialogFooter>
                        <Button
                            type="submit"
                            className="w-full"
                            disabled={isPending}
                        >
                            {isPending ? (
                                <>
                                    <Loader2 className="h-4 w-4 animate-spin mr-2" />
                                    Sending...
                                </>
                            ) : (
                                <>
                                    Send Message
                                    <Send className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
                                </>
                            )}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
};

export default ContactFormDialog;
