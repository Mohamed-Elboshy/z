import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { translations } from '../translations/i18n';
import { Order } from '../types';
import { InvoicePDFView } from '../components/common/InvoicePDFView';
import { User, Package, MapPin, CreditCard, LogOut, Printer, ChevronRight } from 'lucide-react';

export const ProfilePage: React.FC = () => {
  const { language, user, setUser, orders, formatPrice, navigateTo } = useApp();
  const t = translations[language];

  const [activeTab, setActiveTab] = useState<'orders' | 'details' | 'addresses'>('orders');
  const [selectedInvoiceOrder, setSelectedInvoiceOrder] = useState<Order | null>(null);

  if (!user) {
    return (
      <div className="max-w-md mx-auto px-4 py-20 text-center space-y-4">
        <h2 className="text-xl font-serif font-bold uppercase tracking-wider">{t.account.loginTitle}</h2>
        <p className="text-xs font-mono text-zinc-500">Sign in to view your profile and order history.</p>
        <button
          onClick={() => navigateTo('auth')}
          className="bg-black text-white dark:bg-white dark:text-black font-semibold text-xs tracking-widest uppercase px-6 py-3"
        >
          {t.account.loginBtn}
        </button>
      </div>
    );
  }

  const handleLogout = () => {
    setUser(null);
    navigateTo('home');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Header */}
      <div className="flex justify-between items-end border-b border-zinc-200 dark:border-zinc-800 pb-4">
        <div>
          <span className="text-[10px] font-mono tracking-[0.3em] uppercase text-zinc-400">ZARA MEMBER PROFILE</span>
          <h1 className="text-3xl font-serif font-bold uppercase tracking-wider">
            {t.account.welcomeBack}, {user.firstName}
          </h1>
          <p className="text-xs font-mono text-zinc-500 mt-1">{user.email} | {user.phone}</p>
        </div>
        <button
          onClick={handleLogout}
          className="text-xs font-mono text-rose-600 font-bold underline flex items-center gap-1"
        >
          <LogOut className="w-4 h-4" />
          <span>{t.account.logout}</span>
        </button>
      </div>

      {/* Tabs */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        
        {/* Left Tabs Menu */}
        <div className="space-y-1 text-xs font-mono">
          <button
            onClick={() => setActiveTab('orders')}
            className={`w-full text-left p-3.5 flex items-center gap-3 font-bold border-l-2 uppercase transition-colors ${
              activeTab === 'orders' ? 'border-black dark:border-white bg-zinc-100 dark:bg-zinc-900' : 'border-transparent text-zinc-500'
            }`}
          >
            <Package className="w-4 h-4" />
            <span>{t.account.tabs.orders}</span>
          </button>
          <button
            onClick={() => setActiveTab('details')}
            className={`w-full text-left p-3.5 flex items-center gap-3 font-bold border-l-2 uppercase transition-colors ${
              activeTab === 'details' ? 'border-black dark:border-white bg-zinc-100 dark:bg-zinc-900' : 'border-transparent text-zinc-500'
            }`}
          >
            <User className="w-4 h-4" />
            <span>{t.account.tabs.details}</span>
          </button>
          <button
            onClick={() => setActiveTab('addresses')}
            className={`w-full text-left p-3.5 flex items-center gap-3 font-bold border-l-2 uppercase transition-colors ${
              activeTab === 'addresses' ? 'border-black dark:border-white bg-zinc-100 dark:bg-zinc-900' : 'border-transparent text-zinc-500'
            }`}
          >
            <MapPin className="w-4 h-4" />
            <span>{t.account.tabs.addresses}</span>
          </button>
        </div>

        {/* Right Content */}
        <div className="md:col-span-3">
          
          {/* TAB 1: ORDERS HISTORY */}
          {activeTab === 'orders' && (
            <div className="space-y-6">
              <h2 className="text-sm font-serif font-bold uppercase tracking-wider border-b pb-2">
                YOUR ORDER HISTORY ({orders.length})
              </h2>

              {orders.length === 0 ? (
                <p className="text-xs font-mono text-zinc-400 py-6">You have placed no orders yet.</p>
              ) : (
                <div className="space-y-4 divide-y divide-zinc-200 dark:divide-zinc-800">
                  {orders.map(order => (
                    <div key={order.id} className="pt-4 space-y-3 font-mono text-xs">
                      <div className="flex justify-between items-start">
                        <div>
                          <span className="font-bold text-sm text-black dark:text-white">{order.id}</span>
                          <span className="text-zinc-400 ml-2">
                            ({new Date(order.createdAt).toLocaleDateString()})
                          </span>
                        </div>
                        <span className="px-3 py-1 bg-amber-100 dark:bg-amber-950 text-amber-700 dark:text-amber-400 font-bold uppercase text-[10px]">
                          {order.orderStatus}
                        </span>
                      </div>

                      {/* Items */}
                      <div className="space-y-2">
                        {order.items.map((it, idx) => (
                          <div key={idx} className="flex justify-between text-zinc-600 dark:text-zinc-300">
                            <span>{language === 'ar' ? it.nameAr : it.nameEn} (x{it.quantity})</span>
                            <span>{formatPrice(it.price * it.quantity)}</span>
                          </div>
                        ))}
                      </div>

                      {/* Financial & Invoice CTA */}
                      <div className="flex justify-between items-center border-t pt-2">
                        <span className="font-bold">Total: {formatPrice(order.total)}</span>
                        <div className="flex gap-2">
                          <button
                            onClick={() => setSelectedInvoiceOrder(order)}
                            className="bg-black text-white dark:bg-white dark:text-black font-semibold text-[10px] tracking-widest uppercase px-3 py-1.5 flex items-center gap-1"
                          >
                            <Printer className="w-3 h-3" />
                            <span>INVOICE</span>
                          </button>
                          <button
                            onClick={() => navigateTo('tracking')}
                            className="border border-zinc-300 dark:border-zinc-700 text-[10px] font-bold uppercase px-3 py-1.5"
                          >
                            TRACK
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TAB 2: PERSONAL DETAILS */}
          {activeTab === 'details' && (
            <div className="space-y-4 max-w-lg text-xs font-mono">
              <h2 className="text-sm font-serif font-bold uppercase tracking-wider border-b pb-2">
                PERSONAL DATA
              </h2>
              <div>
                <label className="block text-zinc-400 mb-1">Full Name</label>
                <p className="font-bold text-sm">{user.firstName} {user.lastName}</p>
              </div>
              <div>
                <label className="block text-zinc-400 mb-1">Email</label>
                <p className="font-bold text-sm">{user.email}</p>
              </div>
              <div>
                <label className="block text-zinc-400 mb-1">Mobile Phone</label>
                <p className="font-bold text-sm">{user.phone}</p>
              </div>
            </div>
          )}

          {/* TAB 3: SAVED ADDRESSES */}
          {activeTab === 'addresses' && (
            <div className="space-y-4 text-xs font-mono">
              <h2 className="text-sm font-serif font-bold uppercase tracking-wider border-b pb-2">
                SAVED ADDRESSES IN EGYPT
              </h2>
              <div className="p-4 border border-zinc-200 dark:border-zinc-800 space-y-1">
                <span className="font-bold uppercase text-amber-500 text-[10px]">PRIMARY HOME ADDRESS</span>
                <p className="font-bold text-sm">{user.firstName} {user.lastName}</p>
                <p>90th Street, Villa 14, Apt 3, New Cairo, Cairo, Egypt</p>
                <p>Tel: {user.phone}</p>
              </div>
            </div>
          )}

        </div>
      </div>

      {selectedInvoiceOrder && (
        <InvoicePDFView order={selectedInvoiceOrder} onClose={() => setSelectedInvoiceOrder(null)} />
      )}
    </div>
  );
};
