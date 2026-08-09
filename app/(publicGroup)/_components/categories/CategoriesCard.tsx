'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { ICategory } from '@/lib/type';

interface CategoriesCardProps {
  category: ICategory;
}

const CategoriesCard: React.FC<CategoriesCardProps> = ({ category }) => {
  const [imageError, setImageError] = useState(false);

  return (
    <div className="bg-background rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden  border border-gray-200/80 dark:border-gray-700/80 h-full">
      <div className="relative h-80 w-full overflow-hidden">
        {category.icon && !imageError ? (
          <Image
            src={category.icon}
            alt={category.name}
            unoptimized
            fill
            className="object-cover group-hover:scale-110 transition-transform duration-500"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            onError={() => setImageError(true)}
          />
        ) : (
          <div className="flex items-center justify-center h-full">
            <span className="text-4xl text-primary-500">📋</span>
          </div>
        )}
      </div>
      <div className="p-4">
        <h3 className="text-xl font-semibold group-hover:text-primary-600 transition-colors line-clamp-1">
          {category.name}
        </h3>
        <p className="text-muted-foreground mt-1 line-clamp-2">
          {category.description || 'No description available'}
        </p>
      </div>
    </div>
  );
};

export default CategoriesCard;
