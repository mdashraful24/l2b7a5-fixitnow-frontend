import { getAllServices } from "../../_actions/allServices";
import { IService } from "@/lib/type";
import { ServiceCard } from "./ServiceCard";

export async function ServiceList({
    searchParams
}: {
    searchParams?: Promise<{ [key: string]: string | string[] | undefined }>
}) {
    const query = await searchParams;

    const result = await getAllServices({ query });

    if (!result.success || !result.data?.length) {
        return (
            <p className="py-12 text-center text-foreground">
                No services found.
            </p>
        )
    }

    return (
        <div className='space-y-8'>
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                {result.data.map((service: IService) => (
                    <ServiceCard key={service.id} service={service} />
                ))}
            </div>
        </div>
    )
}
