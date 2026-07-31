"use client";

import { deleteService } from "@/app/(dashboardGroup)/_actions/technician";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export function DeleteServiceButton({ serviceId }: { serviceId: string }) {
    const router = useRouter();

    const handleDelete = async () => {
        const result = await deleteService(serviceId);

        if (result.success) {
            toast.success("Service deleted successfully");
            router.refresh();
        } else {
            toast.error(result.message || "Failed to delete service");
        }
    };

    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <Button
                    variant="destructive"
                    size="sm"
                >
                    <Trash2 />
                    Delete
                </Button>
            </AlertDialogTrigger>

            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>
                        Delete this service?
                    </AlertDialogTitle>

                    <AlertDialogDescription className="text-gray-700">
                        This action cannot be undone. This will permanently
                        remove this service from your account.
                    </AlertDialogDescription>
                </AlertDialogHeader>

                <AlertDialogFooter>
                    <AlertDialogCancel>
                        Cancel
                    </AlertDialogCancel>

                    <AlertDialogAction
                        onClick={handleDelete}
                        className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                    >
                        Delete
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}
