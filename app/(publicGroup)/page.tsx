import { Suspense } from "react";
import ServiceSkeleton from "./_components/serviceInfo/ServiceSkeleton";
import { ServiceList } from "./_components/serviceInfo/ServiceList";
// import { ServiceSearchBar } from "./_components/serviceInfo/ServiceSearchBar";

export default async function HomePage({
  searchParams
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {

  return (
    <div className="mx-auto max-w-7xl space-y-6 px-4 py-10 sm:px-6 lg:px-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-balance">
            All Featured Services
          </h1>
          <p className="text-sm text-muted-foreground">
            Browse and choose the best services tailored to your needs
          </p>
        </div>

        {/* <ServiceSearchBar /> */}
      </div>

      <Suspense fallback={<ServiceSkeleton />}>
        <ServiceList searchParams={searchParams} />
      </Suspense>
    </div>
  );
}
