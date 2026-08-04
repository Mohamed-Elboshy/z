import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { translations } from '../translations/i18n';
import { Mail, Lock, User, ArrowRight, ShieldCheck } from 'lucide-react';

export const AuthPage: React.FC = () => {
  const { language, setUser, navigateTo, addToast } = useApp();
  const t = translations[language];

  const [mode, setMode] = useState<'login' | 'register' | 'forgot'>('login');
  
  // Login states
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');

  // Register states
  const [regFirstName, setRegFirstName] = useState('');
  const [regLastName, setRegLastName] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regPassword, setRegPassword] = useState('');
  const [regPhone, setRegPhone] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!loginEmail || !loginPassword) {
      addToast(language === 'ar' ? 'يرجى إدخال البريد وكلمة المرور' : 'Please enter email & password', 'error');
      return;
    }
    setUser({
      id: 'usr-new',
      firstName: loginEmail.split('@')[0] || 'Member',
      lastName: 'Zara',
      email: loginEmail,
      phone: '+20 100 123 4567',
      gender: 'female',
      country: 'Egypt',
      governorate: 'Cairo',
      city: 'Cairo',
      addresses: []
    });
    addToast(language === 'ar' ? 'تم تسجيل الدخول بنجاح' : 'Signed in successfully', 'success');
    navigateTo('profile');
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    setUser({
      id: 'usr-reg',
      firstName: regFirstName || 'Member',
      lastName: regLastName || 'Zara',
      email: regEmail,
      phone: regPhone || '+20 100 000 0000',
      gender: 'female',
      country: 'Egypt',
      governorate: 'Cairo',
      city: 'Cairo',
      addresses: []
    });
    addToast(language === 'ar' ? 'تم إنشاء الحساب بنجاح!' : 'Account registered successfully!', 'success');
    navigateTo('profile');
  };

  return (
    <div className="max-w-md mx-auto px-4 py-16 space-y-8">
      
      {/* Title */}
      <div className="text-center space-y-2">
        <h1 className="text-2xl font-serif font-bold uppercase tracking-wider">
          {mode === 'login' ? t.account.loginTitle : mode === 'register' ? t.account.registerTitle : t.account.forgotPasswordTitle}
        </h1>
        <p className="text-xs font-mono text-zinc-500">
          Access your Zara orders, saved addresses, and express checkout in Egypt.
        </p>
      </div>

      {/* LOGIN FORM */}
      {mode === 'login' && (
        <form onSubmit={handleLogin} className="space-y-4 text-xs font-mono">
          <div>
            <label className="block mb-1 font-bold">{t.account.emailLabel}</label>
            <input
              type="email"
              required
              value={loginEmail}
              onChange={e => setLoginEmail(e.target.value)}
              placeholder="name@domain.com"
              className="w-full bg-white dark:bg-black border p-3 focus:outline-none"
            />
          </div>

          <div>
            <label className="block mb-1 font-bold">{t.account.passwordLabel}</label>
            <input
              type="password"
              required
              value={loginPassword}
              onChange={e => setLoginPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full bg-white dark:bg-black border p-3 focus:outline-none"
            />
          </div>

          <div className="flex justify-between items-center text-[11px]">
            <label className="flex items-center gap-1.5 cursor-pointer">
              <input type="checkbox" defaultChecked className="accent-black dark:accent-white" />
              <span>{t.account.rememberMe}</span>
            </label>
            <button
              type="button"
              onClick={() => setMode('forgot')}
              className="underline text-zinc-500 hover:text-black dark:hover:text-white"
            >
              {t.account.forgotPasswordTitle}
            </button>
          </div>

          <button
            type="submit"
            className="w-full bg-black text-white dark:bg-white dark:text-black py-4 text-xs font-bold tracking-widest uppercase hover:opacity-90 flex items-center justify-center gap-2"
          >
            <span>{t.account.loginBtn}</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <div className="pt-4 text-center">
            <button
              type="button"
              onClick={() => setMode('register')}
              className="text-xs font-mono underline text-zinc-600 dark:text-zinc-400 font-bold"
            >
              {t.account.noAccount} {t.account.registerBtn}
            </button>
          </div>
        </form>
      )}

      {/* REGISTER FORM */}
      {mode === 'register' && (
        <form onSubmit={handleRegister} className="space-y-4 text-xs font-mono">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block mb-1 font-bold">First Name</label>
              <input
                type="text"
                required
                value={regFirstName}
                onChange={e => setRegFirstName(e.target.value)}
                className="w-full bg-white dark:bg-black border p-2.5"
              />
            </div>
            <div>
              <label className="block mb-1 font-bold">Last Name</label>
              <input
                type="text"
                required
                value={regLastName}
                onChange={e => setRegLastName(e.target.value)}
                className="w-full bg-white dark:bg-black border p-2.5"
              />
            </div>
          </div>

          <div>
            <label className="block mb-1 font-bold">{t.account.emailLabel}</label>
            <input
              type="email"
              required
              value={regEmail}
              onChange={e => setRegEmail(e.target.value)}
              className="w-full bg-white dark:bg-black border p-2.5"
            />
          </div>

          <div>
            <label className="block mb-1 font-bold">Phone (+20 Egypt)</label>
            <input
              type="tel"
              required
              value={regPhone}
              onChange={e => setRegPhone(e.target.value)}
              placeholder="+20 100 123 4567"
              className="w-full bg-white dark:bg-black border p-2.5"
            />
          </div>

          <div>
            <label className="block mb-1 font-bold">{t.account.passwordLabel}</label>
            <input
              type="password"
              required
              value={regPassword}
              onChange={e => setRegPassword(e.target.value)}
              className="w-full bg-white dark:bg-black border p-2.5"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-black text-white dark:bg-white dark:text-black py-4 text-xs font-bold tracking-widest uppercase hover:opacity-90 flex items-center justify-center gap-2"
          >
            <span>{t.account.registerBtn}</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <div className="pt-2 text-center">
            <button
              type="button"
              onClick={() => setMode('login')}
              className="text-xs font-mono underline text-zinc-600 dark:text-zinc-400 font-bold"
            >
              {t.account.hasAccount} {t.account.loginBtn}
            </button>
          </div>
        </form>
      )}

      {/* FORGOT PASSWORD FORM */}
      {mode === 'forgot' && (
        <form
          onSubmit={e => {
            e.preventDefault();
            addToast(language === 'ar' ? 'تم ارسال رابط اعادة التعين لبريدك' : 'Password reset link sent to your email', 'success');
            setMode('login');
          }}
          className="space-y-4 text-xs font-mono"
        >
          <div>
            <label className="block mb-1 font-bold">{t.account.emailLabel}</label>
            <input
              type="email"
              required
              placeholder="name@domain.com"
              className="w-full bg-white dark:bg-black border p-3 focus:outline-none"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-black text-white dark:bg-white dark:text-black py-4 text-xs font-bold tracking-widest uppercase hover:opacity-90"
          >
            Send Reset Instructions
          </button>

          <button
            type="button"
            onClick={() => setMode('login')}
            className="w-full text-center text-xs font-mono underline text-zinc-500"
          >
            Back to Sign In
          </button>
        </form>
      )}

    </div>
  );
};
