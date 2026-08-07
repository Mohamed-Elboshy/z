import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { translations } from '../translations/i18n';
import { ChevronDown } from 'lucide-react';

export const FAQPage: React.FC = () => {
  const { language } = useApp();
  const t = translations[language];

  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const faqs = [
    {
      qEn: 'How does Fawry Pay work for my Z order?',
      qAr: 'كيف يعمل التدفّع عن طريق خدمة فوري لمشترياتي؟',
      aEn: 'Select Fawry at checkout to receive a unique 9-digit payment reference code. Take this reference code to any Fawry kiosk, retail store, or banking app in Egypt within 24 hours to complete your payment.',
      aAr: 'اختر فوري عند إتمام الطلب للحصول على كود دفع مكون من 9 أرقام. استخدم هذا الكود في أي منفذ فوري أو تطبيق بنكي خلال 24 ساعة.'
    },
    {
      qEn: 'What are the shipping fees across Egyptian Governorates?',
      qAr: 'ما هي رسوم الشحن لجميع المحافظات المصرية؟',
      aEn: 'Shipping is completely FREE for orders over 3,000 EGP. For orders below 3,000 EGP, a flat rate of 60 EGP applies across Cairo, Giza, Alexandria, Red Sea, and Upper Egypt.',
      aAr: 'الشحن مجاني تماماً للطلبات الأكبر من 3,000 جنيه مصري. للطلبات الأقل، التكلفة الثابتة هي 60 جنيه فقط لكل المحافظات.'
    },
    {
      qEn: 'What is the return and exchange policy?',
      qAr: 'ما هي سياسة الاستبدال والاسترجاع؟',
      aEn: 'You can exchange or return any unworn item with original tags within 30 days of delivery. Returns can be handed to our courier or dropped off at any official Z retail store in Egypt.',
      aAr: 'يمكنك استبدال أو إرجاع أي منتج بحالته الأصلية خلال 30 يوماً من الاستلام من خلال مندوبنا أو في متاجرنا.'
    },
    {
      qEn: 'How do I choose the accurate Z size for my body?',
      qAr: 'كيف أختار المقاس المناسب لجسدي بدقة؟',
      aEn: 'Use our interactive "Calculate My Size" tool on any product detail page. Enter your height, weight, and fit preference for an instant size recommendation based on real Z customer fit data.',
      aAr: 'استخدم حاسبة المقاس الذكية الموجودة بصفحة المنتج. أدخل طولك ووزنك ونمط مقاسك المفضل للحصول على المقاس الأنسب.'
    }
  ];

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-8">
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-serif font-bold uppercase tracking-wider">{t.faq.title}</h1>
        <p className="text-xs font-mono text-zinc-500">Everything you need to know about shopping with Z Egypt</p>
      </div>

      <div className="space-y-4">
        {faqs.map((faq, idx) => {
          const isOpen = openIdx === idx;
          return (
            <div
              key={idx}
              className="border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 font-mono text-xs overflow-hidden"
            >
              <button
                onClick={() => setOpenIdx(isOpen ? null : idx)}
                className="w-full p-4 text-left font-bold flex justify-between items-center text-black dark:text-white hover:bg-zinc-50 dark:hover:bg-zinc-900"
              >
                <span>{language === 'ar' ? faq.qAr : faq.qEn}</span>
                <ChevronDown className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
              </button>
              {isOpen && (
                <div className="p-4 pt-0 text-zinc-600 dark:text-zinc-400 leading-relaxed border-t border-zinc-100 dark:border-zinc-900">
                  {language === 'ar' ? faq.aAr : faq.aEn}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
