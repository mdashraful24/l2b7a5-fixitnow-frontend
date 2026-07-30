/* eslint-disable react-hooks/set-state-in-effect */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { PencilIcon, PlusIcon } from "lucide-react";
import { useActionState, useEffect, useState } from "react";
import { toast } from "sonner";
import { ICategory } from "@/lib/type";
import { createCategory, updateCategory } from "@/app/(dashboardGroup)/_actions/admin";
import { Switch } from "@/components/ui/switch";

type CategoriesFormDialogProps = {
    mode: "create" | "edit";
    category?: ICategory;
};

export function CategoriesFormDialog({ mode, category }: CategoriesFormDialogProps) {
    const [open, setOpen] = useState(false);
    const [isActive, setIsActive] = useState(category?.isActive ?? true);

    useEffect(() => {
        setIsActive(category?.isActive ?? true);
    }, [category]);

    const action = mode === "edit" && category
        ? updateCategory.bind(null, category.id)
        : createCategory;

    const [state, formAction, pending] = useActionState(action, null) as any;

    useEffect(() => {
        if (!state) return;

        if (state.success) {
            toast.success(state.message || (mode === "edit" ? "Category updated successfully" : "Category created successfully"));
            setOpen(false);
        } else {
            toast.error(state.message || "Something went wrong");
        }
    }, [state, mode]);

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                {mode === "edit" ? (
                    <Button variant="outline" size="sm" className="gap-2">
                        <PencilIcon className="h-4 w-4" />
                        Edit
                    </Button>
                ) : (
                    <Button className="gap-2">
                        <PlusIcon className="h-4 w-4" />
                        Create Category
                    </Button>
                )}
            </DialogTrigger>
            <DialogContent className="max-w-lg">
                <DialogHeader>
                    <DialogTitle>
                        {mode === "edit" ? "Edit Category" : "Create Category"}
                    </DialogTitle>
                </DialogHeader>
                <form action={formAction} className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="name">Category Name</Label>
                        <Input
                            id="name"
                            name="name"
                            defaultValue={category?.name}
                            required
                            placeholder="Enter category name"
                        />
                        {state?.fieldErrors?.name && (
                            <p className="text-sm text-destructive">{state.fieldErrors.name}</p>
                        )}
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="description">Description</Label>
                        <Textarea
                            id="description"
                            name="description"
                            defaultValue={category?.description}
                            placeholder="Enter category description"
                            className="min-h-24"
                        />
                        {state?.fieldErrors?.description && (
                            <p className="text-sm text-destructive">{state.fieldErrors.description}</p>
                        )}
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="icon">Icon URL</Label>
                        <Input
                            id="icon"
                            name="icon"
                            defaultValue={category?.icon}
                            placeholder="https://example.com/icons/category.png"
                        />
                        {state?.fieldErrors?.icon && (
                            <p className="text-sm text-destructive">{state.fieldErrors.icon}</p>
                        )}
                    </div>

                    <div className="flex items-center justify-between">
                        <Label htmlFor="isActive">Active Status</Label>
                        <input type="hidden" name="isActive" value={isActive ? "true" : "false"} />
                        <Switch
                            id="isActive"
                            checked={isActive}
                            onCheckedChange={setIsActive}
                        />
                    </div>

                    {mode === "edit" && (
                        <p className="text-xs text-muted-foreground">
                            Toggle to {isActive ? "deactivate" : "activate"} this category
                        </p>
                    )}

                    <DialogFooter>
                        <Button type="submit" disabled={pending}>
                            {pending ? "Saving..." : mode === "edit" ? "Save Changes" : "Create Category"}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
