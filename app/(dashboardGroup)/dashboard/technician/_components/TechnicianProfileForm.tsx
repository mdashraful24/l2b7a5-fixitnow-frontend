"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { updateTechnicianProfile, } from "@/app/(dashboardGroup)/_actions/technician";
import { UpdateTechnicianProfilePayload } from "@/lib/type";

type TechnicianProfileFormProps = {
    initialValues: UpdateTechnicianProfilePayload;
};

export function TechnicianProfileForm({ initialValues }: TechnicianProfileFormProps) {
    const router = useRouter();
    const [formState, setFormState] = useState(initialValues);
    const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
    const [isSaving, setIsSaving] = useState(false);
    const [confirmPassword, setConfirmPassword] = useState("");

    const handleChange = (name: keyof UpdateTechnicianProfilePayload, value: string) => {
        setFormState((current) => ({
            ...current,
            [name]: value,
        }));
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setIsSaving(true);
        setFieldErrors({});

        if (
            (formState.password || confirmPassword) &&
            formState.password !== confirmPassword
        ) {
            setFieldErrors({ confirmPassword: "Passwords do not match" });
            setIsSaving(false);
            toast.error("Passwords do not match");
            return;
        }

        const result = await updateTechnicianProfile({
            ...formState,
            skills: formState.skills,
        });

        setIsSaving(false);

        if (result.success) {
            toast.success(result.message || "Profile updated successfully");
            router.push("/dashboard/technician/profile");
            router.refresh();
            return;
        }

        if (result.fieldErrors) {
            setFieldErrors(result.fieldErrors);
        }

        toast.error(result.message || "Unable to update profile");
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid gap-4 md:grid-cols-2">
                <Field label="Name" error={fieldErrors.name} hint="Can't be changed">
                    <input
                        value={formState.name}
                        readOnly
                        className="w-full cursor-default rounded-lg border border-input bg-muted/50 px-4 py-3 text-foreground outline-none transition read-only:focus:ring-0"
                    />
                </Field>

                <Field label="Email" error={fieldErrors.email} hint="Can't be changed">
                    <input
                        type="email"
                        value={formState.email}
                        readOnly
                        className="w-full cursor-default rounded-lg border border-input bg-muted/50 px-4 py-3 text-foreground outline-none transition read-only:focus:ring-0"
                    />
                </Field>

                {/* Password && Confirm Password field - temporarily disabled
                <Field label="Password" error={fieldErrors.password}>
                    <input
                        type="password"
                        value={formState.password ?? ""}
                        onChange={(event) => handleChange("password", event.target.value)}
                        placeholder="Leave blank to keep current password"
                        className="w-full rounded-lg border border-input bg-background px-4 py-3 text-foreground outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
                    />
                </Field>

                <Field label="Confirm Password" error={fieldErrors.confirmPassword} hint="Re-enter new password">
                    <input
                        type="password"
                        value={confirmPassword}
                        onChange={(event) => setConfirmPassword(event.target.value)}
                        placeholder="Re-enter new password"
                        className="w-full rounded-lg border border-input bg-background px-4 py-3 text-foreground outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
                    />
                </Field>
                */}

                <Field label="Phone" error={fieldErrors.phone}>
                    <input
                        value={formState.phone ?? ""}
                        onChange={(event) => handleChange("phone", event.target.value)}
                        className="w-full rounded-lg border border-input bg-background px-4 py-3 text-foreground outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
                    />
                </Field>

                <Field label="Location" error={fieldErrors.location}>
                    <input
                        value={formState.location ?? ""}
                        onChange={(event) => handleChange("location", event.target.value)}
                        className="w-full rounded-lg border border-input bg-background px-4 py-3 text-foreground outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
                    />
                </Field>

                <Field label="Address" error={fieldErrors.address}>
                    <input
                        value={formState.address ?? ""}
                        onChange={(event) => handleChange("address", event.target.value)}
                        className="w-full rounded-lg border border-input bg-background px-4 py-3 text-foreground outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
                    />
                </Field>
            </div>

            <Field label="Bio" error={fieldErrors.bio}>
                <textarea
                    value={formState.bio ?? ""}
                    onChange={(event) => handleChange("bio", event.target.value)}
                    rows={4}
                    className="w-full rounded-lg border border-input bg-background px-4 py-3 text-foreground outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
                />
            </Field>

            <Field label="Description" error={fieldErrors.description}>
                <textarea
                    value={formState.description ?? ""}
                    onChange={(event) => handleChange("description", event.target.value)}
                    rows={4}
                    className="w-full rounded-lg border border-input bg-background px-4 py-3 text-foreground outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
                />
            </Field>

            <Field label="Skills" error={fieldErrors.skills} hint="Comma separated values, for example: plumbing, ac repair, electrical">
                <input
                    value={formState.skills?.join(", ") ?? ""}
                    onChange={(event) =>
                        setFormState((current) => ({
                            ...current,
                            skills: event.target.value
                                .split(",")
                                .map((skill) => skill.trim())
                                .filter(Boolean),
                        }))
                    }
                    className="w-full rounded-lg border border-input bg-background px-4 py-3 text-foreground outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
                />
            </Field>

            <div className="flex items-center justify-end gap-3">
                <button
                    type="button"
                    onClick={() => {
                        setFormState(initialValues);
                        setConfirmPassword("");
                    }}
                    className="rounded-lg border border-input bg-background px-4 py-2.5 text-sm font-semibold text-foreground hover:bg-muted/50 transition cursor-pointer"
                >
                    Reset
                </button>
                <button
                    type="submit"
                    disabled={isSaving}
                    className="rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground hover:bg-primary/90 disabled:opacity-60 transition cursor-pointer"
                >
                    {isSaving ? "Saving..." : "Save changes"}
                </button>
            </div>
        </form>
    );
}

function Field({
    label,
    error,
    hint,
    children,
}: {
    label: string;
    error?: string;
    hint?: string;
    children: React.ReactNode;
}) {
    return (
        <label className="block space-y-2">
            <div className="flex items-center justify-between gap-3">
                <span className="text-sm font-medium text-foreground">{label}</span>
                {hint && <span className="text-xs text-muted-foreground">{hint}</span>}
            </div>
            {children}
            {error && <p className="text-xs text-destructive">{error}</p>}
        </label>
    );
}
