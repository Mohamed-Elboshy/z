import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { translations } from '../../translations/i18n';
import { Search, Heart, ShoppingBag, User, Sun, Moon, Scale, Menu, X, Globe, ShieldAlert, Truck } from 'lucide-react';

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
    compareList,
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
      selectedCategory: category
    }));
    navigateTo('shop');
    setIsMobileMenuOpen(false);
  };

  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);

  return (
    <header className="sticky top-0 z-40 bg-black/40 backdrop-blur-2xl border-b border-white/10 transition-colors">
      {/* Top Announcement Bar */}
      <div className="bg-black text-white dark:bg-zinc-950 dark:text-zinc-200 text-[10px] font-sans tracking-[0.25em] py-2 px-6 text-center flex justify-between items-center border-b border-white/10">
        <div className="hidden sm:flex items-center gap-2 text-zinc-400 uppercase">
          <Truck className="w-3.5 h-3.5 text-white" />
          <span>{t.freeShippingNotice}</span>
        </div>
        <div className="mx-auto sm:mx-0 font-bold tracking-[0.3em] uppercase">
          {t.freeReturnsNotice}
        </div>
        <div className="hidden md:flex items-center gap-6 text-zinc-400 text-[10px] tracking-widest uppercase">
          <button
            onClick={() => navigateTo('tracking')}
            className="hover:text-white transition-colors cursor-pointer"
          >
            {t.nav.trackOrder}
          </button>
          <span>|</span>
          <button
            onClick={() => navigateTo('admin')}
            className="hover:text-amber-300 transition-colors cursor-pointer flex items-center gap-1 text-amber-300 font-semibold"
          >
            <ShieldAlert className="w-3 h-3" />
            {t.nav.admin}
          </button>
        </div>
      </div>

      {/* Main Editorial Bar */}
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 h-20 sm:h-24 flex items-center justify-between">
        {/* Left: Mobile Menu Trigger + Clean Minimal Navigation */}
        <div className="flex items-center gap-6">
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-1 text-black dark:text-white hover:opacity-75"
            aria-label="Toggle Menu"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>

          {/* Clean Minimalism Navigation Links */}
          <nav className="hidden lg:flex items-center gap-6 text-[11px] tracking-[0.2em] uppercase font-bold text-black dark:text-white">
            <button
              onClick={() => handleCategoryClick('Women')}
              className={`hover:underline underline-offset-4 cursor-pointer ${
                activePage === 'shop' ? 'underline font-extrabold' : ''
              }`}
            >
              {t.nav.women}
            </button>
            <button
              onClick={() => handleCategoryClick('Men')}
              className="hover:underline underline-offset-4 cursor-pointer"
            >
              {t.nav.men}
            </button>
            <button
              onClick={() => handleCategoryClick('Kids')}
              className="hover:underline underline-offset-4 cursor-pointer"
            >
              {t.nav.kids}
            </button>
            <button
              onClick={() => handleCategoryClick('All', 'Bags')}
              className="hover:underline underline-offset-4 cursor-pointer"
            >
              {t.nav.bags}
            </button>
            <button
              onClick={() => handleCategoryClick('All', 'Shoes')}
              className="hover:underline underline-offset-4 cursor-pointer"
            >
              {t.nav.shoes}
            </button>
            <button
              onClick={() => handleCategoryClick('All', 'Perfumes')}
              className="hover:underline underline-offset-4 cursor-pointer"
            >
              {t.nav.perfumes}
            </button>
            <button
              onClick={() => {
                setFilters(prev => ({ ...prev, onlySale: true, selectedGender: 'All', selectedCategory: 'All' }));
                navigateTo('shop');
              }}
              className="text-red-600 dark:text-red-400 font-black hover:opacity-80 transition-opacity cursor-pointer"
            >
              {t.nav.sale}
            </button>
          </nav>
        </div>

        {/* Center: Brand Serif Logo (Clean Minimalism Signature ZARA) */}
        <div className="cursor-pointer text-center" onClick={() => navigateTo('home')}>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-serif font-black tracking-[-0.08em] text-black dark:text-white uppercase leading-[0.8]">
            ZARA
          </h1>
          <p className="hidden sm:block text-[8px] font-sans tracking-[0.45em] text-zinc-400 uppercase mt-1">
            {t.brandTagline}
          </p>
        </div>

        {/* Right Actions (Editorial Clean Buttons) */}
        <div className="flex items-center gap-4 sm:gap-6">
          {/* Editorial Search Bar Link */}
          <button
            onClick={() => setIsSearchOpen(true)}
            className="hidden sm:flex items-center gap-1.5 text-[10px] tracking-[0.2em] uppercase border-b border-black dark:border-white pb-0.5 text-black dark:text-white font-medium hover:opacity-60 transition-opacity cursor-pointer"
          >
            <Search className="w-3.5 h-3.5" />
            <span>{t.searchPlaceholder.split(' ')[0]}</span>
          </button>
          
          <button
            onClick={() => setIsSearchOpen(true)}
            className="sm:hidden p-1 text-black dark:text-white"
          >
            <Search className="w-5 h-5" />
          </button>

          {/* Language Switcher */}
          <button
            onClick={() => setLanguage(language === 'en' ? 'ar' : 'en')}
            className="flex items-center gap-1 text-[10px] tracking-[0.2em] font-medium text-black dark:text-white hover:opacity-60 transition-opacity uppercase cursor-pointer"
            title="Switch Language"
          >
            <Globe className="w-3.5 h-3.5" />
            <span>{language === 'en' ? 'AR' : 'EN'}</span>
          </button>

          {/* Currency Switcher */}
          <select
            value={currency}
            onChange={e => setCurrency(e.target.value as any)}
            className="bg-transparent text-[10px] tracking-widest font-mono font-bold uppercase text-black dark:text-white border-none focus:outline-none cursor-pointer"
          >
            <option value="EGP" className="bg-white dark:bg-zinc-900">EGP (ج.م)</option>
            <option value="USD" className="bg-white dark:bg-zinc-900">USD ($)</option>
            <option value="EUR" className="bg-white dark:bg-zinc-900">EUR (€)</option>
            <option value="SAR" className="bg-white dark:bg-zinc-900">SAR (رس)</option>
            <option value="AED" className="bg-white dark:bg-zinc-900">AED (د.إ)</option>
          </select>

          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="p-1 text-black dark:text-white hover:opacity-60 transition-opacity cursor-pointer"
            title="Toggle Light/Dark Theme"
          >
            {theme === 'light' ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
          </button>

          {/* User Account */}
          <button
            onClick={() => navigateTo(user ? 'profile' : 'account')}
            className="text-[10px] tracking-[0.2em] font-medium uppercase text-black dark:text-white hover:opacity-60 transition-opacity hidden sm:inline-block cursor-pointer"
          >
            {user ? user.firstName : t.nav.account}
          </button>
          
          <button
            onClick={() => navigateTo(user ? 'profile' : 'account')}
            className="sm:hidden p-1 text-black dark:text-white"
          >
            <User className="w-5 h-5" />
          </button>

          {/* Shopping Bag */}
          <button
            onClick={() => setIsCartDrawerOpen(true)}
            className="flex items-center gap-1 text-[10px] tracking-[0.2em] font-bold uppercase text-black dark:text-white hover:opacity-60 transition-opacity cursor-pointer"
          >
            <ShoppingBag className="w-4 h-4 sm:hidden" />
            <span className="hidden sm:inline">{t.nav.cart}</span>
            <span>({cartCount})</span>
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-white dark:bg-zinc-950 border-b border-zinc-200 dark:border-zinc-800 px-6 py-6 space-y-4 text-xs font-sans tracking-widest uppercase font-semibold">
          <div className="grid grid-cols-2 gap-3 text-zinc-900 dark:text-zinc-100">
            <button onClick={() => handleCategoryClick('Women')} className="text-left py-2 border-b border-zinc-100 dark:border-zinc-800">
              {t.nav.women}
            </button>
            <button onClick={() => handleCategoryClick('Men')} className="text-left py-2 border-b border-zinc-100 dark:border-zinc-800">
              {t.nav.men}
            </button>
            <button onClick={() => handleCategoryClick('Kids')} className="text-left py-2 border-b border-zinc-100 dark:border-zinc-800">
              {t.nav.kids}
            </button>
            <button onClick={() => handleCategoryClick('All', 'Bags')} className="text-left py-2 border-b border-zinc-100 dark:border-zinc-800">
              {t.nav.bags}
            </button>
            <button onClick={() => handleCategoryClick('All', 'Shoes')} className="text-left py-2 border-b border-zinc-100 dark:border-zinc-800">
              {t.nav.shoes}
            </button>
            <button onClick={() => handleCategoryClick('All', 'Perfumes')} className="text-left py-2 border-b border-zinc-100 dark:border-zinc-800">
              {t.nav.perfumes}
            </button>
          </div>
          <div className="pt-2 flex flex-col gap-2">
            <button onClick={() => { navigateTo('shop'); setIsMobileMenuOpen(false); }} className="py-2 text-left font-bold text-black dark:text-white">
              {t.nav.shop}
            </button>
            <button onClick={() => { navigateTo('tracking'); setIsMobileMenuOpen(false); }} className="py-2 text-left text-zinc-600 dark:text-zinc-400">
              {t.nav.trackOrder}
            </button>
            <button onClick={() => { navigateTo('admin'); setIsMobileMenuOpen(false); }} className="py-2 text-left text-amber-600 dark:text-amber-400 font-bold">
              {t.nav.admin}
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
