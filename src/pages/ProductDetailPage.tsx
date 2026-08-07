import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { translations } from '../translations/i18n';
import { ProductCard } from '../components/common/ProductCard';
import { ReviewsSection } from '../components/common/ReviewsSection';
import { RecentlyViewedSection } from '../components/common/RecentlyViewedSection';
import { CardContainer, CardBody, CardItem } from '../components/common/ThreeDCard';
import { Heart, Scale, ShoppingBag, Star, Sparkles, Truck, RefreshCw, Share2, Check, Play, Info } from 'lucide-react';

export const ProductDetailPage: React.FC = () => {
  const {
    language,
    products,
    selectedProductId,
    addToCart,
    toggleWishlist,
    isInWishlist,
    toggleCompare,
    isInCompare,
    setSizeCalcProduct,
    formatPrice,
    addToast,
    navigateTo,
    addToRecentlyViewed
  } = useApp();

  const t = translations[language];

  const product = products.find(p => p.id === selectedProductId) || products[0];

  useEffect(() => {
    if (product) {
      addToRecentlyViewed(product);
    }
  }, [product?.id]);

  const [selectedImageIdx, setSelectedImageIdx] = useState(0);
  const [selectedColor, setSelectedColor] = useState(product.colors[0] || { nameEn: 'Default', nameAr: 'افتراضي', hex: '#000000' });
  const [selectedSize, setSelectedSize] = useState(product.sizes[0] || 'M');
  const [activeTab, setActiveTab] = useState<'details' | 'care' | 'reviews'>('details');

  // Review Form state
  const [reviewName, setReviewName] = useState('');
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewComment, setReviewComment] = useState('');
  const [userReviews, setUserReviews] = useState<any[]>([]);

  const isWishlisted = isInWishlist(product.id);
  const isCompared = isInCompare(product.id);

  const handleAddToCart = () => {
    addToCart(product, selectedColor, selectedSize);
  };

  const handleBuyNow = () => {
    addToCart(product, selectedColor, selectedSize);
    navigateTo('checkout');
  };

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      addToast(t.product.copiedLink, 'info');
    }
  };

  const handleAddReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reviewName || !reviewComment) {
      addToast(language === 'ar' ? 'يرجى إكمال جميع الحقول' : 'Please complete all fields', 'error');
      return;
    }
    const newRev = {
      id: Date.now().toString(),
      userName: reviewName,
      rating: reviewRating,
      date: 'Just now',
      commentEn: reviewComment,
      commentAr: reviewComment,
      isVerified: true
    };
    setUserReviews([newRev, ...userReviews]);
    setReviewName('');
    setReviewComment('');
    addToast(language === 'ar' ? 'شكراً على تقييمك!' : 'Thank you for your review!', 'success');
  };

  const relatedProducts = products.filter(p => p.category === product.category && p.id !== product.id);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-16">
      
      {/* Product Main Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        
        {/* Left: Thumbnail Column + HD Zoom Image Stage (7 cols) */}
        <div className="lg:col-span-7 flex flex-col-reverse md:flex-row gap-4">
          {/* Thumbnails */}
          <div className="flex md:flex-col gap-3 overflow-x-auto md:overflow-y-auto max-h-[600px] shrink-0">
            {product.images.map((img, idx) => (
              <img
                key={idx}
                src={img}
                alt={product.nameEn}
                onClick={() => setSelectedImageIdx(idx)}
                className={`w-16 h-22 object-cover cursor-pointer bg-zinc-100 dark:bg-zinc-900 border transition-all ${
                  selectedImageIdx === idx ? 'border-black dark:border-white scale-105' : 'border-transparent opacity-60 hover:opacity-100'
                }`}
              />
            ))}
          </div>

          {/* Main Stage with 3D Card Tilt Effect */}
          <CardContainer containerClassName="flex-1 w-full" className="w-full">
            <CardBody className="w-full">
              <CardItem translateZ={40} className="w-full">
                <div className="relative aspect-[3/4] bg-zinc-100 dark:bg-zinc-900 overflow-hidden shadow-2xl border border-zinc-200/60 dark:border-zinc-800">
                  <img
                    src={product.images[selectedImageIdx] || product.images[0]}
                    alt={product.nameEn}
                    className="w-full h-full object-cover transition-all duration-500"
                  />
                  {product.discountPercent > 0 && (
                    <span className="absolute top-4 left-4 bg-rose-600 text-white font-mono text-xs font-bold px-3 py-1 uppercase tracking-widest z-10">
                      -{product.discountPercent}% OFF
                    </span>
                  )}
                </div>
              </CardItem>
            </CardBody>
          </CardContainer>
        </div>

        {/* Right: Product Details & Purchase Controls (5 cols) */}
        <div className="lg:col-span-5 space-y-6 flex flex-col justify-between">
          <div className="space-y-4">
            
            {/* Meta */}
            <div className="flex justify-between items-center text-xs font-mono text-zinc-400">
              <span>{product.brand} | SKU: {product.sku}</span>
              <div className="flex items-center gap-1 text-amber-500 font-bold">
                <Star className="w-4 h-4 fill-amber-400" />
                <span>{product.rating} ({product.reviewCount + userReviews.length})</span>
              </div>
            </div>

            {/* Title */}
            <h1 className="text-2xl sm:text-3xl font-serif font-bold uppercase tracking-wider text-black dark:text-white leading-snug">
              {language === 'ar' ? product.nameAr : product.nameEn}
            </h1>

            {/* Price */}
            <div className="flex items-center gap-3">
              <span className="text-2xl font-mono font-bold text-black dark:text-white">
                {formatPrice(product.price)}
              </span>
              {product.discountPercent > 0 && (
                <span className="text-base font-mono line-through text-zinc-400">
                  {formatPrice(product.originalPrice)}
                </span>
              )}
            </div>

            {/* Colors */}
            <div className="space-y-2 pt-2 border-t border-zinc-200 dark:border-zinc-800">
              <label className="text-xs font-mono font-bold uppercase text-zinc-500 flex justify-between">
                <span>{t.selectColor}</span>
                <span className="text-black dark:text-white font-semibold">
                  {language === 'ar' ? selectedColor.nameAr : selectedColor.nameEn}
                </span>
              </label>
              <div className="flex items-center gap-2">
                {product.colors.map(color => (
                  <button
                    key={color.hex}
                    onClick={() => setSelectedColor(color)}
                    style={{ backgroundColor: color.hex }}
                    className={`w-7 h-7 rounded-full border border-zinc-300 dark:border-zinc-700 transition-transform ${
                      selectedColor.hex === color.hex ? 'scale-110 ring-2 ring-black dark:ring-white' : 'hover:scale-105'
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* Sizes & Interactive Fit Calculator */}
            <div className="space-y-2 pt-2">
              <div className="flex justify-between items-center">
                <label className="text-xs font-mono font-bold uppercase text-zinc-500">
                  {t.selectSize}
                </label>
                <button
                  onClick={() => setSizeCalcProduct(product)}
                  className="text-xs font-mono text-amber-600 dark:text-amber-400 font-bold underline flex items-center gap-1"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>{t.sizeCalculator}</span>
                </button>
              </div>

              <div className="grid grid-cols-4 sm:grid-cols-5 gap-2">
                {product.sizes.map(size => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`py-3 text-xs font-mono font-bold border transition-colors ${
                      selectedSize === size
                        ? 'bg-black text-white dark:bg-white dark:text-black border-black dark:border-white'
                        : 'border-zinc-300 dark:border-zinc-700 hover:border-black dark:hover:border-white'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Stock status */}
            <div className="text-xs font-mono text-emerald-600 font-bold flex items-center gap-1.5 pt-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
              <span>{product.stock > 15 ? t.inStock : `${product.stock} ${t.lowStock}`}</span>
            </div>

            {/* Purchase CTA Buttons */}
            <div className="space-y-3 pt-4 border-t border-zinc-200 dark:border-zinc-800">
              <button
                onClick={handleAddToCart}
                className="w-full bg-black text-white dark:bg-white dark:text-black py-4 text-xs font-bold tracking-widest uppercase hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>{t.addToCart}</span>
              </button>

              <button
                onClick={handleBuyNow}
                className="w-full bg-amber-500 text-black py-4 text-xs font-bold tracking-widest uppercase hover:bg-amber-400 transition-colors"
              >
                {t.buyNow}
              </button>

              <div className="flex gap-3">
                <button
                  onClick={() => toggleWishlist(product)}
                  className={`flex-1 py-2.5 text-xs font-mono border flex items-center justify-center gap-2 transition-colors ${
                    isWishlisted ? 'bg-rose-600 text-white border-rose-600' : 'border-zinc-300 dark:border-zinc-700'
                  }`}
                >
                  <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-current' : ''}`} />
                  <span>{isWishlisted ? 'Saved' : t.nav.wishlist}</span>
                </button>

                <button
                  onClick={() => toggleCompare(product)}
                  className={`flex-1 py-2.5 text-xs font-mono border flex items-center justify-center gap-2 transition-colors ${
                    isCompared ? 'bg-black text-white dark:bg-white dark:text-black' : 'border-zinc-300 dark:border-zinc-700'
                  }`}
                >
                  <Scale className="w-4 h-4" />
                  <span>{isCompared ? 'Compared' : t.nav.compare}</span>
                </button>

                <button
                  onClick={handleShare}
                  className="p-2.5 border border-zinc-300 dark:border-zinc-700 hover:border-black dark:hover:border-white"
                  title={t.product.share}
                >
                  <Share2 className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Guarantees */}
            <div className="p-4 bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 space-y-2 text-xs font-mono text-zinc-600 dark:text-zinc-400">
              <div className="flex items-center gap-2">
                <Truck className="w-4 h-4 text-amber-500" />
                <span>{t.freeShippingNotice}</span>
              </div>
              <div className="flex items-center gap-2">
                <RefreshCw className="w-4 h-4 text-amber-500" />
                <span>{t.freeReturnsNotice}</span>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* Tabs: Description, Care & Composition, Customer Reviews */}
      <div className="border-t border-zinc-200 dark:border-zinc-800 pt-8 space-y-6">
        <div className="flex border-b border-zinc-200 dark:border-zinc-800 text-xs font-serif font-bold tracking-widest uppercase">
          <button
            onClick={() => setActiveTab('details')}
            className={`py-3 px-6 border-b-2 transition-colors ${
              activeTab === 'details' ? 'border-black dark:border-white text-black dark:text-white' : 'border-transparent text-zinc-400'
            }`}
          >
            DESCRIPTION & COMPOSITION
          </button>
          <button
            onClick={() => setActiveTab('care')}
            className={`py-3 px-6 border-b-2 transition-colors ${
              activeTab === 'care' ? 'border-black dark:border-white text-black dark:text-white' : 'border-transparent text-zinc-400'
            }`}
          >
            {t.product.care}
          </button>
          <button
            onClick={() => setActiveTab('reviews')}
            className={`py-3 px-6 border-b-2 transition-colors ${
              activeTab === 'reviews' ? 'border-black dark:border-white text-black dark:text-white' : 'border-transparent text-zinc-400'
            }`}
          >
            {t.product.reviews} ({product.reviewCount + userReviews.length})
          </button>
        </div>

        {/* Tab 1: Description */}
        {activeTab === 'details' && (
          <div className="max-w-3xl space-y-4 text-xs font-mono leading-relaxed text-zinc-600 dark:text-zinc-300">
            <p className="text-sm font-sans text-black dark:text-white leading-relaxed">
              {language === 'ar' ? product.descriptionAr : product.descriptionEn}
            </p>
            <div className="pt-4 space-y-2">
              <h4 className="font-bold uppercase text-black dark:text-white">{t.product.composition}:</h4>
              <p>{language === 'ar' ? product.compositionAr : product.compositionEn}</p>
            </div>
          </div>
        )}

        {/* Tab 2: Care Instructions */}
        {activeTab === 'care' && (
          <div className="max-w-3xl space-y-4 text-xs font-mono text-zinc-600 dark:text-zinc-300">
            <p>{language === 'ar' ? product.careAr : product.careEn}</p>
          </div>
        )}

        {/* Tab 3: Customer Reviews */}
        {activeTab === 'reviews' && (
          <ReviewsSection product={product} />
        )}
      </div>

      {/* Related Products Section */}
      {relatedProducts.length > 0 && (
        <section className="space-y-6 pt-12 border-t border-zinc-200 dark:border-zinc-800">
          <h3 className="text-xl font-serif font-bold uppercase tracking-wider">
            {t.product.relatedProducts}
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedProducts.slice(0, 4).map(p => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}

      {/* Recently Viewed Products */}
      <RecentlyViewedSection />

      {/* Sticky Floating Bottom Bar for Quick Purchase */}
      <div className="fixed bottom-0 inset-x-0 bg-white/95 dark:bg-zinc-950/95 backdrop-blur-md border-t border-zinc-200 dark:border-zinc-800 p-3 z-30 flex items-center justify-between max-w-7xl mx-auto sm:px-8">
        <div className="flex items-center gap-3">
          <img src={product.images[0]} alt="" className="w-10 h-12 object-cover bg-zinc-100 hidden sm:block" />
          <div>
            <h4 className="text-xs font-sans font-bold uppercase line-clamp-1">
              {language === 'ar' ? product.nameAr : product.nameEn}
            </h4>
            <span className="text-xs font-mono font-bold text-black dark:text-white">
              {formatPrice(product.price)}
            </span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={handleAddToCart}
            className="bg-black text-white dark:bg-white dark:text-black font-semibold text-xs tracking-widest uppercase px-6 py-3 hover:opacity-90 transition-opacity flex items-center gap-2"
          >
            <ShoppingBag className="w-4 h-4" />
            <span>{t.addToCart}</span>
          </button>
        </div>
      </div>

    </div>
  );
};

const mockProductReviews = [
  {
    id: 'rev-01',
    userName: 'Mariam K.',
    rating: 5,
    date: '3 days ago',
    commentEn: 'Absolute perfection! Heavy luxury weight, fits oversized exactly like Z lookbooks.',
    commentAr: 'ممتازة جداً وثقيلة، الموديل مضبوط وأنيق.',
    isVerified: true
  },
  {
    id: 'rev-02',
    userName: 'Khaled B.',
    rating: 5,
    date: '1 week ago',
    commentEn: 'Prompt delivery to New Cairo via Fawry payment. Highly recommended.',
    commentAr: 'التوصيل كان سريعاً بالتجمع الخامس عبر دفع فوري.',
    isVerified: true
  }
];
