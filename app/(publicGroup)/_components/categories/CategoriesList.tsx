'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import CategoriesCard from './CategoriesCard';
import Pagination from './Pagination';
import { ICategory } from '@/lib/type';

interface CategoriesListProps {
  categories: ICategory[];
  showAll?: boolean;
  meta?: {
    page: number;
    limit: number;
    total: number;
    totalPage?: number;
  };
}

const CategoriesList: React.FC<CategoriesListProps> = ({
  categories,
  showAll = false,
  meta
}) => {
  const pathname = usePathname();

  // Filter out any invalid categories
  const validCategories = Array.isArray(categories)
    ? categories.filter(category => category && category.id)
    : [];

  if (validCategories.length === 0) {
    return (
      <div className="text-center py-16">
        <div className="text-6xl mb-4">🔍</div>
        <p className="text-xl">No categories found</p>
        <p className="mt-2">Please, try another time</p>
      </div>
    );
  }

  // Show pagination only on the categories page (not on home page)
  const showPagination = showAll && meta && meta.total > meta.limit && pathname === '/all-categories';

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {validCategories.map((category) => (
          <CategoriesCard key={category.id} category={category} />
        ))}
      </div>

      {showPagination && (
        <Pagination
          currentPage={meta.page}
          totalPages={meta.totalPage ?? Math.ceil(meta.total / meta.limit)}
          totalItems={meta.total}
          itemsPerPage={meta.limit}
          itemLabel="categories"
        />
      )}
    </div>
  );
};

export default CategoriesList;
