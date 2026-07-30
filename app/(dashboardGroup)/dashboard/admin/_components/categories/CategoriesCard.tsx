"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ICategory } from "@/lib/type";
import { CategoriesFormDialog } from "./CategoriesFormDialog";
import { CategoriesDeleteButton } from "./CategoriesDeleteButton";
import { Calendar, ImageIcon, Link2 } from "lucide-react";
import Image from "next/image";

type CategoriesCardProps = {
    category: ICategory;
};

export function CategoriesCard({ category }: CategoriesCardProps) {
    // Common props for action buttons
    const buttonClassName = "transition-all duration-300";

    return (
        <Card className="group relative flex h-full flex-col bg-linear-to-br from-card to-muted/20 border-0 shadow-lg shadow-primary/5 hover:shadow-xl hover:shadow-primary/10 transition-all duration-500">
            <CardHeader className="relative space-y-3">
                <div className="flex items-start justify-between gap-3">
                    <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                            {category.icon && (
                                <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center overflow-hidden">
                                    <Image
                                        src={category.icon}
                                        unoptimized
                                        alt={category.name}
                                        width={50}
                                        height={50}
                                        className="object-cover"
                                        onError={(e) => {
                                            (e.target as HTMLImageElement).style.display = 'none';
                                        }}
                                    />
                                </div>
                            )}
                            <div className="flex flex-col gap-1">
                                <CardTitle className="text-lg font-semibold tracking-tight group-hover:text-primary transition-colors duration-300">
                                    {category.name}
                                </CardTitle>
                                <Badge
                                    variant={category.isActive ? "default" : "secondary"}
                                    className="w-fit text-xs"
                                >
                                    {category.isActive ? "Active" : "Inactive"}
                                </Badge>
                            </div>
                        </div>
                    </div>

                    {/* Action Buttons Container */}
                    <div className="flex items-center gap-1.5">
                        <div className="flex items-center gap-1.5">
                            {/* Always visible wrapper for sm/md screens */}
                            <div className="flex items-center gap-1.5 lg:hidden">
                                <CategoriesFormDialog
                                    mode="edit"
                                    category={category}
                                />
                                {/* <CategoriesDeleteButton categoryId={category.id} /> */}
                            </div>

                            {/* Hidden on sm/md, visible on lg hover */}
                            <div className="hidden lg:flex lg:items-center lg:gap-1.5 lg:opacity-0 lg:group-hover:opacity-100 lg:transition-all lg:duration-300 lg:-translate-y-1 lg:group-hover:translate-y-0">
                                <CategoriesFormDialog
                                    mode="edit"
                                    category={category}
                                />
                                {/* <CategoriesDeleteButton categoryId={category.id} /> */}
                            </div>
                        </div>
                    </div>
                </div>
            </CardHeader>

            <CardContent className="relative flex flex-1 flex-col space-y-4">
                {category.description && (
                    <div className="relative flex-1 pl-4 border-l-2 border-primary/70 group-hover:border-primary transition-colors">
                        <p className="line-clamp-3 text-sm leading-relaxed text-muted-foreground">
                            {category.description}
                        </p>
                    </div>
                )}

                <div className="space-y-2 mt-auto">
                    {category.icon && (
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                            <ImageIcon className="h-3.5 w-3.5" />
                            <span className="truncate">{category.icon}</span>
                        </div>
                    )}

                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <Link2 className="h-3.5 w-3.5" />
                        <span className="font-mono">ID: {category.id.slice(0, 8)}</span>
                    </div>

                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <Calendar className="h-3.5 w-3.5" />
                        <span>Created: {new Date(category.createdAt).toLocaleDateString()}</span>
                    </div>
                </div>
            </CardContent>

            {/* Decorative gradient overlay */}
            <div className="absolute inset-0 rounded-lg bg-linear-to-tr from-transparent via-primary/2 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
        </Card>
    );
}




// "use client";

// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Badge } from "@/components/ui/badge";
// import { ICategory } from "@/lib/type";
// import { CategoriesFormDialog } from "./CategoriesFormDialog";
// import { CategoriesDeleteButton } from "./CategoriesDeleteButton";
// import { Calendar, ImageIcon, Link2 } from "lucide-react";
// import Image from "next/image";

// type CategoriesCardProps = {
//     category: ICategory;
// };

// export function CategoriesCard({ category }: CategoriesCardProps) {
//     return (
//         <Card className="group relative flex h-full flex-col bg-linear-to-br from-card to-muted/20 border-0 shadow-lg shadow-primary/5 hover:shadow-xl hover:shadow-primary/10 transition-all duration-500">
//             <CardHeader className="relative space-y-3">
//                 <div className="flex items-start justify-between gap-3">
//                     <div className="flex-1 min-w-0">
//                         <div className="flex items-center gap-2">
//                             {category.icon && (
//                                 <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center overflow-hidden">
//                                     {/* <img
//                                         src={category.icon}
//                                         alt={category.name}
//                                         className="h-6 w-6 object-contain"
//                                         onError={(e) => {
//                                             (e.target as HTMLImageElement).style.display = 'none';
//                                         }}
//                                     /> */}

//                                     <Image
//                                         src={category.icon}
//                                         unoptimized
//                                         alt={category.name}
//                                         width={50}
//                                         height={50}
//                                         className="object-cover"
//                                         onError={(e) => {
//                                             (e.target as HTMLImageElement).style.display = 'none';
//                                         }}
//                                     />
//                                 </div>
//                             )}
//                             <div className="flex flex-col gap-1">
//                                 <CardTitle className="text-lg font-semibold tracking-tight group-hover:text-primary transition-colors duration-300">
//                                     {category.name}
//                                 </CardTitle>
//                                 <Badge
//                                     variant={category.isActive ? "default" : "secondary"}
//                                     className="w-fit text-xs"
//                                 >
//                                     {category.isActive ? "Active" : "Inactive"}
//                                 </Badge>
//                             </div>
//                         </div>
//                     </div>

//                     <div className="flex items-center gap-1.5 opacity-0 group-hover:opacity-100 transition-all duration-300 -translate-y-1 group-hover:translate-y-0">
//                         <CategoriesFormDialog
//                             mode="edit"
//                             category={category}
//                         />
//                         <CategoriesDeleteButton categoryId={category.id} />
//                     </div>
//                 </div>
//             </CardHeader>

//             <CardContent className="relative flex flex-1 flex-col space-y-4">
//                 {category.description && (
//                     <div className="relative flex-1 pl-4 border-l-2 border-primary/70 group-hover:border-primary transition-colors">
//                         <p className="line-clamp-3 text-sm leading-relaxed text-muted-foreground">
//                             {category.description}
//                         </p>
//                     </div>
//                 )}

//                 <div className="space-y-2 mt-auto">
//                     {category.icon && (
//                         <div className="flex items-center gap-2 text-xs text-muted-foreground">
//                             <ImageIcon className="h-3.5 w-3.5" />
//                             <span className="truncate">{category.icon}</span>
//                         </div>
//                     )}

//                     <div className="flex items-center gap-2 text-xs text-muted-foreground">
//                         <Link2 className="h-3.5 w-3.5" />
//                         <span className="font-mono">ID: {category.id.slice(0, 8)}</span>
//                     </div>

//                     <div className="flex items-center gap-2 text-xs text-muted-foreground">
//                         <Calendar className="h-3.5 w-3.5" />
//                         <span>Created: {new Date(category.createdAt).toLocaleDateString()}</span>
//                     </div>
//                 </div>
//             </CardContent>

//             {/* Decorative gradient overlay */}
//             <div className="absolute inset-0 rounded-lg bg-linear-to-tr from-transparent via-primary/2 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
//         </Card>
//     );
// }
