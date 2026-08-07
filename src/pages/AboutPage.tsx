import React from 'react';
import { useApp } from '../context/AppContext';
import { translations } from '../translations/i18n';
import { Sparkles, Globe, ShieldCheck } from 'lucide-react';

export const AboutPage: React.FC = () => {
  const { language } = useApp();
  const t = translations[language];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-12">
      <div className="text-center space-y-4">
        <span className="text-[10px] font-mono tracking-[0.4em] uppercase text-amber-500 font-bold">
          OUR HERITAGE & VISION
        </span>
        <h1 className="text-3xl sm:text-5xl font-serif font-black tracking-wider uppercase">
          {t.about.title}
        </h1>
        <p className="text-xs sm:text-sm font-mono text-zinc-500 max-w-xl mx-auto">
          {t.about.subtitle}
        </p>
      </div>

      <div className="aspect-video bg-black overflow-hidden relative">
        <img
          src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=1600&q=80"
          alt="Z Egypt Flagship"
          className="w-full h-full object-cover brightness-75"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-8 text-white">
          <div>
            <span className="text-xs font-mono uppercase text-amber-300">CAIRO FLAGSHIP STORE</span>
            <p className="text-sm font-serif font-bold">Mall of Egypt, Giza & Citystars, Heliopolis</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-xs font-mono leading-relaxed text-zinc-600 dark:text-zinc-300">
        <div className="space-y-3">
          <h2 className="text-sm font-serif font-bold uppercase text-black dark:text-white">
            ELEGANCE IN ACCESSIBILITY
          </h2>
          <p>
            Z Egypt represents the pinnacle of modern luxury retail. Driven by a commitment to architectural minimalism, high-grade fabrics, and rapid runway-to-street deployment, our Egyptian storefront serves millions of fashion enthusiasts across Cairo, Alexandria, Giza, and the Red Sea.
          </p>
        </div>
        <div className="space-y-3">
          <h2 className="text-sm font-serif font-bold uppercase text-black dark:text-white">
            LOCALIZED INNOVATION
          </h2>
          <p>
            With native Egyptian payment integrations like Fawry Pay, InstaPay, and Meeza, alongside express door-to-door courier tracking and localized Arabic RTL digital experiences, shopping with Z online is seamless, secure, and immediate.
          </p>
        </div>
      </div>
    </div>
  );
};
