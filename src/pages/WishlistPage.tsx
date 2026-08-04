import React from 'react';
import { useApp } from '../context/AppContext';
import { translations } from '../translations/i18n';
import { ProductCard } from '../components/common/ProductCard';
import { Heart, ShoppingBag, ArrowRight } from 'lucide-react';

export const WishlistPage: React.FC = () => {
  const { language, wishlist, navigateTo } = useApp();
  const t = translations[language];

  if (wishlist.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center space-y-6">
        <div className="w-20 h-20 rounded-full bg-zinc-100 dark:bg-zinc-900 flex items-center justify-center mx-auto text-zinc-400">
          <Heart className="w-10 h-10" />
        </div>
        <h1 className="text-2xl font-serif font-bold tracking-widest uppercase">{t.nav.wishlist} IS EMPTY</h1>
        <p className="text-xs text-zinc-500 font-mono max-w-sm mx-auto">
          Save your favourite editorial coats, dresses, and leather bags to review anytime.
        </p>
        <button
          onClick={() => navigateTo('shop')}
          className="bg-black text-white dark:bg-white dark:text-black font-semibold text-xs tracking-widest uppercase px-8 py-4 hover:opacity-90 transition-opacity inline-flex items-center gap-2"
        >
          <span>{t.cart.startShopping}</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <div className="border-b border-zinc-200 dark:border-zinc-800 pb-4">
        <h1 className="text-3xl font-serif font-bold uppercase tracking-wider">{t.nav.wishlist}</h1>
        <p className="text-xs font-mono text-zinc-400 mt-1">
          {wishlist.length} saved products
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {wishlist.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};
