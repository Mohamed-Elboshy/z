import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { translations } from '../../translations/i18n';
import { Search, X, ArrowRight, TrendingUp, Mic, MicOff } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export const SearchBarModal: React.FC = () => {
  const {
    language,
    products,
    isSearchOpen,
    setIsSearchOpen,
    navigateTo,
    formatPrice,
    setFilters
  } = useApp();

  const [query, setQuery] = useState('');
  const [isListening, setIsListening] = useState(false);
  const t = translations[language];

  useEffect(() => {
    if (!isSearchOpen) {
      setQuery('');
      setIsListening(false);
    }
  }, [isSearchOpen]);

  const handleVoiceSearch = () => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert(language === 'ar' ? 'البحث الصوتي غير مدعوم في متصفحك' : 'Voice Search is not supported in your browser');
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = language === 'ar' ? 'ar-EG' : 'en-US';
    recognition.interimResults = false;

    recognition.onstart = () => {
      setIsListening(true);
    };

    recognition.onresult = (event: any) => {
      const speechToText = event.results[0][0].transcript;
      setQuery(speechToText);
      setIsListening(false);
    };

    recognition.onerror = () => {
      setIsListening(false);
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognition.start();
  };

  if (!isSearchOpen) return null;

  const results = query.trim()
    ? products.filter(
        p =>
          p.nameEn.toLowerCase().includes(query.toLowerCase()) ||
          p.nameAr.includes(query) ||
          p.tags.some(t => t.toLowerCase().includes(query.toLowerCase())) ||
          p.category.toLowerCase().includes(query.toLowerCase())
      )
    : [];

  const popularSearches = ['Trench Coat', 'Leather Bag', 'Perfume', 'Blazer', 'Dress', 'Loafers'];

  const handleSelectPopular = (term: string) => {
    setQuery(term);
  };

  const handleFullSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      setFilters(prev => ({ ...prev, searchQuery: query.trim() }));
      setIsSearchOpen(false);
      navigateTo('shop');
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 overflow-y-auto bg-black/70 backdrop-blur-md flex flex-col items-center pt-16 px-4">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="w-full max-w-3xl bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 shadow-2xl border border-zinc-200 dark:border-zinc-800 p-6 sm:p-8 relative"
        >
          {/* Close button */}
          <button
            onClick={() => setIsSearchOpen(false)}
            className="absolute top-6 right-6 p-1 text-zinc-400 hover:text-black dark:hover:text-white cursor-pointer"
          >
            <X className="w-6 h-6" />
          </button>

          <h3 className="text-xs font-serif font-bold tracking-widest uppercase mb-4 text-zinc-400">
            {t.liveSearch}
          </h3>

          {/* Search Input */}
          <form onSubmit={handleFullSearchSubmit} className="relative mb-6">
            <Search className="w-5 h-5 text-zinc-400 absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              autoFocus
              value={query}
              onChange={e => setQuery(e.target.value)}
              placeholder={t.searchPlaceholder}
              className="w-full bg-zinc-100 dark:bg-zinc-900 text-black dark:text-white pl-12 pr-24 py-4 text-sm font-sans tracking-wide border-b-2 border-black dark:border-white focus:outline-none"
            />
            <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center gap-2">
              <button
                type="button"
                onClick={handleVoiceSearch}
                className={`p-2 rounded-full transition-colors cursor-pointer ${
                  isListening
                    ? 'bg-red-500 text-white animate-bounce'
                    : 'text-zinc-400 hover:text-black dark:hover:text-white'
                }`}
                title="Voice Search"
              >
                {isListening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
              </button>
              {query && (
                <button
                  type="button"
                  onClick={() => setQuery('')}
                  className="text-zinc-400 hover:text-black dark:hover:text-white cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
          </form>

          {/* Popular Searches Tags */}
          {!query && (
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-xs font-mono font-semibold text-zinc-400">
                <TrendingUp className="w-4 h-4 text-amber-500" />
                <span>{t.popularSearches}</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {popularSearches.map(term => (
                  <button
                    key={term}
                    onClick={() => handleSelectPopular(term)}
                    className="px-3 py-1.5 bg-zinc-100 dark:bg-zinc-900 hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black text-xs font-mono transition-colors"
                  >
                    {term}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Instant Search Results */}
          {query.trim() !== '' && (
            <div className="mt-6 space-y-4">
              <p className="text-xs font-mono text-zinc-400">
                {results.length} {t.filter.products} found
              </p>

              {results.length === 0 ? (
                <div className="text-center py-8 text-zinc-400 text-xs">
                  {t.noResults}
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-h-96 overflow-y-auto pr-2">
                  {results.slice(0, 6).map(product => (
                    <div
                      key={product.id}
                      onClick={() => {
                        setIsSearchOpen(false);
                        navigateTo('product', product.id);
                      }}
                      className="flex items-center gap-3 p-2 hover:bg-zinc-100 dark:hover:bg-zinc-900 cursor-pointer border border-zinc-100 dark:border-zinc-900 transition-colors"
                    >
                      <img
                        src={product.images[0]}
                        alt={product.nameEn}
                        className="w-14 h-18 object-cover bg-zinc-100 dark:bg-zinc-800 shrink-0"
                      />
                      <div className="overflow-hidden">
                        <span className="text-[10px] font-mono text-zinc-400 uppercase">
                          {product.category}
                        </span>
                        <h4 className="text-xs font-sans font-bold uppercase truncate">
                          {language === 'ar' ? product.nameAr : product.nameEn}
                        </h4>
                        <span className="text-xs font-mono font-semibold text-amber-600 dark:text-amber-400">
                          {formatPrice(product.price)}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {results.length > 0 && (
                <button
                  onClick={handleFullSearchSubmit}
                  className="w-full mt-4 bg-black text-white dark:bg-white dark:text-black py-3 text-xs font-bold tracking-widest uppercase flex items-center justify-center gap-2"
                >
                  <span>View All Results for "{query}"</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              )}
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
