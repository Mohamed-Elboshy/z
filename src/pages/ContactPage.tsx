import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { translations } from '../translations/i18n';
import { Mail, Phone, MapPin, Send } from 'lucide-react';

export const ContactPage: React.FC = () => {
  const { language, addToast } = useApp();
  const t = translations[language];

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addToast(language === 'ar' ? 'تم إرسال رسالتك بنجاح وسيتواصل معك الفريق قريبًا' : 'Message sent successfully. Our team will contact you shortly.', 'success');
    setName('');
    setEmail('');
    setMessage('');
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-12">
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-serif font-bold uppercase tracking-wider">{t.contact.title}</h1>
        <p className="text-xs font-mono text-zinc-500">{t.contact.subtitle}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Contact Info */}
        <div className="space-y-6 text-xs font-mono">
          <div className="p-6 bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 space-y-4">
            <div className="flex items-center gap-3">
              <MapPin className="w-5 h-5 text-amber-500" />
              <div>
                <p className="font-bold text-black dark:text-white">STORE ADDRESS</p>
                <p className="text-zinc-500">Mall of Egypt, Giza, Cairo, Egypt</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Phone className="w-5 h-5 text-amber-500" />
              <div>
                <p className="font-bold text-black dark:text-white">CUSTOMER HELPLINE</p>
                <p className="text-zinc-500">+20 19000 (Zara Egypt Toll Free)</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Mail className="w-5 h-5 text-amber-500" />
              <div>
                <p className="font-bold text-black dark:text-white">EMAIL SUPPORT</p>
                <p className="text-zinc-500">support.egypt@zara.com</p>
              </div>
            </div>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4 text-xs font-mono">
          <div>
            <label className="block mb-1 font-bold">Your Name</label>
            <input
              type="text"
              required
              value={name}
              onChange={e => setName(e.target.value)}
              className="w-full bg-white dark:bg-black border p-3 focus:outline-none"
            />
          </div>
          <div>
            <label className="block mb-1 font-bold">Your Email</label>
            <input
              type="email"
              required
              value={email}
              onChange={e => setEmail(e.target.value)}
              className="w-full bg-white dark:bg-black border p-3 focus:outline-none"
            />
          </div>
          <div>
            <label className="block mb-1 font-bold">Message / Inquiry</label>
            <textarea
              rows={4}
              required
              value={message}
              onChange={e => setMessage(e.target.value)}
              className="w-full bg-white dark:bg-black border p-3 focus:outline-none font-mono"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-black text-white dark:bg-white dark:text-black py-4 text-xs font-bold tracking-widest uppercase hover:opacity-90 flex items-center justify-center gap-2"
          >
            <span>{t.contact.sendBtn}</span>
            <Send className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
};
