import { ServiceList } from "./ServiceList";
import { getAllServices } from "../../_actions/allServices";
import { IMeta, IService } from "@/lib/type";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const ServiceContent = async () => {
    const result = await getAllServices({
        query: {
            page: "1",
            limit: "6",
        }
    });

    const services: IService[] = result?.data || [];
    const meta: IMeta = result?.meta || {
        total: 0,
        page: 1,
        limit: 6,
        totalPage: 0
    };

    return (
        <>
            <ServiceList
                services={services}
                meta={meta}
                showPagination={false}
            />

            {meta.total > 6 && (
                <Link
                    href="/services"
                    className="mt-6 flex w-fit items-center gap-2 font-semibold text-primary transition-colors hover:text-primary/80 ml-auto"
                >
                    View All Services
                    <ArrowRight className="h-4 w-4" />
                </Link>
            )}
        </>
    );
};

export default ServiceContent;
