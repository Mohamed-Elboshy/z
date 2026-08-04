import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { translations } from '../translations/i18n';
import { ProductCard } from '../components/common/ProductCard';
import { ArrowRight, Sparkles, Flame, Clock, ShieldCheck, Truck, RefreshCw, Star, Instagram } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export const HomePage: React.FC = () => {
  const { language, products, navigateTo, setFilters, formatPrice } = useApp();
  const t = translations[language];

  // Flash Sale countdown timer
  const [timeLeft, setTimeLeft] = useState({ hours: 14, minutes: 32, seconds: 45 });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        if (prev.minutes > 0) return { ...prev, minutes: 59, seconds: 59 };
        if (prev.hours > 0) return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        return prev;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const heroSlides = [
    {
      titleEn: 'WINTER COLLECTION 2026',
      titleAr: 'مجموعة الشتاء 2026',
      subtitleEn: 'Minimalist coats, tailored blazers, and luxury leather footwear.',
      subtitleAr: 'معاطف فاخرة، بليزرات مصممة بعناية، وأحذية جلدية راقية.',
      image: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=2000&q=80',
      actionGender: 'Women'
    },
    {
      titleEn: 'THE ART OF TAILORING',
      titleAr: 'فن الخياطة الإيطالية',
      subtitleEn: 'Structured menswear made from premium spun wool and linen blends.',
      subtitleAr: 'ملابس رجالية فاخرة مصنوعة من أقمشة الصوف والكتان الإيطالي.',
      image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=2000&q=80',
      actionGender: 'Men'
    }
  ];

  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const slideInterval = setInterval(() => {
      setCurrentSlide(prev => (prev + 1) % heroSlides.length);
    }, 6000);
    return () => clearInterval(slideInterval);
  }, [heroSlides.length]);

  const flashSaleProducts = products.filter(p => p.isFlashSale);
  const newArrivals = products.filter(p => p.isNew);
  const bestSellers = products.filter(p => p.isBestSeller);

  const handleGenderClick = (gender: string) => {
    setFilters(prev => ({ ...prev, selectedGender: gender, selectedCategory: 'All' }));
    navigateTo('shop');
  };

  return (
    <div className="space-y-16 sm:space-y-24 pb-16">
      
      {/* 1. Hero Editorial View (Clean Minimalism Signature) */}
      <section className="relative min-h-[550px] sm:min-h-[650px] w-full surface-panel overflow-hidden border-b border-white/10">
        <AnimatePresence mode="wait">
          {heroSlides.map((slide, idx) => idx === currentSlide && (
            <motion.div
              key={idx}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="absolute inset-0 z-10 flex flex-col md:flex-row items-center justify-between"
            >
              {/* Left Content Area */}
              <div className="w-full md:w-1/2 p-8 sm:p-16 lg:p-20 z-10 flex flex-col justify-center space-y-6">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  className="space-y-3"
                >
                  <p className="text-[10px] tracking-[0.4em] font-sans uppercase text-zinc-600 dark:text-zinc-400 font-semibold">
                    SUMMER SERIES 2026
                  </p>
                  <h1 className="text-4xl sm:text-6xl lg:text-7xl font-serif font-light leading-[1.05] tracking-tighter text-black dark:text-white uppercase">
                    {language === 'ar' ? slide.titleAr : slide.titleEn}
                  </h1>
                  <p className="text-xs sm:text-sm font-sans tracking-wide max-w-md text-zinc-600 dark:text-zinc-300">
                    {language === 'ar' ? slide.subtitleAr : slide.subtitleEn}
                  </p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.25 }}
                  className="pt-4 flex flex-wrap gap-4"
                >
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleGenderClick(slide.actionGender)}
                    className="border border-black bg-white text-black dark:bg-black dark:text-white dark:border-white px-10 py-3.5 text-[10px] tracking-[0.25em] font-bold uppercase hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-colors cursor-pointer"
                  >
                    {t.exploreCollection}
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => {
                      setFilters(prev => ({ ...prev, onlySale: true }));
                      navigateTo('shop');
                    }}
                    className="border border-black/20 text-black dark:text-white dark:border-white/20 px-8 py-3.5 text-[10px] tracking-[0.25em] font-medium uppercase hover:border-black dark:hover:border-white transition-colors cursor-pointer"
                  >
                    {t.nav.sale}
                  </motion.button>
                </motion.div>
              </div>

              {/* Right Hero Image Area */}
              <div className="w-full md:w-1/2 h-full min-h-[350px] relative bg-cover bg-center overflow-hidden">
                <motion.img
                  initial={{ scale: 1.08 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                  src={slide.image}
                  alt={slide.titleEn}
                  className="w-full h-full object-cover object-center brightness-95 filter contrast-105"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-[#E5E5E1] via-transparent to-transparent md:block hidden" />
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {/* Slide Indicators */}
        <div className="absolute bottom-8 left-8 sm:left-16 z-20 flex gap-3 items-center">
          {heroSlides.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentSlide(idx)}
              className={`h-0.5 transition-all cursor-pointer ${currentSlide === idx ? 'w-10 bg-black dark:bg-white' : 'w-4 bg-black/30 dark:bg-white/30'}`}
            />
          ))}
        </div>
      </section>

      {/* 2. Key Value Pillars */}
      <section className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 py-8 border-y border-black/10 dark:border-white/10 text-xs font-sans uppercase tracking-[0.2em]">
          <div className="flex items-center gap-4">
            <Truck className="w-5 h-5 text-black dark:text-white shrink-0" />
            <div>
              <p className="font-bold text-black dark:text-white">EXPRESS EGYPT SHIPPING</p>
              <p className="text-zinc-500 text-[9px] tracking-widest">Free on orders over 3,000 EGP</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <RefreshCw className="w-5 h-5 text-black dark:text-white shrink-0" />
            <div>
              <p className="font-bold text-black dark:text-white">30-DAY EASY RETURNS</p>
              <p className="text-zinc-500 text-[9px] tracking-widest">Hassle-free exchange policy</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <ShieldCheck className="w-5 h-5 text-black dark:text-white shrink-0" />
            <div>
              <p className="font-bold text-black dark:text-white">FAWRY & INSTAPAY</p>
              <p className="text-zinc-500 text-[9px] tracking-widest">Instant local Egyptian payments</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Sparkles className="w-5 h-5 text-black dark:text-white shrink-0" />
            <div>
              <p className="font-bold text-black dark:text-white">AUTHENTIC ZARA</p>
              <p className="text-zinc-500 text-[9px] tracking-widest">Guaranteed genuine quality</p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Featured Categories Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex justify-between items-end border-b border-zinc-200 dark:border-zinc-800 pb-4">
          <div>
            <span className="text-[10px] font-mono tracking-[0.3em] uppercase text-zinc-400">DISCOVER</span>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold uppercase tracking-wider text-black dark:text-white">
              FEATURED COLLECTIONS
            </h2>
          </div>
          <button
            onClick={() => navigateTo('shop')}
            className="text-xs font-mono font-bold uppercase tracking-widest underline hover:opacity-75"
          >
            {t.viewAll}
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div
            onClick={() => handleGenderClick('Women')}
            className="group relative h-96 bg-zinc-900 overflow-hidden cursor-pointer"
          >
            <img
              src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1000&q=80"
              alt="Women"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-80"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-6">
              <div className="text-white space-y-1">
                <span className="text-[10px] font-mono tracking-widest uppercase text-amber-300">COLLECTION</span>
                <h3 className="text-2xl font-serif font-bold uppercase tracking-wider">{t.nav.women}</h3>
                <span className="text-xs font-mono underline block pt-2 group-hover:pl-2 transition-all">{t.shopNow} →</span>
              </div>
            </div>
          </div>

          <div
            onClick={() => handleGenderClick('Men')}
            className="group relative h-96 bg-zinc-900 overflow-hidden cursor-pointer"
          >
            <img
              src="https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=1000&q=80"
              alt="Men"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-80"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-6">
              <div className="text-white space-y-1">
                <span className="text-[10px] font-mono tracking-widest uppercase text-amber-300">COLLECTION</span>
                <h3 className="text-2xl font-serif font-bold uppercase tracking-wider">{t.nav.men}</h3>
                <span className="text-xs font-mono underline block pt-2 group-hover:pl-2 transition-all">{t.shopNow} →</span>
              </div>
            </div>
          </div>

          <div
            onClick={() => handleGenderClick('Kids')}
            className="group relative h-96 bg-zinc-900 overflow-hidden cursor-pointer"
          >
            <img
              src="https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?auto=format&fit=crop&w=1000&q=80"
              alt="Kids"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-80"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-6">
              <div className="text-white space-y-1">
                <span className="text-[10px] font-mono tracking-widest uppercase text-amber-300">COLLECTION</span>
                <h3 className="text-2xl font-serif font-bold uppercase tracking-wider">{t.nav.kids}</h3>
                <span className="text-xs font-mono underline block pt-2 group-hover:pl-2 transition-all">{t.shopNow} →</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Flash Sale Live Banner */}
      {flashSaleProducts.length > 0 && (
        <section className="bg-black/5 dark:bg-zinc-900/60 backdrop-blur-md border-y border-[#D7981A]/30 py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-zinc-200/60 dark:border-zinc-800/80 pb-6">
              <div className="flex items-center gap-3">
                <Flame className="w-8 h-8 text-rose-500 animate-pulse" />
                <div>
                  <h2 className="text-2xl sm:text-3xl font-serif font-bold uppercase tracking-wider text-rose-500">
                    {t.flashSale}
                  </h2>
                  <p className="text-xs font-mono text-zinc-500 dark:text-zinc-400">Exclusive limited time discounts in Egypt</p>
                </div>
              </div>

              {/* Countdown Clock */}
              <div className="flex items-center gap-2 text-xs font-mono bg-white/80 dark:bg-black/80 backdrop-blur-md px-4 py-2 border border-[#D7981A]/40 text-black dark:text-white">
                <Clock className="w-4 h-4 text-amber-500" />
                <span>ENDS IN:</span>
                <span className="font-bold text-[#D7981A]">
                  {String(timeLeft.hours).padStart(2, '0')}:{String(timeLeft.minutes).padStart(2, '0')}:
                  {String(timeLeft.seconds).padStart(2, '0')}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {flashSaleProducts.slice(0, 4).map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 5. New Arrivals Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex justify-between items-end border-b border-zinc-200 dark:border-zinc-800 pb-4">
          <div>
            <span className="text-[10px] font-mono tracking-[0.3em] uppercase text-zinc-400">JUST DROPPED</span>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold uppercase tracking-wider text-black dark:text-white">
              {t.newCollection}
            </h2>
          </div>
          <button
            onClick={() => {
              setFilters(prev => ({ ...prev, onlyNew: true }));
              navigateTo('shop');
            }}
            className="text-xs font-mono font-bold uppercase tracking-widest underline hover:opacity-75"
          >
            {t.viewAll}
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {newArrivals.slice(0, 4).map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* 6. Best Sellers Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex justify-between items-end border-b border-zinc-200 dark:border-zinc-800 pb-4">
          <div>
            <span className="text-[10px] font-mono tracking-[0.3em] uppercase text-zinc-400">MOST WANTED</span>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold uppercase tracking-wider text-black dark:text-white">
              {t.bestSellers}
            </h2>
          </div>
          <button
            onClick={() => navigateTo('shop')}
            className="text-xs font-mono font-bold uppercase tracking-widest underline hover:opacity-75"
          >
            {t.viewAll}
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {bestSellers.slice(0, 4).map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* 7. Instagram Fashion Lookbook Gallery */}
      <section className="bg-black/5 dark:bg-white/5 backdrop-blur-md border-y border-[#D7981A]/20 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="text-center max-w-xl mx-auto space-y-2">
            <Instagram className="w-8 h-8 mx-auto text-black dark:text-white" />
            <h2 className="text-2xl font-serif font-bold uppercase tracking-wider">
              #ZARAEGYPT ON INSTAGRAM
            </h2>
            <p className="text-xs text-zinc-500 font-mono">
              Tag @zara_egypt to be featured in our official digital lookbook gallery.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {[
              'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=600&q=80',
              'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=600&q=80',
              'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=600&q=80',
              'https://images.unsplash.com/photo-1544441893-675973e31985?auto=format&fit=crop&w=600&q=80'
            ].map((img, idx) => (
              <div key={idx} className="group relative aspect-square overflow-hidden bg-black">
                <img
                  src={img}
                  alt="Instagram Look"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 opacity-90 group-hover:opacity-100"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white text-xs font-mono">
                  <span>@ZARA_EGYPT</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 8. Customer Reviews & Testimonials */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center max-w-md mx-auto space-y-2">
          <span className="text-[10px] font-mono tracking-[0.3em] uppercase text-zinc-400">VERIFIED FEEDBACK</span>
          <h2 className="text-2xl font-serif font-bold uppercase tracking-wider text-black dark:text-white">
            WHAT OUR CLIENTS SAY
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              name: 'Nour El-Din, Cairo',
              reviewEn: 'The oversized coat arrived in 2 days in Cairo! Quality is identical to Zara stores in Europe. Packaging was luxury.',
              reviewAr: 'المعطف وصل خلال يومين فقط بالقاهرة! الجودة ممتازة ومطابقة لمتاجر زارا في أوروبا.',
              rating: 5
            },
            {
              name: 'Sherif Mansour, Alexandria',
              reviewEn: 'Fawry payment worked seamlessly. Customer service helped me pick the right size for the blazer.',
              reviewAr: 'الدفع عن طريق فوري كان سريع جداً ومريح. وخدمة العملاء ساعدتني في اختيار المقاس المضبوط.',
              rating: 5
            },
            {
              name: 'Yasmine Helmy, Giza',
              reviewEn: 'The leather city bag is genuine leather and smells amazing. Will definitely order again from Zara Egypt online.',
              reviewAr: 'الحقيبة الجلدية رائعة وخامتها طبيعية ممتازة. تجربة شراء ممتازة من الموقع.',
              rating: 5
            }
          ].map((item, idx) => (
            <div
              key={idx}
              className="p-6 bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 space-y-3"
            >
              <div className="flex text-amber-400 gap-1">
                {Array.from({ length: item.rating }).map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400" />
                ))}
              </div>
              <p className="text-xs text-zinc-600 dark:text-zinc-300 leading-relaxed font-sans italic">
                "{language === 'ar' ? item.reviewAr : item.reviewEn}"
              </p>
              <div className="pt-2 border-t border-zinc-100 dark:border-zinc-900 flex justify-between items-center text-[10px] font-mono text-zinc-400">
                <span className="font-bold text-black dark:text-white">{item.name}</span>
                <span className="text-emerald-600 font-bold">✓ Verified Buyer</span>
              </div>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
};
