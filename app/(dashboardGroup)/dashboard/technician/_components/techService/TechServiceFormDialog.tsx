/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { PencilIcon, PlusIcon } from "lucide-react";
import { useActionState, useEffect, useState } from "react";
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

    const action = mode === "edit" && service
        ? updatedService.bind(null, service.id)
        : createService;

    const [state, formAction, pending] = useActionState(action, null) as any;

    useEffect(() => {
        if (!state) return;

        if (state.success) {
            toast.success(state.message || (mode === "edit" ? "Service updated successfully" : "Service created successfully"));
            // eslint-disable-next-line react-hooks/set-state-in-effect -- closing the dialog is the intended reaction to the server action's result, not a render loop
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
                    <DialogTitle>
                        {mode === "edit" ? "Edit Service" : "Create Service"}
                    </DialogTitle>
                </DialogHeader>
                <form action={formAction} className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="title">Title</Label>
                        <Input id="title" name="title" defaultValue={service?.title} required />
                        {state?.fieldErrors?.title && (
                            <p className="text-sm text-destructive">{state.fieldErrors.title}</p>
                        )}
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="description">Description</Label>
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
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="price">Price ($)</Label>
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
                            <Label htmlFor="duration">Duration (min)</Label>
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
                        <Label htmlFor="categoryId">Category</Label>
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
