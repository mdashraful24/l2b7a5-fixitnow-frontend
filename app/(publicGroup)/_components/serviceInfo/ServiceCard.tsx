import { IService } from "@/lib/type"
import { Wrench, Star, MapPin, Clock, DollarSign } from "lucide-react"
import Link from "next/link"

interface ServiceCardProps {
    service: IService;
}

export function ServiceCard({ service }: ServiceCardProps) {
    return (
        <div className="group relative flex flex-col overflow-hidden rounded-lg border bg-white transition-all hover:shadow-lg">
            {/* Image placeholder - you can replace with actual image if available */}
            <div className="relative h-48 bg-linear-to-br from-primary/10 to-primary/5">
                <div className="absolute inset-0 flex items-center justify-center">
                    <Wrench className="h-12 w-12 text-primary/40" />
                </div>
                {service.isAvailable && (
                    <span className="absolute right-3 top-3 rounded-full bg-green-500 px-2.5 py-0.5 text-xs font-medium text-white">
                        Available
                    </span>
                )}
            </div>

            <div className="flex flex-1 flex-col space-y-3 p-4">
                {/* Category badge */}
                <div className="flex items-center gap-2">
                    <span className="inline-flex items-center rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary">
                        {service.category.name}
                    </span>
                </div>

                {/* Title */}
                <h3 className="line-clamp-1 text-lg font-semibold text-gray-900">
                    {service.title}
                </h3>

                {/* Description */}
                <p className="line-clamp-2 text-sm text-gray-600">
                    {service.description}
                </p>

                {/* Technician info */}
                <div className="flex items-center gap-2 text-sm">
                    <span className="font-medium text-gray-700">
                        {service.technician.user.name}
                    </span>
                    <div className="flex items-center gap-1">
                        <Star className="h-3.5 w-3.5 fill-yellow-400 text-yellow-400" />
                        <span className="text-sm font-medium">
                            {service.technician.rating}
                        </span>
                        <span className="text-xs text-gray-500">
                            ({service.technician.totalReviews})
                        </span>
                    </div>
                </div>

                {/* Location */}
                <div className="flex items-center gap-1 text-sm text-gray-500">
                    <MapPin className="h-3.5 w-3.5" />
                    <span>{service.technician.location}</span>
                </div>

                {/* Price and duration */}
                <div className="mt-2 flex flex-col gap-3 border-t pt-3">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1 text-sm">
                            <Clock className="h-4 w-4 text-gray-400" />
                            <span className="text-gray-600">{service.duration} min</span>
                        </div>
                        <div className="flex items-center gap-1">
                            <DollarSign className="h-4 w-4 text-primary" />
                            <span className="text-lg font-bold text-primary">
                                {service.price}
                            </span>
                            {service.hourlyRate && (
                                <span className="text-xs text-gray-400">
                                    /{service.hourlyRate} hr
                                </span>
                            )}
                        </div>
                    </div>
                    <Link
                        href={`/technicians/${service.technician.id}`}
                        className="w-full rounded-md bg-primary/10 px-4 py-2 text-center text-sm font-medium text-primary transition-colors hover:bg-primary hover:text-white"
                    >
                        View Technician
                    </Link>
                </div>
            </div>
        </div>
    )
}
