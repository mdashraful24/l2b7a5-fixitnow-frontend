import { Suspense } from "react";
import CategoriesSkeleton from "./CategoriesSkeleton";
import CategoriesContent from "./CategoriesContent";

const AllCategories = () => {
    return (
        <div className="container mx-auto px-4 py-20">
            <div className="mx-auto mb-10 max-w-3xl space-y-2 text-center">
                <h2 className="text-3xl font-bold text-foreground md:text-4xl">
                    All Categories
                </h2>

                <p className="text-lg text-foreground">
                    Our services are available in the following categories
                </p>
            </div>

            <Suspense fallback={<CategoriesSkeleton />}>
                <CategoriesContent />
            </Suspense>
        </div>
    );
};


export default AllCategories;
