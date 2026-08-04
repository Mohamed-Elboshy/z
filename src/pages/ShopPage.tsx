import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { translations } from '../translations/i18n';
import { ProductCard } from '../components/common/ProductCard';
import { Filter, SlidersHorizontal, Grid, LayoutGrid, RotateCcw, X, ChevronDown } from 'lucide-react';

export const ShopPage: React.FC = () => {
  const { language, products, filters, setFilters, resetFilters } = useApp();
  const t = translations[language];

  const [gridCols, setGridCols] = useState<1 | 2 | 4>(4);
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  // Apply Client Filters
  const filteredProducts = products.filter(p => {
    if (filters.selectedGender !== 'All' && p.gender.toLowerCase() !== filters.selectedGender.toLowerCase()) {
      return false;
    }
    if (filters.selectedCategory !== 'All' && p.category.toLowerCase() !== filters.selectedCategory.toLowerCase()) {
      return false;
    }
    if (filters.onlyInStock && p.stock <= 0) {
      return false;
    }
    if (filters.onlySale && p.discountPercent <= 0) {
      return false;
    }
    if (filters.onlyNew && !p.isNew) {
      return false;
    }
    if (filters.priceRange && (p.price < filters.priceRange[0] || p.price > filters.priceRange[1])) {
      return false;
    }
    if (filters.searchQuery) {
      const q = filters.searchQuery.toLowerCase();
      const matchName = p.nameEn.toLowerCase().includes(q) || p.nameAr.includes(q);
      const matchTags = p.tags.some(tag => tag.toLowerCase().includes(q));
      if (!matchName && !matchTags) return false;
    }
    return true;
  });

  // Sort
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (filters.sortBy === 'price_asc') return a.price - b.price;
    if (filters.sortBy === 'price_desc') return b.price - a.price;
    if (filters.sortBy === 'rating') return b.rating - a.rating;
    if (filters.sortBy === 'discount') return b.discountPercent - a.discountPercent;
    return (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0);
  });

  const categories = ['All', 'Outerwear', 'Formal Wear', 'Bags', 'Shoes', 'Perfumes', 'Accessories', 'Casual Wear'];
  const genders = ['All', 'Women', 'Men', 'Kids'];
  const sizes = ['XS', 'S', 'M', 'L', 'XL', 'ONE SIZE', '37', '38', '39', '40', '41'];

  return (
    <div className="surface-panel max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Header Title & Breadcrumb */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 border-b border-zinc-200 dark:border-zinc-800 pb-6">
        <div>
          <span className="text-[10px] font-mono tracking-[0.3em] uppercase text-zinc-400">ZARA CATALOG</span>
          <h1 className="text-3xl font-serif font-bold tracking-wider uppercase text-black dark:text-white mt-1">
            {filters.selectedGender !== 'All' ? filters.selectedGender : 'ALL COLLECTIONS'}
          </h1>
          <p className="text-xs font-mono text-zinc-500 mt-1">
            {t.filter.showing} <strong>{sortedProducts.length}</strong> {t.filter.products}
          </p>
        </div>

        {/* Controls: Grid toggle & Sort Dropdown */}
        <div className="flex items-center gap-4 w-full md:w-auto justify-between md:justify-end">
          {/* Mobile Filter Button */}
          <button
            onClick={() => setIsMobileFilterOpen(!isMobileFilterOpen)}
            className="lg:hidden flex items-center gap-2 border border-zinc-300 dark:border-zinc-700 px-4 py-2 text-xs font-mono font-bold uppercase"
          >
            <SlidersHorizontal className="w-4 h-4" />
            <span>{t.filter.title}</span>
          </button>

          {/* Layout Grid Buttons */}
          <div className="hidden sm:flex items-center border border-zinc-300 dark:border-zinc-800 divide-x divide-zinc-300 dark:divide-zinc-800">
            <button
              onClick={() => setGridCols(1)}
              className={`p-2 transition-colors ${gridCols === 1 ? 'bg-black text-white dark:bg-white dark:text-black' : 'text-zinc-500'}`}
              title="1 Column Editorial View"
            >
              <Grid className="w-4 h-4" />
            </button>
            <button
              onClick={() => setGridCols(2)}
              className={`p-2 transition-colors ${gridCols === 2 ? 'bg-black text-white dark:bg-white dark:text-black' : 'text-zinc-500'}`}
              title="2 Columns View"
            >
              <LayoutGrid className="w-4 h-4" />
            </button>
            <button
              onClick={() => setGridCols(4)}
              className={`p-2 transition-colors ${gridCols === 4 ? 'bg-black text-white dark:bg-white dark:text-black' : 'text-zinc-500'}`}
              title="4 Columns Grid"
            >
              <LayoutGrid className="w-4 h-4 scale-125" />
            </button>
          </div>

          {/* Sort Dropdown */}
          <div className="relative">
            <select
              value={filters.sortBy}
              onChange={e => setFilters(prev => ({ ...prev, sortBy: e.target.value as any }))}
              className="bg-white dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-700 px-4 py-2 text-xs font-mono uppercase font-bold text-black dark:text-white focus:outline-none cursor-pointer pr-8 appearance-none"
            >
              <option value="newest">{t.filter.sortNewest}</option>
              <option value="price_asc">{t.filter.sortPriceAsc}</option>
              <option value="price_desc">{t.filter.sortPriceDesc}</option>
              <option value="rating">{t.filter.sortRating}</option>
              <option value="discount">{t.filter.sortDiscount}</option>
            </select>
            <ChevronDown className="w-4 h-4 text-zinc-400 absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>
        </div>
      </div>

      {/* Active Filters Pill Bar */}
      {(filters.selectedGender !== 'All' || filters.selectedCategory !== 'All' || filters.onlySale || filters.onlyNew || filters.searchQuery) && (
        <div className="flex flex-wrap items-center gap-2 pt-2">
          <span className="text-xs font-mono text-zinc-400">Active Filters:</span>
          {filters.selectedGender !== 'All' && (
            <span className="inline-flex items-center gap-1 bg-black text-white dark:bg-white dark:text-black text-[10px] font-mono px-3 py-1 rounded-full uppercase">
              Gender: {filters.selectedGender}
              <button onClick={() => setFilters(prev => ({ ...prev, selectedGender: 'All' }))}>
                <X className="w-3 h-3" />
              </button>
            </span>
          )}
          {filters.selectedCategory !== 'All' && (
            <span className="inline-flex items-center gap-1 bg-black text-white dark:bg-white dark:text-black text-[10px] font-mono px-3 py-1 rounded-full uppercase">
              Category: {filters.selectedCategory}
              <button onClick={() => setFilters(prev => ({ ...prev, selectedCategory: 'All' }))}>
                <X className="w-3 h-3" />
              </button>
            </span>
          )}
          {filters.onlySale && (
            <span className="inline-flex items-center gap-1 bg-rose-600 text-white text-[10px] font-mono px-3 py-1 rounded-full uppercase">
              Sale Items
              <button onClick={() => setFilters(prev => ({ ...prev, onlySale: false }))}>
                <X className="w-3 h-3" />
              </button>
            </span>
          )}
          {filters.onlyNew && (
            <span className="inline-flex items-center gap-1 bg-amber-500 text-black text-[10px] font-mono px-3 py-1 rounded-full uppercase">
              New Arrivals
              <button onClick={() => setFilters(prev => ({ ...prev, onlyNew: false }))}>
                <X className="w-3 h-3" />
              </button>
            </span>
          )}
          {filters.searchQuery && (
            <span className="inline-flex items-center gap-1 bg-zinc-800 text-white text-[10px] font-mono px-3 py-1 rounded-full uppercase">
              Search: "{filters.searchQuery}"
              <button onClick={() => setFilters(prev => ({ ...prev, searchQuery: '' }))}>
                <X className="w-3 h-3" />
              </button>
            </span>
          )}
          <button
            onClick={resetFilters}
            className="text-xs font-mono text-rose-600 underline flex items-center gap-1 ml-2 font-bold"
          >
            <RotateCcw className="w-3 h-3" />
            <span>{t.filter.clearAll}</span>
          </button>
        </div>
      )}

      {/* Main Grid + Sidebar Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        
        {/* Sidebar Filters (Desktop + Mobile Drawer) */}
        <aside className={`space-y-6 lg:block ${isMobileFilterOpen ? 'block' : 'hidden'} lg:col-span-1 border-r border-zinc-200 dark:border-zinc-800 pr-6`}>
          <div className="flex items-center justify-between border-b border-zinc-200 dark:border-zinc-800 pb-3">
            <h3 className="text-xs font-serif font-bold tracking-widest uppercase">
              {t.filter.title}
            </h3>
            <button onClick={resetFilters} className="text-[10px] font-mono text-zinc-400 hover:text-black dark:hover:text-white uppercase">
              Reset
            </button>
          </div>

          {/* Gender Filter */}
          <div className="space-y-2">
            <label className="text-xs font-mono font-bold uppercase text-zinc-500">{t.filter.gender}</label>
            <div className="flex flex-wrap gap-2">
              {genders.map(g => (
                <button
                  key={g}
                  onClick={() => setFilters(prev => ({ ...prev, selectedGender: g }))}
                  className={`px-3 py-1.5 text-xs font-mono uppercase transition-colors border ${
                    filters.selectedGender === g
                      ? 'bg-black text-white dark:bg-white dark:text-black border-black dark:border-white font-bold'
                      : 'border-zinc-300 dark:border-zinc-700 hover:border-black dark:hover:border-white'
                  }`}
                >
                  {g}
                </button>
              ))}
            </div>
          </div>

          {/* Categories Filter */}
          <div className="space-y-2">
            <label className="text-xs font-mono font-bold uppercase text-zinc-500">{t.filter.category}</label>
            <div className="flex flex-col gap-1 text-xs font-mono">
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setFilters(prev => ({ ...prev, selectedCategory: cat }))}
                  className={`text-left py-1 hover:text-black dark:hover:text-white uppercase transition-colors ${
                    filters.selectedCategory === cat ? 'font-bold text-black dark:text-white underline' : 'text-zinc-500'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Checkbox Toggles */}
          <div className="space-y-3 pt-4 border-t border-zinc-200 dark:border-zinc-800 text-xs font-mono">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={filters.onlySale}
                onChange={e => setFilters(prev => ({ ...prev, onlySale: e.target.checked }))}
                className="accent-black dark:accent-white"
              />
              <span>{t.filter.saleOnly}</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={filters.onlyNew}
                onChange={e => setFilters(prev => ({ ...prev, onlyNew: e.target.checked }))}
                className="accent-black dark:accent-white"
              />
              <span>{t.filter.newOnly}</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={filters.onlyInStock}
                onChange={e => setFilters(prev => ({ ...prev, onlyInStock: e.target.checked }))}
                className="accent-black dark:accent-white"
              />
              <span>{t.filter.inStockOnly}</span>
            </label>
          </div>
        </aside>

        {/* Product Grid Area */}
        <main className="lg:col-span-3">
          {sortedProducts.length === 0 ? (
            <div className="text-center py-20 bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 space-y-4">
              <Filter className="w-12 h-12 mx-auto text-zinc-400" />
              <h3 className="text-sm font-sans font-bold uppercase tracking-widest">{t.noResults}</h3>
              <p className="text-xs text-zinc-500 font-mono">Try clearing your filters or changing your search terms.</p>
              <button
                onClick={resetFilters}
                className="bg-black text-white dark:bg-white dark:text-black font-semibold text-xs tracking-widest uppercase px-6 py-3"
              >
                {t.filter.clearAll}
              </button>
            </div>
          ) : (
            <div
              className={`grid gap-6 ${
                gridCols === 1
                  ? 'grid-cols-1'
                  : gridCols === 2
                  ? 'grid-cols-1 sm:grid-cols-2'
                  : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'
              }`}
            >
              {sortedProducts.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  );
};
