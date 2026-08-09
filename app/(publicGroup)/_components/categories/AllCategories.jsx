import { Suspense } from "react";
import { getAllPublicCategories } from "../../_actions/getAllPublicCategories";
import CategoriesSkeleton from "./CategoriesSkeleton";
import CategoriesList from "./CategoriesList";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const AllCategories = async () => {
    const { data: categories, meta } = await getAllPublicCategories({
        page: 1,
        limit: 6
    });

    return (
        <div className="container mx-auto px-4 pb-20">
            <div className="space-y-2 text-center max-w-3xl mx-auto mb-8">
                <h2 className="text-3xl md:text-4xl font-bold text-foreground">
                    All Categories
                </h2>
                <p className="text-lg text-foreground">
                    Explore all categories
                </p>
            </div>

            <Suspense fallback={<CategoriesSkeleton />}>
                <CategoriesList categories={categories} meta={meta} showAll={true} />
            </Suspense>

            <Link
                href="/all-categories"
                className="inline-flex items-center justify-end gap-2 text-primary font-semibold hover:text-primary/80 transition-colors mt-6 w-full"
            >
                View All Categories
                <ArrowRight className="h-4 w-4" />
            </Link>
        </div>
    );
};

export default AllCategories;
