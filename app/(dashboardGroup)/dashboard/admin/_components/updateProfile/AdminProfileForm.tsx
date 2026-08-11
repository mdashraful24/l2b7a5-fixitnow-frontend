"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import {
    Shield,
    User,
    Mail,
    Phone,
    MapPin,
    Lock,
} from "lucide-react";
import { IUpdateMe } from "@/lib/type";
import { updateMe } from "@/app/(dashboardGroup)/_actions/updateMe";

type AdminProfileFormProps = {
    initialValues: IUpdateMe;
};

export function AdminProfileForm({
    initialValues,
}: AdminProfileFormProps) {
    const router = useRouter();

    const [formState, setFormState] =
        useState<IUpdateMe>(initialValues);

    const [fieldErrors, setFieldErrors] =
        useState<Record<string, string>>({});

    const [isSaving, setIsSaving] = useState(false);

    const handleChange = (
        name: keyof IUpdateMe,
        value: string
    ) => {
        setFormState((current) => ({
            ...current,
            [name]: value,
        }));
    };

    const handleSubmit = async (
        event: React.FormEvent<HTMLFormElement>
    ) => {
        event.preventDefault();

        setIsSaving(true);
        setFieldErrors({});

        try {
            const result = await updateMe(formState);

            if (result.success) {
                toast.success(
                    result.message || "Profile updated successfully"
                );

                router.push("/profile");

                return;
            }

            if (result.fieldErrors) {
                setFieldErrors(result.fieldErrors);
            }

            toast.error(
                result.message || "Unable to update profile"
            );
        } catch (error) {
            console.error("Update profile error:", error);

            toast.error(
                "Something went wrong. Please try again."
            );
        } finally {
            setIsSaving(false);
        }
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="space-y-6"
        >
            {/* Admin Badge */}
            <div className="flex items-center gap-2 rounded-lg border border-primary/20 bg-primary/5 p-3">
                <Shield className="h-5 w-5 text-primary" />

                <span className="text-sm font-medium text-foreground">
                    Administrator Account
                </span>

                <span className="ml-auto text-xs font-semibold text-foreground">
                    ADMIN
                </span>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
                <Field
                    label="Full Name"
                    error={fieldErrors.name}
                    icon={
                        <User className="h-4 w-4" />
                    }
                >
                    <input
                        value={formState.name ?? ""}
                        onChange={(event) =>
                            handleChange(
                                "name",
                                event.target.value
                            )
                        }
                        className="w-full rounded-lg border border-input bg-background px-4 py-3 pl-10 text-foreground outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
                        placeholder="Admin Name"
                    />
                </Field>

                <Field
                    label="Email"
                    error={fieldErrors.email}
                    icon={
                        <Mail className="h-4 w-4" />
                    }
                >
                    <input
                        type="email"
                        value={formState.email ?? ""}
                        onChange={(event) =>
                            handleChange(
                                "email",
                                event.target.value
                            )
                        }
                        className="w-full rounded-lg border border-input bg-background px-4 py-3 pl-10 text-foreground outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
                        placeholder="admin@example.com"
                    />
                </Field>

                <Field
                    label="Password"
                    error={fieldErrors.password}
                    hint="Leave blank to keep current password"
                    icon={
                        <Lock className="h-4 w-4" />
                    }
                >
                    <input
                        type="password"
                        value={formState.password ?? ""}
                        onChange={(event) =>
                            handleChange(
                                "password",
                                event.target.value
                            )
                        }
                        placeholder="Enter new password"
                        className="w-full rounded-lg border border-input bg-background px-4 py-3 pl-10 text-foreground outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
                    />
                </Field>

                <Field
                    label="Phone Number"
                    error={fieldErrors.phone}
                    icon={
                        <Phone className="h-4 w-4" />
                    }
                >
                    <input
                        type="tel"
                        value={formState.phone ?? ""}
                        onChange={(event) =>
                            handleChange(
                                "phone",
                                event.target.value
                            )
                        }
                        className="w-full rounded-lg border border-input bg-background px-4 py-3 pl-10 text-foreground outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
                        placeholder="+880 1XXX-XXXXXX"
                    />
                </Field>

                <Field
                    label="Address"
                    error={fieldErrors.address}
                    className="md:col-span-2"
                    icon={
                        <MapPin className="h-4 w-4" />
                    }
                >
                    <textarea
                        value={formState.address ?? ""}
                        onChange={(event) =>
                            handleChange(
                                "address",
                                event.target.value
                            )
                        }
                        rows={3}
                        className="w-full rounded-lg border border-input bg-background px-4 py-3 pl-10 text-foreground outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
                        placeholder="123 Admin St, City, Country"
                    />
                </Field>
            </div>

            <div className="flex items-center justify-end gap-3 border-t border-border pt-4">
                <button
                    type="button"
                    onClick={() =>
                        setFormState({
                            ...initialValues,
                            password: "",
                        })
                    }
                    disabled={isSaving}
                    className="cursor-pointer rounded-lg border border-input bg-background px-4 py-2.5 text-sm font-semibold text-foreground transition hover:bg-muted/50 disabled:cursor-not-allowed disabled:opacity-60"
                >
                    Reset
                </button>

                <button
                    type="submit"
                    disabled={isSaving}
                    className="cursor-pointer rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-60"
                >
                    {isSaving
                        ? "Saving..."
                        : "Save changes"}
                </button>
            </div>
        </form>
    );
}

function Field({
    label,
    error,
    hint,
    className,
    icon,
    children,
}: {
    label: string;
    error?: string;
    hint?: string;
    className?: string;
    icon?: React.ReactNode;
    children: React.ReactNode;
}) {
    return (
        <div className={className}>
            <label className="block space-y-2">
                <div className="flex items-center justify-between gap-3">
                    <span className="text-sm font-medium text-foreground">
                        {label}
                    </span>

                    {hint && (
                        <span className="text-xs text-muted-foreground">
                            {hint}
                        </span>
                    )}
                </div>

                <div className="relative">
                    {icon && (
                        <div className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                            {icon}
                        </div>
                    )}

                    {children}
                </div>

                {error && (
                    <p className="mt-1 text-xs text-destructive">
                        {error}
                    </p>
                )}
            </label>
        </div>
    );
}
