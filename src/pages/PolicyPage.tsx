import React from 'react';
import { useApp } from '../context/AppContext';
import { translations } from '../translations/i18n';

export const PolicyPage: React.FC = () => {
  const { language } = useApp();
  const t = translations[language];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-8 font-mono text-xs leading-relaxed text-zinc-600 dark:text-zinc-300">
      <div className="border-b pb-4">
        <h1 className="text-3xl font-serif font-bold uppercase tracking-wider text-black dark:text-white">
          POLICIES & LEGAL TERMS
        </h1>
        <p className="text-zinc-500 mt-1">Z Egypt Terms of Service, Privacy Policy & Consumer Rights</p>
      </div>

      <div className="space-y-4">
        <h2 className="text-sm font-serif font-bold uppercase text-black dark:text-white">1. PRIVACY & DATA SECURITY</h2>
        <p>
          Z Egypt respects your privacy. All customer transactions processed via Fawry, InstaPay, Visa, and Meeza adhere to PCI-DSS compliance standards. Personal credentials, phone numbers, and delivery addresses are encrypted.
        </p>
      </div>

      <div className="space-y-4">
        <h2 className="text-sm font-serif font-bold uppercase text-black dark:text-white">2. EGYPT CONSUMER PROTECTION COMPLIANCE</h2>
        <p>
          In accordance with Egyptian Consumer Protection Law No. 181 of 2018, customers retain the right to return or exchange products within 14 days without defect, or within 30 days if a manufacturing defect is present.
        </p>
      </div>
    </div>
  );
};
