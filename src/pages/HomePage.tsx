import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { translations } from '../translations/i18n';
import { ProductCard } from '../components/common/ProductCard';
import {ArrowLeft,ArrowRight,Sparkles,Flame,Clock,ShieldCheck,Truck,RefreshCw,Star,Instagram,ChevronUp,ChevronDown,ChevronLeft,ChevronRight,Headphones} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export const HomePage: React.FC = () => {
  const {
    language,
    products,
    navigateTo,
    setFilters,
    formatPrice
  } = useApp();

  const t = translations[language];

  // Flash Sale countdown timer
  const [timeLeft, setTimeLeft] = useState({
    hours: 14,
    minutes: 32,
    seconds: 45
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) {
          return {
            ...prev,
            seconds: prev.seconds - 1
          };
        }

        if (prev.minutes > 0) {
          return {
            ...prev,
            minutes: prev.minutes - 1,
            seconds: 59
          };
        }

        if (prev.hours > 0) {
          return {
            hours: prev.hours - 1,
            minutes: 59,
            seconds: 59
          };
        }

        return prev;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const heroSlides = [
    {
      titleEn: 'TIMELESS ELEGANCE',
      titleAr: 'TIMELESS ELEGANCE',
      subtitleEn: 'NEW COLLECTION',
      subtitleAr: 'NEW COLLECTION',
      taglineAr: 'أناقة تدوم مع كل لحظة',
      taglineEn: 'Elegance that lasts every moment',
      image: '/images/0103.jpg',
      actionGender: 'Women',
      primaryBtnAr: 'تسوقي الآن',
      secondaryBtnAr: 'اكتشف المجموعة'
    },
    {
      titleEn: 'THE TAILORED SUIT',
      titleAr: 'فن الخياطة الإيطالية',
      subtitleEn: 'NEW MENSWEAR',
      subtitleAr: 'مجموعة الرجال',
      taglineAr: 'خياطة فاخرة وأناقة عصرية للمناسبات',
      taglineEn: 'Luxury tailoring for every occasion',
      image: '/images/0101.jpg',
      actionGender: 'Men',
      primaryBtnAr: 'تسوق الآن',
      secondaryBtnAr: 'اكتشف المجموعة'
    },
    {
      titleEn: 'LUXURY HANDBAGS',
      titleAr: 'حقائب جلدية فاخرة',
      subtitleEn: 'ESSENTIAL DETAILS',
      subtitleAr: 'إكسسوارات حصرية',
      taglineAr: 'لمسات أنيقة تكمل إطلالتك الفاخرة',
      taglineEn: 'Refined leather bags and accessories',
      image: '/images/0100.jpg',
      actionGender: 'All',
      primaryBtnAr: 'تسوق الآن',
      secondaryBtnAr: 'اكتشف المجموعة'
    },
    {
      titleEn: 'THE TAILORED SUIT',
      titleAr: 'فن الخياطة الإيطالية',
      subtitleEn: 'NEW MENSWEAR',
      subtitleAr: 'مجموعة الرجال',
      taglineAr: 'خياطة فاخرة وأناقة عصرية للمناسبات',
      taglineEn: 'Luxury tailoring for every occasion',
      image: '/images/0106.jpg',
      actionGender: 'All',
      primaryBtnAr: 'تسوق الآن',
      secondaryBtnAr: 'اكتشف المجموعة'
    }
  ];

  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const slideInterval = setInterval(() => {
      setCurrentSlide(prev => (prev + 1) % heroSlides.length);
    }, 7000);

    return () => clearInterval(slideInterval);
  }, [heroSlides.length]);

  const flashSaleProducts = products.filter(p => p.isFlashSale);
  const newArrivals = products.filter(p => p.isNew);
  const bestSellers = products.filter(p => p.isBestSeller);

  const handleGenderClick = (gender: string) => {
    setFilters(prev => ({
      ...prev,
      selectedGender: gender,
      selectedCategory: 'All'
    }));

    navigateTo('shop');
  };

  const handleSlidePrev = () => {
    setCurrentSlide(prev =>
      prev === 0 ? heroSlides.length - 1 : prev - 1
    );
  };

  const handleSlideNext = () => {
    setCurrentSlide(prev => (prev + 1) % heroSlides.length);
  };

  return (
    <div
      className="relative min-h-screen bg-cover bg-center bg-fixed bg-no-repeat"
      style={{
        backgroundImage:
          "url('/images/background.jpg')"
      }}
    >

      {/* Global Background Overlay */}
      <div className="fixed inset-0 z-0 bg-black/55 pointer-events-none" />

      {/* All Page Content */}
      <div className="relative z-10">

        {/* 1. Hero Main Stage */}
        <section className="relative min-h-[620px] sm:min-h-[720px] w-full bg-transparent overflow-hidden border-b border-white/10">

          {/* Background Slide Image */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{
                opacity: 0,
                scale: 1.08,
                filter: 'blur(6px)'
              }}
              animate={{
                opacity: 1,
                scale: 1,
                filter: 'blur(0px)'
              }}
              exit={{
                opacity: 0,
                scale: 0.96,
                filter: 'blur(4px)'
              }}
              transition={{
                duration: 0.7,
                ease: [0.16, 1, 0.3, 1]
              }}
              className="absolute inset-0 z-0"
            >
              <img
                src={heroSlides[currentSlide].image}
                alt={heroSlides[currentSlide].titleEn}
                className="w-full h-full object-cover object-center brightness-75 filter contrast-105"
              />

              <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/40 to-transparent" />

              <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-transparent to-black/30" />
            </motion.div>
          </AnimatePresence>

          {/* Hero Content */}
          <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-12 lg:px-16 min-h-[640px] sm:min-h-[740px] flex flex-col justify-between pt-12 pb-24 sm:pb-28">

            <div />

            {/* Hero Typography */}
            <div className="max-w-xl space-y-6">

              <motion.div
                key={`text-${currentSlide}`}
                initial={{
                  opacity: 0,
                  y: 25,
                  filter: 'blur(4px)'
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                  filter: 'blur(0px)'
                }}
                transition={{
                  duration: 0.6,
                  delay: 0.15
                }}
                className="space-y-3"
              >

                <p className="text-xs sm:text-sm font-sans tracking-[0.35em] uppercase text-zinc-300 font-semibold">
                  {language === 'ar'
                    ? heroSlides[currentSlide].subtitleAr
                    : heroSlides[currentSlide].subtitleEn}
                </p>

                <h1 className="text-4xl sm:text-6xl lg:text-7xl font-serif font-black tracking-tight leading-[1.05] text-white uppercase drop-shadow-md">
                  {language === 'ar'
                    ? heroSlides[currentSlide].titleAr
                    : heroSlides[currentSlide].titleEn}
                </h1>

                <p className="text-base sm:text-lg font-sans font-light tracking-wide text-zinc-200 pt-1">
                  {language === 'ar'
                    ? heroSlides[currentSlide].taglineAr
                    : heroSlides[currentSlide].taglineEn}
                </p>

              </motion.div>

              {/* Buttons */}
              <motion.div
                key={`btn-${currentSlide}`}
                initial={{
                  opacity: 0,
                  y: 20
                }}
                animate={{
                  opacity: 1,
                  y: 0
                }}
                transition={{
                  duration: 0.6,
                  delay: 0.3
                }}
                className="flex flex-wrap items-center gap-4 pt-2"
              >

                <button
                  onClick={() =>
                    handleGenderClick(
                      heroSlides[currentSlide].actionGender
                    )
                  }
                  className="bg-white text-black hover:bg-zinc-200 transition-colors px-9 py-3.5 text-xs font-sans tracking-[0.2em] font-bold uppercase cursor-pointer shadow-lg"
                >
                  {language === 'ar'
                    ? heroSlides[currentSlide].primaryBtnAr
                    : 'SHOP NOW'}
                </button>

                <button
                  onClick={() => {
                    setFilters(prev => ({
                      ...prev,
                      onlySale: false
                    }));

                    navigateTo('shop');
                  }}
                  className="bg-black/40 backdrop-blur-md border border-white/60 text-white hover:bg-white hover:text-black transition-all px-8 py-3.5 text-xs font-sans tracking-[0.2em] font-medium uppercase cursor-pointer"
                >
                  {language === 'ar'
                    ? heroSlides[currentSlide].secondaryBtnAr
                    : 'DISCOVER COLLECTION'}
                </button>

              </motion.div>

              {/* Slider Counter */}
              <div className="flex items-center gap-4 text-xs font-mono tracking-widest pt-6 text-zinc-400">

                {heroSlides.slice(0, 3).map((_, idx) => (
                  <React.Fragment key={idx}>

                    <button
                      onClick={() => setCurrentSlide(idx)}
                      className={`cursor-pointer transition-colors ${
                        currentSlide === idx
                          ? 'text-white font-bold border-b-2 border-white pb-0.5'
                          : 'hover:text-zinc-200'
                      }`}
                    >
                      0{idx + 1}
                    </button>

                    {idx < 2 && (
                      <span className="text-zinc-600">
                        —
                      </span>
                    )}

                  </React.Fragment>
                ))}

              </div>

            </div>

            {/* Thumbnail Carousel */}
            <div className="absolute bottom-16 left-6 right-6 sm:left-auto sm:right-12 z-20 flex items-center justify-center sm:justify-end gap-2 sm:gap-3 bg-black/70 backdrop-blur-md p-1 sm:p-1.5 border border-white/20 rounded-xl shadow-2xl">

              <motion.button
                whileHover={{ scale: 1.15 }}
                whileTap={{ scale: 0.9 }}
                onClick={handleSlidePrev}
                className="p-2 rounded-full bg-white/10 hover:bg-white text-white hover:text-black transition-colors cursor-pointer"
                aria-label="Previous Slide"
              >
                <ChevronLeft className="w-4 h-4" />
              </motion.button>

              <div className="flex items-center gap-2 sm:gap-3 overflow-x-auto py-1 px-1 max-w-[280px] sm:max-w-none">

                {heroSlides.map((slide, idx) => (
                  <motion.button
                    key={idx}
                    onClick={() => setCurrentSlide(idx)}
                    whileHover={{
                      scale: 1.08,
                      y: -2
                    }}
                    whileTap={{
                      scale: 0.95
                    }}
                    className={`relative w-14 h-16 sm:w-16 sm:h-20 overflow-hidden rounded-md border transition-all cursor-pointer shrink-0 ${
                      currentSlide === idx
                        ? 'border-white ring-2 ring-white/70 shadow-2xl z-10'
                        : 'border-white/30 opacity-50 hover:opacity-90'
                    }`}
                  >

                    <motion.img
                      src={slide.image}
                      alt={slide.titleEn}
                      animate={{
                        scale: currentSlide === idx ? 1.08 : 1
                      }}
                      transition={{
                        duration: 0.5
                      }}
                      className="w-full h-full object-cover object-center"
                    />

                    {currentSlide === idx && (
                      <motion.div
                        layoutId="activeHeroThumbnailFrame"
                        className="absolute inset-0 border-2 border-white pointer-events-none rounded-md"
                        transition={{
                          type: 'spring',
                          stiffness: 350,
                          damping: 28
                        }}
                      />
                    )}

                  </motion.button>
                ))}

              </div>

              <motion.button
                whileHover={{ scale: 1.15 }}
                whileTap={{ scale: 0.9 }}
                onClick={handleSlideNext}
                className="p-2 rounded-full bg-white/10 hover:bg-white text-white hover:text-black transition-colors cursor-pointer"
                aria-label="Next Slide"
              >
                <ChevronRight className="w-4 h-4" />
              </motion.button>

            </div>

          </div>
        </section>

        {/* 2. Category Cards */}

        <motion.section
          initial={{
            opacity: 0,
            y: 30
          }}
          whileInView={{
            opacity: 1,
            y: 0
          }}
          viewport={{
            once: true,
            margin: '-20px'
          }}
          transition={{
            duration: 0.45,
            ease: [0.16, 1, 0.3, 1]
          }}
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-10 sm:-mt-16 relative z-20 transform-gpu"
        >

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">

            {/* Women */}
            <motion.div
              initial={{
                opacity: 0,
                y: 20,
                scale: 0.97
              }}
              whileInView={{
                opacity: 1,
                y: 0,
                scale: 1
              }}
              viewport={{
                once: true,
                margin: '-20px'
              }}
              transition={{
                duration: 0.4,
                delay: 0.05
              }}
              whileHover={{
                y: -4,
                scale: 1.02
              }}
              onClick={() => handleGenderClick('Women')}
              className="group relative h-48 sm:h-56 overflow-hidden bg-zinc-900 border border-white/15 cursor-pointer shadow-2xl transition-all transform-gpu"
            >
              <img
                src="/images/0104.jpg"
                alt="Women"
                className="w-full h-full object-cover object-center brightness-75 filter contrast-105 scale-[0.85]"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />

              <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end">
                <div>
                  <h3 className="text-xl font-serif font-bold text-white uppercase tracking-wider">
                    {language === 'ar' ? 'نساء' : 'WOMEN'}
                  </h3>

                  <p className="text-xs font-sans text-zinc-300 mt-0.5 flex items-center gap-1 group-hover:underline">
                    {language === 'ar'
                      ? 'تسوق الآن'
                      : 'Shop Now'}{' '}
                    <span>←</span>
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Men */}
            <motion.div
              initial={{
                opacity: 0,
                y: 20,
                scale: 0.97
              }}
              whileInView={{
                opacity: 1,
                y: 0,
                scale: 1
              }}
              viewport={{
                once: true,
                margin: '-20px'
              }}
              transition={{
                duration: 0.4,
                delay: 0.1
              }}
              whileHover={{
                y: -4,
                scale: 1.02
              }}
              onClick={() => handleGenderClick('Men')}
              className="group relative h-48 sm:h-56 overflow-hidden bg-zinc-900 border border-white/15 cursor-pointer shadow-2xl transition-all transform-gpu"
            >
              <img
                src="/images/0102.jpg"
                alt="Men"
                className="w-full h-full object-cover object-center brightness-75 filter contrast-105 scale-[0.85]"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />

              <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end">
                <div>
                  <h3 className="text-xl font-serif font-bold text-white uppercase tracking-wider">
                    {language === 'ar' ? 'رجال' : 'MEN'}
                  </h3>

                  <p className="text-xs font-sans text-zinc-300 mt-0.5 flex items-center gap-1 group-hover:underline">
                    {language === 'ar'
                      ? 'تسوق الآن'
                      : 'Shop Now'}{' '}
                    <span>←</span>
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Kids */}
            <motion.div
              initial={{
                opacity: 0,
                y: 20,
                scale: 0.97
              }}
              whileInView={{
                opacity: 1,
                y: 0,
                scale: 1
              }}
              viewport={{
                once: true,
                margin: '-20px'
              }}
              transition={{
                duration: 0.4,
                delay: 0.15
              }}
              whileHover={{
                y: -4,
                scale: 1.02
              }}
              onClick={() => handleGenderClick('Kids')}
              className="group relative h-48 sm:h-56 overflow-hidden bg-zinc-900 border border-white/15 cursor-pointer shadow-2xl transition-all transform-gpu"
            >
              <img
                src="/images/0105.jpg"
                alt="Kids"
                className="w-full h-full object-cover object-center brightness-75 filter contrast-105 scale-[0.85]"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />

              <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end">
                <div>
                  <h3 className="text-xl font-serif font-bold text-white uppercase tracking-wider">
                    {language === 'ar' ? 'أطفال' : 'KIDS'}
                  </h3>

                  <p className="text-xs font-sans text-zinc-300 mt-0.5 flex items-center gap-1 group-hover:underline">
                    {language === 'ar'
                      ? 'تسوق الآن'
                      : 'Shop Now'}{' '}
                    <span>←</span>
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Accessories */}
            <motion.div
              initial={{
                opacity: 0,
                y: 20,
                scale: 0.97
              }}
              whileInView={{
                opacity: 1,
                y: 0,
                scale: 1
              }}
              viewport={{
                once: true,
                margin: '-20px'
              }}
              transition={{
                duration: 0.4,
                delay: 0.2
              }}
              whileHover={{
                y: -4,
                scale: 1.02
              }}
              onClick={() => {
                setFilters(prev => ({
                  ...prev,
                  selectedCategory: 'Bags'
                }));

                navigateTo('shop');
              }}
              className="group relative h-48 sm:h-56 overflow-hidden bg-zinc-900 border border-white/15 cursor-pointer shadow-2xl transition-all transform-gpu"
            >
              <img
                src="/images/0100.jpg"
                alt="Accessories"
                className="w-full h-full object-cover object-center brightness-75 filter contrast-105 scale-[0.85]"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />

              <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end">
                <div>
                  <h3 className="text-xl font-serif font-bold text-white uppercase tracking-wider">
                    {language === 'ar'
                      ? 'الإكسسوارات'
                      : 'ACCESSORIES'}
                  </h3>

                  <p className="text-xs font-sans text-zinc-300 mt-0.5 flex items-center gap-1 group-hover:underline">
                    {language === 'ar'
                      ? 'تسوق الآن'
                      : 'Shop Now'}{' '}
                    <span>←</span>
                  </p>
                </div>
              </div>
            </motion.div>

          </div>
        </motion.section>

        {/* 3. Feature Pillars */}

        <motion.section
          initial={{
            opacity: 0,
            y: 40
          }}
          whileInView={{
            opacity: 1,
            y: 0
          }}
          viewport={{
            once: true,
            amount: 0.3
          }}
          transition={{
            duration: 0.7,
            ease: [0.16, 1, 0.3, 1]
          }}
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 border-y border-white/10 bg-black/40 backdrop-blur-md"
        >

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-center sm:text-left">

            <div className="flex items-center justify-center sm:justify-start gap-4 p-3">
              <Truck className="w-7 h-7 text-white shrink-0 stroke-1" />

              <div>
                <h4 className="text-sm font-sans font-bold text-white tracking-wide">
                  {language === 'ar'
                    ? 'توصيل مجاني'
                    : 'FREE DELIVERY'}
                </h4>

                <p className="text-xs font-sans text-zinc-400 mt-0.5">
                  {language === 'ar'
                    ? 'للطلبات فوق 2000 جنيه'
                    : 'On orders over 2,000 EGP'}
                </p>
              </div>
            </div>

            <div className="flex items-center justify-center sm:justify-start gap-4 p-3">
              <RefreshCw className="w-7 h-7 text-white shrink-0 stroke-1" />

              <div>
                <h4 className="text-sm font-sans font-bold text-white tracking-wide">
                  {language === 'ar'
                    ? 'إرجاع مجاني'
                    : 'FREE RETURNS'}
                </h4>

                <p className="text-xs font-sans text-zinc-400 mt-0.5">
                  {language === 'ar'
                    ? 'خلال 30 يوم'
                    : 'Within 30 days easy exchange'}
                </p>
              </div>
            </div>

            <div className="flex items-center justify-center sm:justify-start gap-4 p-3">
              <ShieldCheck className="w-7 h-7 text-white shrink-0 stroke-1" />

              <div>
                <h4 className="text-sm font-sans font-bold text-white tracking-wide">
                  {language === 'ar'
                    ? 'دفع آمن'
                    : '100% SECURE PAYMENT'}
                </h4>

                <p className="text-xs font-sans text-zinc-400 mt-0.5">
                  {language === 'ar'
                    ? '100% آمن ومضمون'
                    : 'Fawry, InstaPay & Credit Cards'}
                </p>
              </div>
            </div>

            <div className="flex items-center justify-center sm:justify-start gap-4 p-3">
              <Headphones className="w-7 h-7 text-white shrink-0 stroke-1" />

              <div>
                <h4 className="text-sm font-sans font-bold text-white tracking-wide">
                  {language === 'ar'
                    ? 'دعم 24/7'
                    : '24/7 CUSTOMER SUPPORT'}
                </h4>

                <p className="text-xs font-sans text-zinc-400 mt-0.5">
                  {language === 'ar'
                    ? 'مساعدة في أي وقت'
                    : 'Dedicated concierge help'}
                </p>
              </div>
            </div>

          </div>
        </motion.section>

        {/* 4. Featured Categories */}

        <motion.section
          initial={{
            opacity: 0,
            y: 50
          }}
          whileInView={{
            opacity: 1,
            y: 0
          }}
          viewport={{
            once: true,
            amount: 0.2
          }}
          transition={{
            duration: 0.8
          }}
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8"
        >

          <div className="flex justify-between items-end border-b border-zinc-200 dark:border-zinc-800 pb-4">

            <div>
              <span className="text-[10px] font-mono tracking-[0.3em] uppercase text-zinc-400">
                DISCOVER
              </span>

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

            <motion.div
              initial={{
                opacity: 0,
                y: 40,
                scale: 0.95
              }}
              whileInView={{
                opacity: 1,
                y: 0,
                scale: 1
              }}
              viewport={{
                once: true
              }}
              transition={{
                duration: 0.7,
                delay: 0.1
              }}
              onClick={() => handleGenderClick('Women')}
              className="group relative h-96 bg-zinc-900 overflow-hidden cursor-pointer"
            >
              <img
                src="/images/0103.jpg"
                alt="Women"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-80"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-6">
                <div className="text-white space-y-1">
                  <span className="text-[10px] font-mono tracking-widest uppercase text-amber-300">
                    COLLECTION
                  </span>

                  <h3 className="text-2xl font-serif font-bold uppercase tracking-wider">
                    {t.nav.women}
                  </h3>

                  <span className="text-xs font-mono underline block pt-2 group-hover:pl-2 transition-all">
                    {t.shopNow} →
                  </span>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{
                opacity: 0,
                y: 40,
                scale: 0.95
              }}
              whileInView={{
                opacity: 1,
                y: 0,
                scale: 1
              }}
              viewport={{
                once: true
              }}
              transition={{
                duration: 0.7,
                delay: 0.2
              }}
              onClick={() => handleGenderClick('Men')}
              className="group relative h-96 bg-zinc-900 overflow-hidden cursor-pointer"
            >
              <img
                src="/images/0102.jpg"
                alt="Men"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-80"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-6">
                <div className="text-white space-y-1">
                  <span className="text-[10px] font-mono tracking-widest uppercase text-amber-300">
                    COLLECTION
                  </span>

                  <h3 className="text-2xl font-serif font-bold uppercase tracking-wider">
                    {t.nav.men}
                  </h3>

                  <span className="text-xs font-mono underline block pt-2 group-hover:pl-2 transition-all">
                    {t.shopNow} →
                  </span>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{
                opacity: 0,
                y: 40,
                scale: 0.95
              }}
              whileInView={{
                opacity: 1,
                y: 0,
                scale: 1
              }}
              viewport={{
                once: true
              }}
              transition={{
                duration: 0.7,
                delay: 0.3
              }}
              onClick={() => handleGenderClick('Kids')}
              className="group relative h-96 bg-zinc-900 overflow-hidden cursor-pointer"
            >
              <img
                src="/images/0106.jpg"
                alt="Kids"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-80"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-6">
                <div className="text-white space-y-1">
                  <span className="text-[10px] font-mono tracking-widest uppercase text-amber-300">
                    COLLECTION
                  </span>

                  <h3 className="text-2xl font-serif font-bold uppercase tracking-wider">
                    {t.nav.kids}
                  </h3>

                  <span className="text-xs font-mono underline block pt-2 group-hover:pl-2 transition-all">
                    {t.shopNow} →
                  </span>
                </div>
              </div>
            </motion.div>

          </div>
        </motion.section>

        {/* 5. Flash Sale */}

        {flashSaleProducts.length > 0 && (
          <motion.section
            initial={{
              opacity: 0,
              scale: 0.96
            }}
            whileInView={{
              opacity: 1,
              scale: 1
            }}
            viewport={{
              once: true,
              amount: 0.2
            }}
            transition={{
              duration: 0.8,
              ease: [0.16, 1, 0.3, 1]
            }}
            className="bg-black/5 dark:bg-zinc-900/60 backdrop-blur-md border-y border-[#D7981A]/30 py-12"
          >

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">

              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-zinc-200/60 dark:border-zinc-800/80 pb-6">

                <div className="flex items-center gap-3">

                  <Flame className="w-8 h-8 text-rose-500 animate-pulse" />

                  <div>
                    <h2 className="text-2xl sm:text-3xl font-serif font-bold uppercase tracking-wider text-rose-500">
                      {t.flashSale}
                    </h2>

                    <p className="text-xs font-mono text-zinc-500 dark:text-zinc-400">
                      Exclusive limited time discounts in Egypt
                    </p>
                  </div>

                </div>

                <div className="flex items-center gap-2 text-xs font-mono bg-white/80 dark:bg-black/80 backdrop-blur-md px-4 py-2 border border-[#D7981A]/40 text-black dark:text-white">

                  <Clock className="w-4 h-4 text-amber-500" />

                  <span>ENDS IN:</span>

                  <span className="font-bold text-[#D7981A]">
                    {String(timeLeft.hours).padStart(2, '0')}:
                    {String(timeLeft.minutes).padStart(2, '0')}:
                    {String(timeLeft.seconds).padStart(2, '0')}
                  </span>

                </div>

              </div>

              <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">

                {flashSaleProducts.slice(0, 4).map((product, idx) => (
                  <motion.div
                    key={product.id}
                    initial={{
                      opacity: 0,
                      y: 35
                    }}
                    whileInView={{
                      opacity: 1,
                      y: 0
                    }}
                    viewport={{
                      once: true
                    }}
                    transition={{
                      duration: 0.5,
                      delay: idx * 0.12
                    }}
                  >
                    <ProductCard product={product} />
                  </motion.div>
                ))}

              </div>

            </div>
          </motion.section>
        )}

        {/* 6. New Arrivals */}

        <motion.section
          initial={{
            opacity: 0,
            y: 50
          }}
          whileInView={{
            opacity: 1,
            y: 0
          }}
          viewport={{
            once: true,
            amount: 0.2
          }}
          transition={{
            duration: 0.8
          }}
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8"
        >

          <div className="flex justify-between items-end border-b border-zinc-200 dark:border-zinc-800 pb-4">

            <div>
              <span className="text-[10px] font-mono tracking-[0.3em] uppercase text-zinc-400">
                JUST DROPPED
              </span>

              <h2 className="text-2xl sm:text-3xl font-serif font-bold uppercase tracking-wider text-black dark:text-white">
                {t.newCollection}
              </h2>
            </div>

            <button
              onClick={() => {
                setFilters(prev => ({
                  ...prev,
                  onlyNew: true
                }));

                navigateTo('shop');
              }}
              className="text-xs font-mono font-bold uppercase tracking-widest underline hover:opacity-75"
            >
              {t.viewAll}
            </button>

          </div>

          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">

            {newArrivals.slice(0, 4).map((product, idx) => (
              <motion.div
                key={product.id}
                initial={{
                  opacity: 0,
                  y: 35
                }}
                whileInView={{
                  opacity: 1,
                  y: 0
                }}
                viewport={{
                  once: true
                }}
                transition={{
                  duration: 0.5,
                  delay: idx * 0.1
                }}
              >
                <ProductCard product={product} />
              </motion.div>
            ))}

          </div>
        </motion.section>

        {/* 7. Best Sellers */}

        <motion.section
          initial={{
            opacity: 0,
            y: 50
          }}
          whileInView={{
            opacity: 1,
            y: 0
          }}
          viewport={{
            once: true,
            amount: 0.2
          }}
          transition={{
            duration: 0.8
          }}
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8"
        >

          <div className="flex justify-between items-end border-b border-zinc-200 dark:border-zinc-800 pb-4">

            <div>
              <span className="text-[10px] font-mono tracking-[0.3em] uppercase text-zinc-400">
                MOST WANTED
              </span>

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

          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">

            {bestSellers.slice(0, 4).map((product, idx) => (
              <motion.div
                key={product.id}
                initial={{
                  opacity: 0,
                  y: 35
                }}
                whileInView={{
                  opacity: 1,
                  y: 0
                }}
                viewport={{
                  once: true
                }}
                transition={{
                  duration: 0.5,
                  delay: idx * 0.1
                }}
              >
                <ProductCard product={product} />
              </motion.div>
            ))}

          </div>
        </motion.section>

        {/* 8. Instagram */}

        <motion.section
          initial={{
            opacity: 0,
            y: 60
          }}
          whileInView={{
            opacity: 1,
            y: 0
          }}
          viewport={{
            once: true,
            amount: 0.2
          }}
          transition={{
            duration: 0.8
          }}
          className="bg-black/5 dark:bg-white/5 backdrop-blur-md border-y border-[#D7981A]/20 py-16"
        >

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">

            <div className="text-center max-w-xl mx-auto space-y-2">

              <Instagram className="w-8 h-8 mx-auto text-black dark:text-white" />

              <h2 className="text-2xl font-serif font-bold uppercase tracking-wider">
                #ZEGYPT ON INSTAGRAM
              </h2>

              <p className="text-xs text-zinc-500 font-mono">
                Tag @z_egypt to be featured in our official digital lookbook gallery.
              </p>

            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">

              {[
                '/images/0102.jpg',
                '/images/0104.jpg',
                '/images/0100.jpg',
                '/images/0106.jpg'
              ].map((img, idx) => (

                <motion.div
                  key={idx}
                  initial={{
                    opacity: 0,
                    scale: 0.88,
                    y: 30
                  }}
                  whileInView={{
                    opacity: 1,
                    scale: 1,
                    y: 0
                  }}
                  viewport={{
                    once: true
                  }}
                  transition={{
                    duration: 0.6,
                    delay: idx * 0.12
                  }}
                  whileHover={{
                    scale: 1.04
                  }}
                  className="group relative aspect-square overflow-hidden bg-black cursor-pointer rounded-lg shadow-xl"
                >

                  <img
                    src={img}
                    alt="Instagram Look"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-90 group-hover:opacity-100"
                  />

                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white text-xs font-mono">
                    <span>@Z_EGYPT</span>
                  </div>

                </motion.div>

              ))}

            </div>

          </div>
        </motion.section>

        {/* 9. Customer Reviews */}

        <motion.section
          initial={{
            opacity: 0,
            y: 50
          }}
          whileInView={{
            opacity: 1,
            y: 0
          }}
          viewport={{
            once: true,
            amount: 0.2
          }}
          transition={{
            duration: 0.8
          }}
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8"
        >

          <div className="text-center max-w-md mx-auto space-y-2">

            <span className="text-[10px] font-mono tracking-[0.3em] uppercase text-zinc-400">
              VERIFIED FEEDBACK
            </span>

            <h2 className="text-2xl font-serif font-bold uppercase tracking-wider text-black dark:text-white">
              WHAT OUR CLIENTS SAY
            </h2>

          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

            {[
              {
                name: 'Nour El-Din, Cairo',
                reviewEn:
                  'The oversized coat arrived in 2 days in Cairo! Quality is identical to Z stores in Europe. Packaging was luxury.',
                reviewAr:
                  'المعطف وصل خلال يومين فقط بالقاهرة! الجودة ممتازة ومطابقة لمتاجر Z في أوروبا.',
                rating: 5
              },
              {
                name: 'Sherif Mansour, Alexandria',
                reviewEn:
                  'Fawry payment worked seamlessly. Customer service helped me pick the right size for the blazer.',
                reviewAr:
                  'الدفع عن طريق فوري كان سريع جداً ومريح. وخدمة العملاء ساعدتني في اختيار المقاس المضبوط.',
                rating: 5
              },
              {
                name: 'Yasmine Helmy, Giza',
                reviewEn:
                  'The leather city bag is genuine leather and smells amazing. Will definitely order again from Z Egypt online.',
                reviewAr:
                  'الحقيبة الجلدية رائعة وخامتها طبيعية ممتازة. تجربة شراء ممتازة من الموقع.',
                rating: 5
              }
            ].map((item, idx) => (

              <motion.div
                key={idx}
                initial={{
                  opacity: 0,
                  y: 35,
                  scale: 0.96
                }}
                whileInView={{
                  opacity: 1,
                  y: 0,
                  scale: 1
                }}
                viewport={{
                  once: true
                }}
                transition={{
                  duration: 0.6,
                  delay: idx * 0.15
                }}
                whileHover={{
                  y: -4
                }}
                className="p-6 bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 space-y-3 rounded-lg shadow-lg"
              >

                <div className="flex text-amber-400 gap-1">

                  {Array.from({
                    length: item.rating
                  }).map((_, i) => (
                    <Star
                      key={i}
                      className="w-4 h-4 fill-amber-400"
                    />
                  ))}

                </div>

                <p className="text-xs text-zinc-600 dark:text-zinc-300 leading-relaxed font-sans italic">
                  "
                  {language === 'ar'
                    ? item.reviewAr
                    : item.reviewEn}
                  "
                </p>

                <div className="pt-2 border-t border-zinc-100 dark:border-zinc-900 flex justify-between items-center text-[10px] font-mono text-zinc-400">

                  <span className="font-bold text-black dark:text-white">
                    {item.name}
                  </span>

                  <span className="text-emerald-600 font-bold">
                    ✓ Verified Buyer
                  </span>

                </div>

              </motion.div>

            ))}

          </div>
        </motion.section>

      </div>
    </div>
  );
};