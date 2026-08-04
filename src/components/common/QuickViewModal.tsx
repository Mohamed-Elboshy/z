import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { translations } from '../../translations/i18n';
import { X, Heart, Scale, ShoppingBag, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export const QuickViewModal: React.FC = () => {
  const {
    language,
    quickViewProduct,
    setQuickViewProduct,
    addToCart,
    toggleWishlist,
    isInWishlist,
    toggleCompare,
    isInCompare,
    formatPrice,
    navigateTo
  } = useApp();

  const [selectedSize, setSelectedSize] = useState('');
  const [selectedImageIdx, setSelectedImageIdx] = useState(0);

  if (!quickViewProduct) return null;

  const t = translations[language];
  const product = quickViewProduct;
  const isWishlisted = isInWishlist(product.id);
  const isCompared = isInCompare(product.id);

  const handleAdd = () => {
    const size = selectedSize || product.sizes[0] || 'M';
    addToCart(product, product.colors[0], size);
    setQuickViewProduct(null);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 overflow-y-auto bg-black/70 backdrop-blur-md flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="surface-panel text-white max-w-4xl w-full shadow-2xl border border-white/10 overflow-hidden relative grid grid-cols-1 md:grid-cols-2"
        >
          {/* Close button */}
          <button
            onClick={() => setQuickViewProduct(null)}
            className="absolute top-4 right-4 z-20 p-2 bg-white/80 dark:bg-black/80 rounded-full text-black dark:text-white hover:opacity-75"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Left Image Gallery */}
          <div className="relative aspect-[3/4] bg-zinc-100 dark:bg-zinc-900">
            <img
              src={product.images[selectedImageIdx] || product.images[0]}
              alt={product.nameEn}
              className="w-full h-full object-cover"
            />
            {product.images.length > 1 && (
              <div className="absolute bottom-3 inset-x-0 flex justify-center gap-2">
                {product.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImageIdx(idx)}
                    className={`w-2.5 h-2.5 rounded-full ${
                      selectedImageIdx === idx ? 'bg-black dark:bg-white scale-125' : 'bg-white/60 dark:bg-black/60'
                    }`}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Right Product Summary & Actions */}
          <div className="p-6 sm:p-8 flex flex-col justify-between space-y-6">
            <div className="space-y-3">
              <span className="text-[10px] font-mono tracking-widest text-zinc-400 uppercase">
                {product.brand} | {product.sku}
              </span>
              <h2 className="text-lg sm:text-xl font-serif font-bold tracking-wider uppercase">
                {language === 'ar' ? product.nameAr : product.nameEn}
              </h2>
              <div className="text-base font-mono font-bold text-black dark:text-white">
                {formatPrice(product.price)}
              </div>
              <p className="text-xs leading-relaxed text-zinc-500 dark:text-zinc-400 line-clamp-3">
                {language === 'ar' ? product.descriptionAr : product.descriptionEn}
              </p>
            </div>

            {/* Sizes */}
            <div className="space-y-2">
              <label className="text-[11px] font-sans font-bold tracking-widest uppercase text-zinc-500">
                {t.selectSize}
              </label>
              <div className="flex flex-wrap gap-2">
                {product.sizes.map(size => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`px-3 py-1.5 text-xs font-mono border transition-colors ${
                      (selectedSize || product.sizes[0]) === size
                        ? 'bg-black text-white dark:bg-white dark:text-black border-black dark:border-white font-bold'
                        : 'border-zinc-300 dark:border-zinc-700 hover:border-black dark:hover:border-white'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="space-y-3 pt-4 border-t border-zinc-200 dark:border-zinc-800">
              <button
                onClick={handleAdd}
                className="w-full bg-black text-white dark:bg-white dark:text-black py-3.5 text-xs font-bold tracking-widest uppercase hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>{t.addToCart}</span>
              </button>

              <div className="flex gap-2">
                <button
                  onClick={() => toggleWishlist(product)}
                  className={`flex-1 py-2 text-xs font-mono border flex items-center justify-center gap-2 transition-colors ${
                    isWishlisted ? 'bg-rose-600 text-white border-rose-600' : 'border-zinc-300 dark:border-zinc-700'
                  }`}
                >
                  <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-current' : ''}`} />
                  <span>{isWishlisted ? 'Saved' : t.nav.wishlist}</span>
                </button>

                <button
                  onClick={() => toggleCompare(product)}
                  className={`flex-1 py-2 text-xs font-mono border flex items-center justify-center gap-2 transition-colors ${
                    isCompared ? 'bg-black text-white dark:bg-white dark:text-black' : 'border-zinc-300 dark:border-zinc-700'
                  }`}
                >
                  <Scale className="w-4 h-4" />
                  <span>{isCompared ? 'Compared' : t.nav.compare}</span>
                </button>
              </div>

              <button
                onClick={() => {
                  setQuickViewProduct(null);
                  navigateTo('product', product.id);
                }}
                className="w-full text-center text-xs font-mono underline tracking-widest text-zinc-500 hover:text-black dark:hover:text-white pt-2 flex items-center justify-center gap-1"
              >
                <span>View Full Product Details & Specs</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
