/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/set-state-in-effect */
"use client"

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { PencilIcon, PlusIcon } from "lucide-react";
import Image from "next/image";
import { useActionState, useEffect, useState, type ChangeEvent } from "react";
import { toast } from "sonner";
import { ICategory, ITechService } from "@/lib/type";
import { createService, updatedService } from "@/app/(dashboardGroup)/_actions/technician";

type ServiceFormDialogProps = {
    mode: "create" | "edit";
    service?: ITechService;
    categories: ICategory[];
}

export function TechServiceFormDialog({ mode, service, categories }: ServiceFormDialogProps) {
    const [open, setOpen] = useState(false);
    const [selectedCategoryId, setSelectedCategoryId] = useState(service?.categoryId ?? service?.category?.id ?? "");
    const [imagePreview, setImagePreview] = useState<string | null>(service?.serviceImage ?? null);

    useEffect(() => {
        setSelectedCategoryId(service?.categoryId ?? service?.category?.id ?? "");
        setImagePreview(service?.serviceImage ?? null);
    }, [service, open]);

    useEffect(() => () => {
        if (imagePreview?.startsWith("blob:")) {
            URL.revokeObjectURL(imagePreview);
        }
    }, [imagePreview]);

    const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        setImagePreview(file ? URL.createObjectURL(file) : service?.serviceImage ?? null);
    };

    const action = mode === "edit" && service
        ? updatedService.bind(null, service.id)
        : createService;

    const [state, formAction, pending] = useActionState(action, null) as any;

    useEffect(() => {
        if (!state) return;

        if (state.success) {
            toast.success(state.message || (mode === "edit" ? "Service updated successfully" : "Service created successfully"));
            setOpen(false);
        } else {
            toast.error(state.message || "Something went wrong");
        }
    }, [state, mode]);

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                {
                    mode === "edit" ? (
                        <Button variant="outline" size="sm">
                            <PencilIcon data-icon="inline-start" />
                            Edit
                        </Button>
                    ) : (
                        <Button>
                            <PlusIcon data-icon="inline-start" />
                            Create Service
                        </Button>
                    )
                }
            </DialogTrigger>
            <DialogContent className="max-w-lg">
                <DialogHeader>
                    <DialogTitle className="text-foreground">
                        {mode === "edit" ? "Edit Service" : "Create Service"}
                    </DialogTitle>
                </DialogHeader>
                <form action={formAction} className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="title" className="text-foreground">Title</Label>
                        <Input id="title" name="title" defaultValue={service?.title} required />
                        {state?.fieldErrors?.title && (
                            <p className="text-sm text-destructive">{state.fieldErrors.title}</p>
                        )}
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="description" className="text-foreground">Description</Label>
                        <Textarea
                            id="description"
                            name="description"
                            defaultValue={service?.description}
                            required
                            className="min-h-24"
                        />
                        {state?.fieldErrors?.description && (
                            <p className="text-sm text-destructive">{state.fieldErrors.description}</p>
                        )}
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="serviceImage" className="text-foreground">Service Image</Label>
                        <Input
                            id="serviceImage"
                            name="serviceImage"
                            type="file"
                            accept="image/*"
                            onChange={handleImageChange}
                            className="cursor-pointer"
                        />
                        {state?.fieldErrors?.serviceImage && (
                            <p className="text-sm text-destructive">
                                {state.fieldErrors.serviceImage}
                            </p>
                        )}
                        {imagePreview && (
                            <div className="relative h-32 w-full overflow-hidden rounded-lg border border-border">
                                <Image
                                    src={imagePreview}
                                    alt="Service image preview"
                                    fill
                                    unoptimized
                                    className="object-cover"
                                />
                            </div>
                        )}
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="price" className="text-foreground">Price ($)</Label>
                            <Input
                                id="price"
                                name="price"
                                type="number"
                                step="0.01"
                                min="0"
                                defaultValue={service?.price}
                                required
                            />
                            {state?.fieldErrors?.price && (
                                <p className="text-sm text-destructive">{state.fieldErrors.price}</p>
                            )}
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="duration" className="text-foreground">Duration (min)</Label>
                            <Input
                                id="duration"
                                name="duration"
                                type="number"
                                min="1"
                                defaultValue={service?.duration}
                                required
                            />
                            {state?.fieldErrors?.duration && (
                                <p className="text-sm text-destructive">{state.fieldErrors.duration}</p>
                            )}
                        </div>
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="categoryId" className="text-foreground">Category</Label>
                        <input type="hidden" name="categoryId" value={selectedCategoryId} />
                        <Select
                            value={selectedCategoryId}
                            onValueChange={setSelectedCategoryId}
                        >
                            <SelectTrigger>
                                <SelectValue placeholder="Select a category" />
                            </SelectTrigger>
                            <SelectContent>
                                {categories.map((cat) => (
                                    <SelectItem key={cat.id} value={cat.id}>
                                        {cat.name}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                        {state?.fieldErrors?.categoryId && (
                            <p className="text-sm text-destructive">{state.fieldErrors.categoryId}</p>
                        )}
                    </div>
                    <DialogFooter>
                        <Button type="submit" disabled={pending}>
                            {pending ? "Saving..." : mode === "edit" ? "Save Changes" : "Create Service"}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}
