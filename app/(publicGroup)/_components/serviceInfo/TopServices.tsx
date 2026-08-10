import { Suspense } from "react"
import ServiceSkeleton from "./ServiceSkeleton"
import ServiceContent from "./ServiceContent"

const TopServices = async () => {
    return (
        <div className="bg-background transition-colors">
            <div className="container mx-auto px-4">
                <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
                    <div className="space-y-1.5">
                        <h2 className="text-3xl font-bold text-foreground">
                            Featured Services
                        </h2>
                        <p className="text-foreground">
                            Browse and choose the best services tailored to your needs
                        </p>
                    </div>
                </div>

                <Suspense fallback={<ServiceSkeleton />}>
                    <ServiceContent />
                </Suspense>
            </div>
        </div>
    )
}

export default TopServices
