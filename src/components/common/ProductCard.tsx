import React, { useState } from 'react';
import { Product } from '../../types';
import { useApp } from '../../context/AppContext';
import { translations } from '../../translations/i18n';
import { Heart, Eye, Scale, Star } from 'lucide-react';
import { motion } from 'motion/react';
import { CardContainer, CardBody, CardItem } from './ThreeDCard';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const {
    language,
    formatPrice,
    addToCart,
    toggleWishlist,
    isInWishlist,
    toggleCompare,
    isInCompare,
    setQuickViewProduct,
    navigateTo
  } = useApp();

  const [isHovered, setIsHovered] = useState(false);
  const [selectedColor, setSelectedColor] = useState(product.colors[0] || { nameEn: 'Default', nameAr: 'افتراضي', hex: '#000000' });
  const t = translations[language];

  const currentImage = isHovered && product.images[1] ? product.images[1] : product.images[0];
  const isWishlisted = isInWishlist(product.id);
  const isCompared = isInCompare(product.id);

  return (
    <CardContainer containerClassName="w-full">
      <CardBody className="w-full">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="group relative flex flex-col bg-white dark:bg-zinc-950 border border-zinc-200/80 dark:border-zinc-800 transition-shadow duration-300 hover:shadow-xl hover:shadow-black/5 dark:hover:shadow-white/5 w-full"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {/* Product Image Stage with 3D Z-Depth */}
          <CardItem translateZ={30} className="w-full">
            <div className="relative aspect-[3/4] w-full overflow-hidden bg-[#F5F5F3] dark:bg-zinc-900 cursor-pointer">
              <motion.img
                key={currentImage}
                initial={{ opacity: 0.8 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
                src={currentImage}
                alt={language === 'ar' ? product.nameAr : product.nameEn}
                className="h-full w-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                onClick={() => navigateTo('product', product.id)}
                loading="lazy"
              />

              {/* Status Badges */}
              <div className="absolute top-3 left-3 flex flex-col gap-1 z-10 pointer-events-none">
                {product.isNew && (
                  <span className="bg-black text-white dark:bg-white dark:text-black text-[9px] font-medium tracking-[0.2em] px-2.5 py-1 uppercase">
                    {t.newCollection}
                  </span>
                )}
                {product.discountPercent > 0 && (
                  <span className="bg-red-600 text-white text-[9px] font-bold tracking-[0.2em] px-2.5 py-1 uppercase">
                    -{product.discountPercent}%
                  </span>
                )}
                {product.isBestSeller && !product.isNew && (
                  <span className="bg-zinc-800 text-white text-[9px] font-medium tracking-[0.2em] px-2.5 py-1 uppercase">
                    {t.bestSellers}
                  </span>
                )}
              </div>

              {/* Action Buttons Top Right */}
              <div className="absolute top-3 right-3 flex flex-col gap-1.5 z-10">
                <button
                  onClick={e => {
                    e.stopPropagation();
                    toggleWishlist(product);
                  }}
                  className={`p-2 backdrop-blur-md transition-all ${
                    isWishlisted
                      ? 'bg-red-600 text-white shadow-sm'
                      : 'bg-white/90 dark:bg-black/90 text-black dark:text-white hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black'
                  }`}
                  title={t.product.addedToWishlist}
                >
                  <Heart className={`w-3.5 h-3.5 ${isWishlisted ? 'fill-current' : ''}`} />
                </button>

                <button
                  onClick={e => {
                    e.stopPropagation();
                    toggleCompare(product);
                  }}
                  className={`p-2 backdrop-blur-md transition-all ${
                    isCompared
                      ? 'bg-black text-white dark:bg-white dark:text-black'
                      : 'bg-white/90 dark:bg-black/90 text-black dark:text-white hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black'
                  }`}
                  title={t.nav.compare}
                >
                  <Scale className="w-3.5 h-3.5" />
                </button>

                <button
                  onClick={e => {
                    e.stopPropagation();
                    setQuickViewProduct(product);
                  }}
                  className="p-2 backdrop-blur-md bg-white/90 dark:bg-black/90 text-black dark:text-white hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-all"
                  title={t.quickView}
                >
                  <Eye className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Quick Size Select Overlay on Hover */}
              <div className="absolute inset-x-0 bottom-0 bg-white/95 dark:bg-black/95 backdrop-blur-md p-3 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-in-out border-t border-zinc-200 dark:border-zinc-800 z-20">
                <p className="text-[9px] font-sans tracking-[0.2em] text-zinc-500 uppercase mb-2 text-center">
                  {t.selectSize}
                </p>
                <div className="flex flex-wrap justify-center gap-1.5">
                  {product.sizes.map(size => (
                    <button
                      key={size}
                      onClick={e => {
                        e.stopPropagation();
                        addToCart(product, selectedColor, size);
                      }}
                      className="px-2.5 py-1 text-[9px] font-sans border border-black/20 dark:border-white/20 hover:border-black dark:hover:border-white hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-colors uppercase font-medium"
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </CardItem>

          {/* Product Info */}
          <CardItem translateZ={20} className="w-full">
            <div className="p-4 flex flex-col justify-between flex-1 space-y-2">
              <div>
                <div className="flex justify-between items-center gap-2">
                  <span className="text-[9px] font-sans tracking-[0.25em] text-zinc-400 uppercase font-medium">
                    {product.brand}
                  </span>
                  <div className="flex items-center gap-1 text-[10px] font-sans text-zinc-700 dark:text-zinc-300 font-medium">
                    <Star className="w-3 h-3 fill-black text-black dark:fill-white dark:text-white" />
                    <span>{product.rating}</span>
                  </div>
                </div>

                <h3
                  onClick={() => navigateTo('product', product.id)}
                  className="text-xs sm:text-sm font-sans font-bold tracking-wider text-black dark:text-white uppercase line-clamp-1 cursor-pointer hover:opacity-60 transition-opacity mt-1"
                >
                  {language === 'ar' ? product.nameAr : product.nameEn}
                </h3>
              </div>

              {/* Color Swatches */}
              {product.colors.length > 0 && (
                <div className="flex items-center gap-1.5 pt-1">
                  {product.colors.map(color => (
                    <button
                      key={color.hex}
                      onClick={() => setSelectedColor(color)}
                      style={{ backgroundColor: color.hex }}
                      className={`w-3 h-3 border border-zinc-300 dark:border-zinc-700 transition-transform ${
                        selectedColor.hex === color.hex ? 'scale-125 ring-1 ring-black dark:ring-white' : 'hover:scale-110'
                      }`}
                      title={language === 'ar' ? color.nameAr : color.nameEn}
                    />
                  ))}
                </div>
              )}

              {/* Pricing */}
              <div className="flex items-center gap-2 pt-2 border-t border-zinc-100 dark:border-zinc-900">
                <span className="text-xs sm:text-sm font-sans font-bold text-black dark:text-white tracking-wide">
                  {formatPrice(product.price)}
                </span>
                {product.discountPercent > 0 && (
                  <span className="text-[10px] font-sans line-through text-zinc-400">
                    {formatPrice(product.originalPrice)}
                  </span>
                )}
              </div>
            </div>
          </CardItem>
        </motion.div>
      </CardBody>
    </CardContainer>
  );
};
