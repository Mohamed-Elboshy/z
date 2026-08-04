import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { translations } from '../../translations/i18n';
import { Mail, Phone, MapPin, CreditCard, ShieldCheck, ArrowRight } from 'lucide-react';

export const Footer: React.FC = () => {
  const { language, navigateTo, addToast } = useApp();
  const t = translations[language];
  const [email, setEmail] = useState('');

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      addToast(language === 'ar' ? 'يرجى إدخال بريد إلكتروني صحيح' : 'Please enter a valid email', 'error');
      return;
    }
    addToast(language === 'ar' ? 'شكراً لاشتراكك! استخدم كود ZARA20 للحصول على خصم 20%' : 'Subscribed! Use code ZARA20 for 20% off', 'success');
    setEmail('');
  };

  return (
    <footer className="surface-panel text-white pt-16 pb-12 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        
        {/* Newsletter Section */}
        <div className="border-b border-white/10 pb-12 mb-12 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div className="max-w-lg space-y-2">
            <h3 className="text-xl sm:text-2xl font-serif font-light tracking-[0.15em] uppercase">
              JOIN THE ZARA NEWSLETTER
            </h3>
            <p className="text-zinc-400 text-xs tracking-wider">
              Subscribe to receive private lookbooks, seasonal drops, and 20% off your first Egyptian order.
            </p>
          </div>
          <form onSubmit={handleSubscribe} className="flex w-full md:w-auto items-center max-w-md">
            <div className="relative flex-1">
              <Mail className="w-4 h-4 text-zinc-500 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder={t.account.emailLabel}
                className="w-full bg-zinc-900 border border-zinc-800 text-white pl-10 pr-4 py-3 text-xs focus:outline-none focus:border-white transition-colors tracking-wide font-sans"
              />
            </div>
            <button
              type="submit"
              className="bg-white text-black font-bold text-[10px] tracking-[0.2em] uppercase px-6 py-3.5 hover:bg-zinc-200 transition-colors flex items-center gap-1 shrink-0 cursor-pointer"
            >
              <span>{t.shopNow}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </form>
        </div>

        {/* Multi-Column Links */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 text-xs tracking-wider text-zinc-400">
          
          {/* Col 1: Brand & Egypt Stores */}
          <div className="space-y-4">
            <h4 className="text-white font-serif font-bold text-lg tracking-widest uppercase">
              ZARA EGYPT
            </h4>
            <p className="leading-relaxed text-zinc-400">{t.info.aboutText}</p>
            <div className="pt-2 space-y-2 text-zinc-300">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <span>{t.info.cairoStores}</span>
              </div>
              <div className="flex items-start gap-2">
                <Phone className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <span>{t.info.contactPhone}</span>
              </div>
            </div>
          </div>

          {/* Col 2: Help & Customer Care */}
          <div className="space-y-3">
            <h4 className="text-white font-serif font-bold text-sm tracking-widest uppercase">
              HELP & CONCIERGE
            </h4>
            <ul className="space-y-2">
              <li>
                <button onClick={() => navigateTo('tracking')} className="hover:text-white transition-colors">
                  {t.nav.trackOrder}
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('policy-shipping')} className="hover:text-white transition-colors">
                  {t.info.shippingTitle}
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('policy-returns')} className="hover:text-white transition-colors">
                  {t.info.returnsTitle}
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('faq')} className="hover:text-white transition-colors">
                  {t.info.faqTitle}
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('contact')} className="hover:text-white transition-colors">
                  {t.nav.contactUs}
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Shop Categories */}
          <div className="space-y-3">
            <h4 className="text-white font-serif font-bold text-sm tracking-widest uppercase">
              COLLECTIONS
            </h4>
            <ul className="space-y-2">
              <li>
                <button onClick={() => navigateTo('shop')} className="hover:text-white transition-colors">
                  {t.nav.women}
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('shop')} className="hover:text-white transition-colors">
                  {t.nav.men}
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('shop')} className="hover:text-white transition-colors">
                  {t.nav.kids}
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('shop')} className="hover:text-white transition-colors">
                  {t.nav.bags} & {t.nav.shoes}
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('shop')} className="hover:text-white transition-colors">
                  {t.nav.perfumes}
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Payment Badges & Egyptian Local Payment Methods */}
          <div className="space-y-4">
            <h4 className="text-white font-serif font-bold text-sm tracking-widest uppercase">
              PAYMENT OPTIONS
            </h4>
            <p className="text-zinc-400">
              We accept official local Egyptian payment options with 100% SSL secure encryption.
            </p>
            <div className="grid grid-cols-3 gap-2 pt-2">
              <div className="bg-zinc-900 border border-zinc-800 px-2 py-1.5 rounded text-center text-[10px] font-bold text-yellow-400">
                FAWRY
              </div>
              <div className="bg-zinc-900 border border-zinc-800 px-2 py-1.5 rounded text-center text-[10px] font-bold text-purple-400">
                INSTAPAY
              </div>
              <div className="bg-zinc-900 border border-zinc-800 px-2 py-1.5 rounded text-center text-[10px] font-bold text-emerald-400">
                MEEZA
              </div>
              <div className="bg-zinc-900 border border-zinc-800 px-2 py-1.5 rounded text-center text-[10px] font-bold text-blue-400">
                VISA
              </div>
              <div className="bg-zinc-900 border border-zinc-800 px-2 py-1.5 rounded text-center text-[10px] font-bold text-red-400">
                MASTERCARD
              </div>
              <div className="bg-zinc-900 border border-zinc-800 px-2 py-1.5 rounded text-center text-[10px] font-bold text-zinc-300">
                COD
              </div>
            </div>
            <div className="flex items-center gap-2 text-zinc-500 text-[11px] pt-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Verified 256-bit PCI DSS Security</span>
            </div>
          </div>
        </div>

        {/* Bottom Legal bar */}
        <div className="border-t border-zinc-800 mt-12 pt-8 flex flex-col sm:flex-row justify-between items-center text-[11px] text-zinc-500 gap-4">
          <p>© {new Date().getFullYear()} ZARA. ALL RIGHTS RESERVED. EGYPT FLAGSHIP STORE.</p>
          <div className="flex gap-6">
            <button onClick={() => navigateTo('policy-privacy')} className="hover:text-zinc-300">
              {t.info.privacyTitle}
            </button>
            <button onClick={() => navigateTo('policy-terms')} className="hover:text-zinc-300">
              {t.info.termsTitle}
            </button>
            <button onClick={() => navigateTo('about')} className="hover:text-zinc-300">
              {t.nav.aboutUs}
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};
