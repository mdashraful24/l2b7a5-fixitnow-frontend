const ServiceSkeleton = () => {
    return (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="space-y-3">
                    <div className="h-48 animate-pulse rounded-lg bg-muted" />
                    <div className="space-y-2">
                        <div className="h-4 animate-pulse rounded bg-muted" />
                        <div className="h-4 w-2/3 animate-pulse rounded bg-muted" />
                        <div className="h-3 w-1/2 animate-pulse rounded bg-muted" />
                        <div className="h-10 animate-pulse rounded bg-muted" />
                    </div>
                </div>
            ))}
        </div>
    )
}

export default ServiceSkeleton
