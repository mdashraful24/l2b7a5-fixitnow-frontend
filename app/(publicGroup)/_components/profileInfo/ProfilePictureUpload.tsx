/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import { uploadProfilePicture } from "@/app/(dashboardGroup)/_actions/updateMe";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Camera, Loader2, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { useActionState, useEffect, useRef, useState, type ChangeEvent } from "react";
import { toast } from "sonner";

type ProfilePictureUploadProps = {
    name: string;
    imageUrl?: string | null;
    isActive?: boolean;
};

export function ProfilePictureUpload({ name, imageUrl, isActive = true }: ProfilePictureUploadProps) {
    const router = useRouter();
    const inputRef = useRef<HTMLInputElement>(null);
    const [preview, setPreview] = useState<string | null>(imageUrl ?? null);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [state, formAction, pending] = useActionState(uploadProfilePicture, null);

    const initials = name
        ?.split(" ")
        .slice(0, 2)
        .map((word) => word[0])
        .join("")
        .toUpperCase();

    useEffect(() => {
        setPreview(imageUrl ?? null);
        setSelectedFile(null);
    }, [imageUrl]);

    useEffect(() => () => {
        if (preview?.startsWith("blob:")) {
            URL.revokeObjectURL(preview);
        }
    }, [preview]);

    useEffect(() => {
        if (!state) return;

        if (state.success) {
            toast.success(state.message || "Profile picture updated successfully");
            setSelectedFile(null);
            if (inputRef.current) {
                inputRef.current.value = "";
            }
            router.refresh();
        } else {
            toast.error(state.message || "Something went wrong");
        }
    }, [state, router]);

    const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0] ?? null;
        setSelectedFile(file);
        setPreview(file ? URL.createObjectURL(file) : imageUrl ?? null);
    };

    const cancelSelection = () => {
        setSelectedFile(null);
        setPreview(imageUrl ?? null);
        if (inputRef.current) {
            inputRef.current.value = "";
        }
    };

    return (
        <form action={formAction} className="relative shrink-0">
            <Avatar className="h-30 w-30 border-4 shadow-xl transition-all duration-300">
                {preview && <AvatarImage src={preview} alt={name} />}
                <AvatarFallback className="bg-primary text-3xl font-bold text-primary-foreground">
                    {initials}
                </AvatarFallback>
            </Avatar>

            {/* <span className={`absolute bottom-1 right-1 h-6 w-6 rounded-full border-4 border-background transition-colors duration-300 ${isActive ? "bg-green-500" : "bg-gray-400"}`} /> */}

            <input
                ref={inputRef}
                type="file"
                name="profilePicture"
                accept="image/*"
                className="hidden"
                onChange={handleFileChange}
            />

            <Button
                type="button"
                size="icon"
                variant="secondary"
                className="absolute bottom-3 right-3 h-8 w-8 rounded-full shadow-md"
                onClick={() => inputRef.current?.click()}
                aria-label="Change profile picture"
                title="Change profile picture"
                disabled={pending}
            >
                <Camera className="h-4 w-4" />
            </Button>

            {selectedFile && (
                <div className="absolute -bottom-10 left-1/2 flex -translate-x-1/2 gap-2">
                    <Button type="submit" size="sm" disabled={pending}>
                        {pending ? <Loader2 className="h-4 w-4 animate-spin" /> : "Save"}
                    </Button>
                    <Button
                        type="button"
                        size="icon"
                        variant="outline"
                        className="h-8 w-8"
                        onClick={cancelSelection}
                        disabled={pending}
                        aria-label="Cancel"
                    >
                        <X className="h-4 w-4" />
                    </Button>
                </div>
            )}
        </form>
    );
}
