import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { translations } from '../translations/i18n';
import { Order } from '../types';
import { Search, Truck, CheckCircle2, PackageCheck, MapPin, Clock, AlertCircle } from 'lucide-react';

export const OrderTrackingPage: React.FC = () => {
  const { language, orders, formatPrice } = useApp();
  const t = translations[language];

  const [searchCode, setSearchCode] = useState('ZR-EG-94821');
  const [searchedOrder, setSearchedOrder] = useState<Order | null>(orders[0] || null);
  const [errorMsg, setErrorMsg] = useState('');

  const handleTrack = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    const code = searchCode.trim().toUpperCase();
    const found = orders.find(o => o.id.toUpperCase() === code);
    if (found) {
      setSearchedOrder(found);
    } else {
      setSearchedOrder(null);
      setErrorMsg(t.tracking.notFound);
    }
  };

  const stepsList = [
    { key: 'Pending', label: t.tracking.steps.Pending },
    { key: 'Confirmed', label: t.tracking.steps.Confirmed },
    { key: 'Preparing', label: t.tracking.steps.Preparing },
    { key: 'Packed', label: t.tracking.steps.Packed },
    { key: 'Shipping', label: t.tracking.steps.Shipping },
    { key: 'Delivered', label: t.tracking.steps.Delivered }
  ];

  const getStepIndex = (status: string) => {
    const idx = stepsList.findIndex(s => s.key === status);
    return idx > -1 ? idx : 0;
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      
      {/* Title */}
      <div className="text-center space-y-2 max-w-md mx-auto">
        <div className="w-12 h-12 rounded-full bg-black text-white dark:bg-white dark:text-black flex items-center justify-center mx-auto mb-2">
          <Truck className="w-6 h-6" />
        </div>
        <h1 className="text-2xl sm:text-3xl font-serif font-bold uppercase tracking-wider">
          {t.tracking.title}
        </h1>
        <p className="text-xs font-mono text-zinc-500">
          {t.tracking.subtitle}
        </p>
      </div>

      {/* Search Bar */}
      <form onSubmit={handleTrack} className="flex gap-2 max-w-lg mx-auto">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-zinc-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchCode}
            onChange={e => setSearchCode(e.target.value)}
            placeholder={t.tracking.orderInputPlaceholder}
            className="w-full bg-white dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-700 pl-10 pr-4 py-3 text-xs font-mono uppercase focus:outline-none focus:border-black dark:focus:border-white"
          />
        </div>
        <button
          type="submit"
          className="bg-black text-white dark:bg-white dark:text-black font-semibold text-xs tracking-widest uppercase px-6 py-3 hover:opacity-90"
        >
          {t.tracking.trackBtn}
        </button>
      </form>

      {errorMsg && (
        <div className="p-4 bg-rose-50 dark:bg-rose-950/50 border border-rose-200 dark:border-rose-800 text-rose-700 dark:text-rose-400 text-xs font-mono flex items-center gap-2 max-w-lg mx-auto">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{errorMsg}</span>
        </div>
      )}

      {/* Order Status Timeline View */}
      {searchedOrder && (
        <div className="bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 p-6 sm:p-8 space-y-8 shadow-lg">
          
          {/* Header */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b pb-6 gap-2 text-xs font-mono">
            <div>
              <span className="text-zinc-400">{t.checkout.orderReference}</span>
              <h2 className="text-xl font-bold font-mono text-black dark:text-white">{searchedOrder.id}</h2>
            </div>
            <div className="text-right sm:text-left">
              <span className="text-zinc-400">{t.tracking.currentStatus}:</span>
              <span className="block font-bold text-amber-600 dark:text-amber-400 text-sm uppercase">
                {searchedOrder.orderStatus}
              </span>
            </div>
          </div>

          {/* Step-by-Step Progress Timeline Bar */}
          <div className="py-6">
            <div className="relative flex justify-between items-center max-w-2xl mx-auto">
              {/* Connecting Line */}
              <div className="absolute top-1/2 inset-x-0 h-1 bg-zinc-200 dark:bg-zinc-800 -translate-y-1/2 z-0" />
              <div
                className="absolute top-1/2 left-0 h-1 bg-black dark:bg-white -translate-y-1/2 z-0 transition-all duration-500"
                style={{
                  width: `${(getStepIndex(searchedOrder.orderStatus) / (stepsList.length - 1)) * 100}%`
                }}
              />

              {stepsList.map((step, idx) => {
                const isCompleted = idx <= getStepIndex(searchedOrder.orderStatus);
                const isCurrent = idx === getStepIndex(searchedOrder.orderStatus);

                return (
                  <div key={step.key} className="relative z-10 flex flex-col items-center">
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center font-mono text-xs font-bold transition-all ${
                        isCompleted
                          ? 'bg-black text-white dark:bg-white dark:text-black scale-110 shadow-md'
                          : 'bg-zinc-200 dark:bg-zinc-800 text-zinc-500'
                      } ${isCurrent ? 'ring-4 ring-amber-400' : ''}`}
                    >
                      {idx + 1}
                    </div>
                    <span className="text-[10px] font-mono tracking-tighter uppercase mt-2 font-bold max-w-[70px] text-center text-zinc-600 dark:text-zinc-300">
                      {step.label}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* History Details Timeline */}
          <div className="space-y-4 pt-4 border-t">
            <h3 className="text-xs font-serif font-bold tracking-widest uppercase">
              {t.tracking.timeline}
            </h3>
            <div className="space-y-3 divide-y divide-zinc-100 dark:divide-zinc-900">
              {searchedOrder.trackingHistory.map((hist, idx) => (
                <div key={idx} className="pt-3 flex justify-between items-center text-xs font-mono">
                  <div className="space-y-0.5">
                    <span className="font-bold text-black dark:text-white uppercase">{hist.status}</span>
                    <p className="text-zinc-500">{language === 'ar' ? hist.messageAr : hist.messageEn}</p>
                  </div>
                  <span className="text-zinc-400 text-[11px]">
                    {new Date(hist.time).toLocaleString()}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Shipping Address Summary */}
          <div className="p-4 bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-xs font-mono space-y-1">
            <p className="font-bold uppercase text-zinc-400">DESTINATION:</p>
            <p className="font-bold">{searchedOrder.customerName}</p>
            <p>{searchedOrder.address}, {searchedOrder.governorate}</p>
          </div>

        </div>
      )}
    </div>
  );
};
