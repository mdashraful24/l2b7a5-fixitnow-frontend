import { getAllPublicCategories } from "../../_actions/getAllPublicCategories";
import CategoriesList from "./CategoriesList";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const CategoriesContent = async () => {
    const { data: categories, meta } = await getAllPublicCategories({
        page: 1,
        limit: 6,
    });

    return (
        <>
            <CategoriesList
                categories={categories}
                meta={meta}
                showAll={true}
            />

            {meta.total > 6 && (
                <Link
                    href="/all-categories"
                    className="mt-6 flex w-full items-center justify-end gap-2 font-semibold text-primary transition-colors hover:text-primary/80"
                >
                    View All Categories
                    <ArrowRight className="h-4 w-4" />
                </Link>
            )}
        </>
    );
};

export default CategoriesContent;
