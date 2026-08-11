"use client";

import { TableCell, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { ICategory } from "@/lib/type";
import { CategoriesFormDialog } from "./CategoriesFormDialog";
// import { CategoriesDeleteButton } from "./CategoriesDeleteButton";
import { Layers } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

type CategoriesTableRowProps = {
    category: ICategory;
    index: number;
};

export function CategoriesTableRow({ category, index }: CategoriesTableRowProps) {
    const [imageError, setImageError] = useState(false);

    return (
        <TableRow className="group hover:bg-muted/50 transition-colors">
            <TableCell className="font-medium text-muted-foreground">
                {index + 1}
            </TableCell>

            <TableCell>
                <div className="flex items-center gap-3">
                    <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center overflow-hidden text-primary flex-shrink-0">
                        {category.icon && !imageError ? (
                            <Image
                                src={category.icon}
                                unoptimized
                                alt={category.name}
                                width={32}
                                height={32}
                                className="h-full w-full object-cover"
                                onError={() => setImageError(true)}
                            />
                        ) : (
                            <Layers className="h-4 w-4" />
                        )}
                    </div>
                    <span className="font-medium">{category.name}</span>
                </div>
            </TableCell>

            <TableCell className="max-w-[200px] truncate text-muted-foreground">
                {category.description || "-"}
            </TableCell>

            <TableCell>
                <Badge
                    variant={category.isActive ? "default" : "secondary"}
                    className="text-xs"
                >
                    {category.isActive ? "Active" : "Inactive"}
                </Badge>
            </TableCell>

            <TableCell className="text-muted-foreground whitespace-nowrap">
                {new Date(category.createdAt).toLocaleDateString()}
            </TableCell>

            <TableCell className="text-right">
                <div className="flex items-center justify-end gap-2">
                    <CategoriesFormDialog
                        mode="edit"
                        category={category}
                    />
                    {/* <CategoriesDeleteButton categoryId={category.id} /> */}
                </div>
            </TableCell>
        </TableRow>
    );
}
