'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { ICategory } from '@/lib/type';
import { Sparkles } from 'lucide-react';

interface CategoriesCardProps {
  category: ICategory;
}

const CategoriesCard: React.FC<CategoriesCardProps> = ({ category }) => {
  const [imageError, setImageError] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  // Gradient colors based on category name for variety
  const getGradientColors = (name: string) => {
    const gradients = [
      'from-blue-500 to-purple-600',
      'from-emerald-500 to-teal-600',
      'from-orange-500 to-red-600',
      'from-pink-500 to-rose-600',
      'from-indigo-500 to-blue-600',
      'from-violet-500 to-purple-600',
      'from-cyan-500 to-blue-600',
      'from-amber-500 to-orange-600',
    ];
    const index = name.length % gradients.length;
    return gradients[index];
  };

  // Get a random emoji based on category name
  const getCategoryEmoji = (name: string) => {
    const emojis = ['⚡', '🔧', '🛠️', '🔨', '⚙️', '💡', '🔌', '🧰', '📐', '🔩'];
    const index = name.length % emojis.length;
    return emojis[index];
  };

  const gradientClass = getGradientColors(category.name);
  const emoji = getCategoryEmoji(category.name);

  return (
    <div
      className="group relative bg-white dark:bg-gray-900 rounded-2xl shadow-md hover:shadow-lg transition-all duration-500 overflow-hidden border border-gray-200/50 dark:border-gray-700/50 h-full transform hover:-translate-y-1"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image Container with overlay */}
      <div className="relative h-64 w-full overflow-hidden">
        {category.icon && !imageError ? (
          <>
            <Image
              src={category.icon}
              alt={category.name}
              unoptimized
              fill
              className={`object-cover`}
              onError={() => setImageError(true)}
            />
            {/* Gradient overlay on image */}
            <div className={`absolute inset-0 bg-linear-to-t from-black/70 via-black/20 to-transparent transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-60'
              }`} />
          </>
        ) : (
          <div className={`flex items-center justify-center h-full`}>
            <span className="text-6xl text-white drop-shadow-2xl">{emoji}</span>
          </div>
        )}

        {/* Category badge on image */}
        <div className="absolute top-4 right-4">
          <div className={`px-3 py-1.5 bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm rounded-full shadow-lg flex items-center gap-2 transform transition-all duration-300 ${isHovered ? 'scale-105' : 'scale-100'
            }`}>
            <Sparkles className="w-4 h-4 text-blue-500" />
            <span className="text-xs font-semibold">
              {category.isActive ? 'Available' : 'Inactive'}
            </span>
          </div>
        </div>

        {/* Floating icon on hover */}
        {/* <div className={`absolute bottom-4 left-4 transform transition-all duration-500 ${isHovered ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
          }`}>
          <div className="px-3 py-1.5 bg-black/60 backdrop-blur-sm rounded-full">
            <span className="text-white text-sm flex items-center gap-2">
              <Wrench className="w-4 h-4" />
              Explore
            </span>
          </div>
        </div> */}
      </div>

      {/* Content Section */}
      <div className="p-5 relative">
        {/* Category name with animated underline */}
        <div className="mb-2">
          <h3 className="text-xl font-bold group-hover:text-transparent bg-clip-text bg-linear-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-400 transition-all duration-300 line-clamp-1">
            {category.name}
          </h3>
        </div>

        {/* Description with icon */}
        <p className="mt-2 line-clamp-2 leading-relaxed">
          {category.description || 'No description available'}
        </p>

        {/* Decorative corner elements */}
        <div className={`absolute top-0 right-0 w-16 h-16 bg-linear-to-br ${gradientClass} opacity-5 rounded-bl-full transition-all duration-500 ${isHovered ? 'scale-150' : 'scale-100'
          }`} />
        <div className={`absolute bottom-0 left-0 w-16 h-16 bg-linear-to-tr ${gradientClass} opacity-5 rounded-tr-full transition-all duration-500 ${isHovered ? 'scale-150' : 'scale-100'
          }`} />
      </div>
    </div>
  );
};

export default CategoriesCard;
