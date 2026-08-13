/* eslint-disable react-hooks/immutability */
/* eslint-disable react-hooks/set-state-in-effect */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, useEffect, useActionState, useRef } from "react";
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
import { useRouter } from "next/navigation";

// Define the state type for useActionState
type FormState = {
    success: boolean;
    message: string;
    data?: any;
    error?: string;
} | null;

interface UserData {
    name: string;
    email: string;
    role?: string;
}

interface ContactFormDialogProps {
    trigger?: React.ReactNode;
    open?: boolean;
    onOpenChange?: (open: boolean) => void;
    className?: string;
    defaultOpen?: boolean;
    userData?: UserData | null;
}

const ContactFormDialog = ({
    trigger,
    open: controlledOpen,
    onOpenChange: controlledOnOpenChange,
    className,
    defaultOpen = false,
    userData = null
}: ContactFormDialogProps) => {
    const router = useRouter();
    const [open, setOpen] = useState(defaultOpen);
    const [formValues, setFormValues] = useState({
        name: userData?.name || "",
        email: userData?.email || "",
        subject: "",
        message: ""
    });

    const initialState: FormState = null;
    const [formState, formAction, isPending] = useActionState(
        createContact,
        initialState
    );

    // Use a ref to track if we've shown toast for this state
    const toastShownRef = useRef(false);
    // Use a ref to track if redirect has been executed
    const redirectExecutedRef = useRef(false);
    // Track if form was actually submitted
    const formSubmittedRef = useRef(false);

    // Use controlled or uncontrolled state
    const isControlled = controlledOpen !== undefined;
    const isOpen = isControlled ? controlledOpen : open;
    const setIsOpen = isControlled ? controlledOnOpenChange : setOpen;

    // Update form values when userData changes
    useEffect(() => {
        if (userData) {
            setFormValues(prev => ({
                ...prev,
                name: userData.name || prev.name,
                email: userData.email || prev.email
            }));
        }
    }, [userData]);

    // Handle form state changes
    useEffect(() => {
        // Only proceed if we haven't executed redirect yet AND form was actually submitted
        if (redirectExecutedRef.current || !formSubmittedRef.current) {
            return;
        }

        if (formState?.success) {
            toast.success("Message Sent!", {
                description: formState.message || "Thank you! We'll get back to you within 24 hours.",
                icon: "✅",
            });

            // Close dialog after success
            setTimeout(() => {
                if (isControlled && controlledOnOpenChange) {
                    controlledOnOpenChange(false);
                } else {
                    setOpen(false);
                }
                // Reset form after successful submission
                setFormValues({
                    name: userData?.name || "",
                    email: userData?.email || "",
                    subject: "",
                    message: ""
                });
                // Reset toast tracking
                toastShownRef.current = false;

                // Redirect based on user role
                if (userData?.role) {
                    // Mark redirect as executed
                    redirectExecutedRef.current = true;
                    formSubmittedRef.current = false; // Reset form submitted flag
                    redirectBasedOnRole(userData.role);
                }
            }, 1500);

        } else if (formState?.success === false && formState?.message) {
            // Show error toast
            toast.error("Failed to Send", {
                description: formState.message,
                icon: "❌",
            });
            // Reset toast tracking
            toastShownRef.current = false;
            // Reset form submitted flag on error so user can try again
            formSubmittedRef.current = false;
        }
    }, [formState, isControlled, controlledOnOpenChange, userData]);

    // Redirect function based on role
    const redirectBasedOnRole = (role: string) => {
        switch (role.toUpperCase()) {
            case 'ADMIN':
                router.push('/dashboard/admin/contacts');
                break;
            case 'TECHNICIAN':
                router.push('/dashboard/technician/contacts');
                break;
            case 'CUSTOMER':
                router.push('/dashboard/customer/contacts');
                break;
            default:
                // Default redirect for non-authenticated users
                router.push('/');
                break;
        }
    };

    const handleOpenChange = (newOpen: boolean) => {
        if (setIsOpen) {
            setIsOpen(newOpen);
        }
        // Reset form when dialog closes
        if (!newOpen) {
            setFormValues({
                name: userData?.name || "",
                email: userData?.email || "",
                subject: "",
                message: ""
            });
            // Reset toast tracking
            toastShownRef.current = false;
            // Reset redirect tracking when dialog closes
            redirectExecutedRef.current = false;
            // Reset form submitted flag
            formSubmittedRef.current = false;
        }
    };

    // Handle input changes
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormValues(prev => ({
            ...prev,
            [name]: value
        }));
    };

    // Handle form submission
    const handleSubmit = (formData: FormData) => {
        // Set form submitted flag to true
        formSubmittedRef.current = true;
        // Reset redirect tracking on new submission
        redirectExecutedRef.current = false;

        // Ensure we always include name and email from form values
        // even if fields are disabled
        if (userData) {
            formData.set('name', userData.name);
            formData.set('email', userData.email);
        } else {
            // Make sure we have values from the form
            const name = formData.get('name') as string || formValues.name;
            const email = formData.get('email') as string || formValues.email;
            formData.set('name', name);
            formData.set('email', email);
        }

        // Always include subject and message
        const subject = formData.get('subject') as string || formValues.subject;
        const message = formData.get('message') as string || formValues.message;
        formData.set('subject', subject);
        formData.set('message', message);

        formAction(formData);
    };

    // Check if form is valid
    const isFormValid = () => {
        const name = userData?.name || formValues.name;
        const email = userData?.email || formValues.email;
        const message = formValues.message;
        return name.trim() && email.trim() && message.trim();
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
                    {userData && (
                        <p className="text-sm text-green-600 mt-1">
                            ✓ You are logged in as {userData.name}
                        </p>
                    )}
                </DialogHeader>

                <form action={handleSubmit} className="space-y-5 mt-2">
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
                                value={formValues.name}
                                onChange={handleInputChange}
                                disabled={isPending || !!userData}
                                className={cn(
                                    "bg-slate-50",
                                    userData && "bg-slate-100 cursor-not-allowed"
                                )}
                                required
                            />
                            {userData && (
                                <p className="text-xs text-foreground/60">
                                    Name is pre-filled from your account
                                </p>
                            )}
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
                                value={formValues.email}
                                onChange={handleInputChange}
                                disabled={isPending || !!userData}
                                className={cn(
                                    "bg-slate-50",
                                    userData && "bg-slate-100 cursor-not-allowed"
                                )}
                                required
                            />
                            {userData && (
                                <p className="text-xs text-foreground/60">
                                    Email is pre-filled from your account
                                </p>
                            )}
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
                                value={formValues.subject}
                                onChange={handleInputChange}
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
                                value={formValues.message}
                                onChange={handleInputChange}
                                required
                                rows={4}
                                disabled={isPending}
                                className="bg-slate-50 resize-none"
                            />
                        </div>
                    </div>

                    <DialogFooter>
                        <Button
                            type="submit"
                            className="w-full cursor-pointer"
                            size={"lg"}
                            disabled={isPending || !isFormValid()}
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
