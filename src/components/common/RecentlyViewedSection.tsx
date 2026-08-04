import React from 'react';
import { useApp } from '../../context/AppContext';
import { ProductCard } from './ProductCard';
import { Clock } from 'lucide-react';

export const RecentlyViewedSection: React.FC = () => {
  const { recentlyViewed, language } = useApp();

  if (recentlyViewed.length === 0) return null;

  return (
    <section className="py-12 border-t border-zinc-200 dark:border-zinc-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-2 mb-8">
          <Clock className="w-4 h-4 text-zinc-500" />
          <h2 className="text-sm font-serif font-bold uppercase tracking-[0.25em] text-black dark:text-white">
            {language === 'ar' ? 'المنتجات المشاهدة مؤخراً' : 'RECENTLY VIEWED'}
          </h2>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {recentlyViewed.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
};
