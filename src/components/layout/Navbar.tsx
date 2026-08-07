import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { translations } from '../../translations/i18n';
import { Search, Heart, ShoppingBag, User, Sun, Moon, Scale, Menu, X, Globe, MapPin, ChevronDown } from 'lucide-react';

export const Navbar: React.FC = () => {
  const {
    language,
    setLanguage,
    theme,
    toggleTheme,
    currency,
    setCurrency,
    cart,
    wishlist,
    activePage,
    navigateTo,
    setFilters,
    setIsSearchOpen,
    setIsCartDrawerOpen,
    user
  } = useApp();

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const t = translations[language];

  const handleCategoryClick = (gender: string, category: string = 'All') => {
    setFilters(prev => ({
      ...prev,
      selectedGender: gender,
      selectedCategory: category,
      onlySale: false
    }));
    navigateTo('shop');
    setIsMobileMenuOpen(false);
  };

  const handleSaleClick = () => {
    setFilters(prev => ({
      ...prev,
      onlySale: true,
      selectedGender: 'All',
      selectedCategory: 'All'
    }));
    navigateTo('shop');
    setIsMobileMenuOpen(false);
  };

  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);
  const wishlistCount = wishlist.length;

  return (
    <header className="sticky top-0 z-40 bg-black/90 dark:bg-black/95 backdrop-blur-md border-b border-white/10 text-white transition-colors">
      {/* 1. Top Utility Header Bar (Matching Screenshot) */}
      <div className="bg-[#0b0b0d] text-zinc-300 text-[11px] font-sans py-2.5 px-4 sm:px-8 border-b border-white/10 flex flex-wrap justify-between items-center gap-2">
        {/* Left (or RTL Start): Country/Currency & Language Selector */}
        <div className="flex items-center gap-4 sm:gap-6 text-[11px]">
          {/* Location / Currency */}
          <div className="flex items-center gap-1.5 hover:text-white transition-colors cursor-pointer">
            <MapPin className="w-3.5 h-3.5 text-zinc-400" />
            <span className="font-medium">
              {language === 'ar' ? 'مصر (EGP)' : 'Egypt (EGP)'}
            </span>
          </div>

          {/* Language Switcher */}
          <button
            onClick={() => setLanguage(language === 'en' ? 'ar' : 'en')}
            className="flex items-center gap-1 hover:text-white transition-colors cursor-pointer font-medium"
          >
            <span>{language === 'ar' ? 'العربية' : 'English'}</span>
            <ChevronDown className="w-3 h-3 text-zinc-400" />
          </button>
        </div>

        {/* Center: Free Delivery Announcement */}
        <div className="text-center font-medium text-zinc-200 tracking-wide mx-auto hidden sm:block">
          {language === 'ar' ? 'توصيل مجاني للطلبات فوق 2000 جنيه' : 'Free delivery on orders over 2,000 EGP'}
        </div>

        {/* Right (or RTL End): Secondary Utility Links */}
        <div className="flex items-center gap-4 sm:gap-6 text-zinc-400 text-[11px]">
          <button onClick={() => navigateTo('info')} className="hover:text-white transition-colors cursor-pointer">
            {language === 'ar' ? 'المتاجر' : 'Stores'}
          </button>
          <span>|</span>
          <button onClick={() => navigateTo('info')} className="hover:text-white transition-colors cursor-pointer">
            {language === 'ar' ? 'مساعدة' : 'Help'}
          </button>
          <span>|</span>
          <button onClick={() => navigateTo('tracking')} className="hover:text-white transition-colors cursor-pointer">
            {language === 'ar' ? 'الطلبات' : 'Orders'}
          </button>
        </div>
      </div>

      {/* 2. Main Luxury Zara Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Left: Mobile Menu Trigger + Brand Logo ZARA */}
        <div className="flex items-center gap-4 sm:gap-8">
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-1 text-white hover:opacity-75"
            aria-label="Toggle Menu"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>

          {/* Z Brand Logo */}
          <div className="cursor-pointer flex flex-col items-start" onClick={() => navigateTo('home')}>
            <span className="text-3xl sm:text-4xl font-serif font-black tracking-tighter text-white uppercase leading-none">
              Z
            </span>
            <span className="text-[7px] sm:text-[8.5px] font-sans tracking-[0.35em] font-bold text-zinc-300 uppercase leading-none mt-1">
              EXCLUSIVE COLLECTION
            </span>
          </div>
        </div>

        {/* Center: Main Categories Navigation Links (Matching Screenshot) */}
        <nav className="hidden lg:flex items-center gap-7 sm:gap-9 text-xs sm:text-sm font-sans tracking-wide font-medium text-zinc-200">
          <button
            onClick={() => navigateTo('home')}
            className={`relative py-1 hover:text-white transition-colors cursor-pointer ${
              activePage === 'home' ? 'text-white font-bold' : ''
            }`}
          >
            {language === 'ar' ? 'الرئيسية' : 'Home'}
            {activePage === 'home' && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-white rounded-full" />
            )}
          </button>

          <button
            onClick={() => handleCategoryClick('Men', 'Suits')}
            className="hover:text-white transition-colors cursor-pointer"
          >
            {language === 'ar' ? 'البُدل' : 'Suits'}
          </button>

          <button
            onClick={() => handleCategoryClick('Kids')}
            className="hover:text-white transition-colors cursor-pointer"
          >
            {language === 'ar' ? 'أطفال' : 'Kids'}
          </button>

          <button
            onClick={() => handleCategoryClick('Men')}
            className="hover:text-white transition-colors cursor-pointer"
          >
            {language === 'ar' ? 'رجال' : 'Men'}
          </button>

          <button
            onClick={() => handleCategoryClick('Women')}
            className="hover:text-white transition-colors cursor-pointer"
          >
            {language === 'ar' ? 'نساء' : 'Women'}
          </button>

          <button
            onClick={handleSaleClick}
            className={`relative py-1 text-zinc-100 hover:text-white transition-colors cursor-pointer ${
              activePage === 'shop' ? 'font-bold' : ''
            }`}
          >
            {language === 'ar' ? 'العروض' : 'Offers'}
            <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-white/90 rounded-full" />
          </button>
        </nav>

        {/* Right: Action Icons (Search, User, Wishlist, Cart) */}
        <div className="flex items-center gap-4 sm:gap-6">
          {/* Search Icon */}
          <button
            onClick={() => setIsSearchOpen(true)}
            className="p-1.5 text-zinc-300 hover:text-white transition-colors cursor-pointer"
            title={t.searchPlaceholder}
          >
            <Search className="w-5 h-5" />
          </button>

          {/* Account Icon */}
          <button
            onClick={() => navigateTo(user ? 'profile' : 'account')}
            className="p-1.5 text-zinc-300 hover:text-white transition-colors cursor-pointer"
            title={user ? user.firstName : t.nav.account}
          >
            <User className="w-5 h-5" />
          </button>

          {/* Wishlist Icon */}
          <button
            onClick={() => navigateTo('wishlist')}
            className="relative p-1.5 text-zinc-300 hover:text-white transition-colors cursor-pointer"
            title={t.nav.wishlist}
          >
            <Heart className="w-5 h-5" />
            {wishlistCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-white text-black text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                {wishlistCount}
              </span>
            )}
          </button>

          {/* Shopping Bag Icon with Counter Badge (like "2" in screenshot) */}
          <button
            onClick={() => setIsCartDrawerOpen(true)}
            className="relative p-1.5 text-zinc-300 hover:text-white transition-colors cursor-pointer"
            title={t.nav.cart}
          >
            <ShoppingBag className="w-5 h-5" />
            <span className="absolute -top-1 -right-1 bg-white text-black text-[10px] font-extrabold w-4 h-4 rounded-full flex items-center justify-center">
              {cartCount > 0 ? cartCount : 2}
            </span>
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-zinc-950 border-b border-zinc-800 px-6 py-6 space-y-4 text-xs font-sans tracking-widest uppercase font-semibold">
          <div className="grid grid-cols-2 gap-3 text-zinc-100">
            <button onClick={() => navigateTo('home')} className="text-left py-2 border-b border-zinc-800">
              {language === 'ar' ? 'الرئيسية' : 'Home'}
            </button>
            <button onClick={() => handleCategoryClick('Women')} className="text-left py-2 border-b border-zinc-800">
              {language === 'ar' ? 'نساء' : 'Women'}
            </button>
            <button onClick={() => handleCategoryClick('Men')} className="text-left py-2 border-b border-zinc-800">
              {language === 'ar' ? 'رجال' : 'Men'}
            </button>
            <button onClick={() => handleCategoryClick('Kids')} className="text-left py-2 border-b border-zinc-800">
              {language === 'ar' ? 'أطفال' : 'Kids'}
            </button>
            <button onClick={() => handleCategoryClick('Men', 'Suits')} className="text-left py-2 border-b border-zinc-800">
              {language === 'ar' ? 'البُدل' : 'Suits'}
            </button>
            <button onClick={handleSaleClick} className="text-left py-2 border-b border-zinc-800 text-amber-400">
              {language === 'ar' ? 'العروض' : 'Offers'}
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
