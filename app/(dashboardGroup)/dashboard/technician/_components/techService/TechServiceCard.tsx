import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, DollarSign, Zap } from "lucide-react";
import { ICategory, ITechService } from "@/lib/type";
import { TechServiceFormDialog } from "./TechServiceFormDialog";
import { DeleteServiceButton } from "./DeleteServiceButton";

type TechServiceCardProps = {
    service: ITechService;
    categories: ICategory[];
};

export function TechServicePostCard({
    service,
    categories,
}: TechServiceCardProps) {
    return (
        <Card className="group relative flex h-full flex-col bg-linear-to-br from-card to-muted/20 border-0 shadow-lg shadow-primary/5 hover:shadow-xl hover:shadow-primary/10 transition-all duration-500">
            <CardHeader className="relative space-y-3">
                <div className="flex items-start justify-between gap-3">
                    <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                            <div className="h-8 w-8 rounded-lg bg-linear-to-br from-primary/20 to-primary/5 flex items-center justify-center">
                                <Zap className="h-4 w-4 text-primary" />
                            </div>

                            <Badge className="bg-primary/10 text-primary hover:bg-primary/20 border-0 text-xs font-semibold uppercase tracking-wider">
                                {service.category.name}
                            </Badge>
                        </div>
                    </div>

                    {/* Always visible on mobile/tablet, hover on large screens */}
                    <div className="flex items-center gap-1.5">
                        {/* Always visible on small/medium screens, hidden on large */}
                        <div className="flex items-center gap-1.5 lg:hidden">
                            <div className="bg-background/80 backdrop-blur-sm rounded-lg p-1 shadow-sm">
                                <TechServiceFormDialog
                                    mode="edit"
                                    service={service}
                                    categories={categories}
                                />
                            </div>

                            <div className="bg-background/80 backdrop-blur-sm rounded-lg p-1 shadow-sm">
                                <DeleteServiceButton serviceId={service.id} />
                            </div>
                        </div>

                        {/* Hidden on small/medium, visible on hover on large screens */}
                        <div className="hidden lg:flex lg:items-center lg:gap-1.5 lg:opacity-0 lg:group-hover:opacity-100 lg:transition-all lg:duration-300 lg:-translate-y-1 lg:group-hover:translate-y-0">
                            <div className="bg-background/80 backdrop-blur-sm rounded-lg p-1 shadow-sm">
                                <TechServiceFormDialog
                                    mode="edit"
                                    service={service}
                                    categories={categories}
                                />
                            </div>

                            <div className="bg-background/80 backdrop-blur-sm rounded-lg p-1 shadow-sm">
                                <DeleteServiceButton serviceId={service.id} />
                            </div>
                        </div>
                    </div>
                </div>

                <CardTitle className="text-xl font-medium tracking-tight group-hover:text-primary transition-colors duration-300">
                    {service.title}
                </CardTitle>
            </CardHeader>

            <CardContent className="relative flex flex-1 flex-col space-y-5">
                {/* Description takes available space */}
                <div className="relative flex-1 pl-4 border-l-2 border-primary/70 group-hover:border-primary transition-colors">
                    <p className="line-clamp-3 text-md leading-relaxed">
                        {service.description}
                    </p>
                </div>

                {/* Price + Duration stay at bottom */}
                <div className="grid grid-cols-2 gap-2 mt-auto">
                    <div className="relative overflow-hidden rounded-lg bg-linear-to-br from-emerald-500/5 to-emerald-500/10 p-4 group/price">
                        <div className="relative flex items-center gap-3">
                            <div className="rounded-full bg-emerald-500/10 p-2.5">
                                <DollarSign className="h-4 w-4 text-emerald-600" />
                            </div>
                            <div>
                                <p className="text-[10px] font-semibold uppercase tracking-[0.15em] text-emerald-600/60">
                                    Price
                                </p>
                                <p className="text-lg font-bold tracking-tight text-emerald-600">
                                    ${service.price.toFixed(2)}
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="relative overflow-hidden rounded-lg bg-linear-to-br from-violet-500/5 to-violet-500/10 p-4 group/duration">
                        <div className="relative flex items-center gap-3">
                            <div className="rounded-full bg-violet-500/10 p-2.5">
                                <Clock className="h-4 w-4 text-violet-600" />
                            </div>
                            <div>
                                <p className="text-[10px] font-semibold uppercase tracking-[0.15em] text-violet-600/60">
                                    Duration
                                </p>
                                <p className="text-lg font-bold tracking-tight text-violet-600">
                                    {service.duration}m
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </CardContent>

            <CardFooter className="relative mt-auto pt-2 flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <div className={`relative ${service.isAvailable ? "text-green-500" : "text-red-500"}`}>
                        <span className="relative flex h-3 w-3">
                            <span
                                className={`absolute inline-flex h-full w-full rounded-full ${service.isAvailable
                                        ? "bg-green-400 opacity-75 animate-ping"
                                        : "bg-red-400"
                                    }`}
                            />
                            <span
                                className={`relative inline-flex h-3 w-3 rounded-full ${service.isAvailable
                                        ? "bg-green-500"
                                        : "bg-red-500"
                                    }`}
                            />
                        </span>
                    </div>
                    <span
                        className={`text-sm font-medium ${service.isAvailable
                                ? "text-green-600"
                                : "text-red-600"
                            }`}
                    >
                        {service.isAvailable
                            ? "Available Now"
                            : "Currently Unavailable"}
                    </span>
                </div>
                <div className="flex items-center gap-2 text-[10px] font-medium uppercase tracking-widest text-muted-foreground">
                    <span>Service ID</span>

                    <span className="font-mono bg-muted/30 px-2 py-0.5 rounded">
                        {service.id.slice(0, 6)}
                    </span>
                </div>
            </CardFooter>
            <div className="absolute inset-0 rounded-lg bg-linear-to-tr from-transparent via-primary/2 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
        </Card>
    );
}
