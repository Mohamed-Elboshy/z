import React from 'react';
import { useApp } from '../context/AppContext';
import { translations } from '../translations/i18n';
import { ArrowRight } from 'lucide-react';

export const NotFoundPage: React.FC = () => {
  const { language, navigateTo } = useApp();
  const t = translations[language];

  return (
    <div className="max-w-md mx-auto px-4 py-24 text-center space-y-6 font-mono">
      <span className="text-6xl font-serif font-black text-zinc-300 dark:text-zinc-700">404</span>
      <h1 className="text-2xl font-serif font-bold uppercase tracking-wider">{t.notFound.title}</h1>
      <p className="text-xs text-zinc-500">{t.notFound.subtitle}</p>
      <button
        onClick={() => navigateTo('home')}
        className="bg-black text-white dark:bg-white dark:text-black font-semibold text-xs tracking-widest uppercase px-8 py-4 hover:opacity-90 inline-flex items-center gap-2"
      >
        <span>{t.notFound.backHome}</span>
        <ArrowRight className="w-4 h-4" />
      </button>
    </div>
  );
};
