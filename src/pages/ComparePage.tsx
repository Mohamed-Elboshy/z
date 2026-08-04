import React from 'react';
import { useApp } from '../context/AppContext';
import { translations } from '../translations/i18n';
import { Scale, Trash2, ShoppingBag, ArrowRight } from 'lucide-react';

export const ComparePage: React.FC = () => {
  const { language, compareList, toggleCompare, clearCompare, addToCart, formatPrice, navigateTo } = useApp();
  const t = translations[language];

  if (compareList.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center space-y-6">
        <div className="w-20 h-20 rounded-full bg-zinc-100 dark:bg-zinc-900 flex items-center justify-center mx-auto text-zinc-400">
          <Scale className="w-10 h-10" />
        </div>
        <h1 className="text-2xl font-serif font-bold tracking-widest uppercase">{t.compare.empty}</h1>
        <p className="text-xs text-zinc-500 font-mono max-w-sm mx-auto">
          {t.compare.subtitle}
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
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 overflow-x-auto">
      <div className="flex justify-between items-end border-b border-zinc-200 dark:border-zinc-800 pb-4">
        <div>
          <h1 className="text-3xl font-serif font-bold uppercase tracking-wider">{t.compare.title}</h1>
          <p className="text-xs font-mono text-zinc-400 mt-1">{t.compare.subtitle}</p>
        </div>
        <button
          onClick={clearCompare}
          className="text-xs font-mono text-rose-600 underline font-bold"
        >
          {t.compare.clearTable}
        </button>
      </div>

      {/* Comparison Table */}
      <table className="w-full text-xs font-mono border-collapse min-w-[700px]">
        <thead>
          <tr className="border-b-2 border-black dark:border-white">
            <th className="p-4 text-left w-48 uppercase bg-zinc-100 dark:bg-zinc-900 font-bold">
              {t.compare.feature}
            </th>
            {compareList.map(p => (
              <th key={p.id} className="p-4 text-center border-l border-zinc-200 dark:border-zinc-800 relative">
                <button
                  onClick={() => toggleCompare(p)}
                  className="absolute top-2 right-2 text-zinc-400 hover:text-rose-600"
                  title="Remove"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
                <img
                  src={p.images[0]}
                  alt={p.nameEn}
                  className="w-28 h-36 object-cover mx-auto mb-2 bg-zinc-200"
                />
                <h3 className="font-serif font-bold uppercase tracking-wide line-clamp-1">
                  {language === 'ar' ? p.nameAr : p.nameEn}
                </h3>
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800">
          <tr>
            <td className="p-4 font-bold bg-zinc-50 dark:bg-zinc-900">{t.compare.price}</td>
            {compareList.map(p => (
              <td key={p.id} className="p-4 text-center font-bold text-sm text-black dark:text-white border-l border-zinc-200 dark:border-zinc-800">
                {formatPrice(p.price)}
              </td>
            ))}
          </tr>
          <tr>
            <td className="p-4 font-bold bg-zinc-50 dark:bg-zinc-900">{t.compare.brand}</td>
            {compareList.map(p => (
              <td key={p.id} className="p-4 text-center border-l border-zinc-200 dark:border-zinc-800">
                {p.brand}
              </td>
            ))}
          </tr>
          <tr>
            <td className="p-4 font-bold bg-zinc-50 dark:bg-zinc-900">{t.compare.category}</td>
            {compareList.map(p => (
              <td key={p.id} className="p-4 text-center border-l border-zinc-200 dark:border-zinc-800">
                {p.category} ({p.gender})
              </td>
            ))}
          </tr>
          <tr>
            <td className="p-4 font-bold bg-zinc-50 dark:bg-zinc-900">{t.compare.composition}</td>
            {compareList.map(p => (
              <td key={p.id} className="p-4 text-center border-l border-zinc-200 dark:border-zinc-800 leading-relaxed text-zinc-500">
                {language === 'ar' ? p.compositionAr : p.compositionEn}
              </td>
            ))}
          </tr>
          <tr>
            <td className="p-4 font-bold bg-zinc-50 dark:bg-zinc-900">{t.compare.sizes}</td>
            {compareList.map(p => (
              <td key={p.id} className="p-4 text-center border-l border-zinc-200 dark:border-zinc-800 font-bold">
                {p.sizes.join(', ')}
              </td>
            ))}
          </tr>
          <tr>
            <td className="p-4 font-bold bg-zinc-50 dark:bg-zinc-900">{t.compare.rating}</td>
            {compareList.map(p => (
              <td key={p.id} className="p-4 text-center border-l border-zinc-200 dark:border-zinc-800 text-amber-500 font-bold">
                ★ {p.rating} ({p.reviewCount} reviews)
              </td>
            ))}
          </tr>
          <tr>
            <td className="p-4 font-bold bg-zinc-50 dark:bg-zinc-900">ACTION</td>
            {compareList.map(p => (
              <td key={p.id} className="p-4 text-center border-l border-zinc-200 dark:border-zinc-800">
                <button
                  onClick={() => addToCart(p, p.colors[0], p.sizes[0])}
                  className="w-full bg-black text-white dark:bg-white dark:text-black py-2.5 text-xs font-bold uppercase hover:opacity-90 flex items-center justify-center gap-1"
                >
                  <ShoppingBag className="w-3.5 h-3.5" />
                  <span>ADD TO BAG</span>
                </button>
              </td>
            ))}
          </tr>
        </tbody>
      </table>
    </div>
  );
};
