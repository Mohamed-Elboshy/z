import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { translations } from '../../translations/i18n';
import { X, Trash2, Plus, Minus, ArrowRight, Tag, ShieldCheck } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export const CartDrawer: React.FC = () => {
  const {
    language,
    cart,
    removeFromCart,
    updateCartQuantity,
    appliedCoupon,
    applyCouponCode,
    removeCoupon,
    cartSubtotal,
    cartDiscountAmount,
    cartShippingFee,
    cartGrandTotal,
    formatPrice,
    isCartDrawerOpen,
    setIsCartDrawerOpen,
    navigateTo
  } = useApp();

  const [couponInput, setCouponInput] = useState('');
  const [loadingCoupon, setLoadingCoupon] = useState(false);
  const t = translations[language];

  const handleApplyCoupon = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!couponInput) return;
    setLoadingCoupon(true);
    await applyCouponCode(couponInput);
    setLoadingCoupon(false);
    setCouponInput('');
  };

  return (
    <AnimatePresence>
      {isCartDrawerOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setIsCartDrawerOpen(false)}
          />

          <div className="fixed inset-y-0 right-0 max-w-full flex pl-10 rtl:pl-0 rtl:pr-10">
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 28, stiffness: 220 }}
              className="w-screen max-w-md bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 flex flex-col shadow-2xl border-l border-zinc-200 dark:border-zinc-800"
            >
            {/* Drawer Header */}
            <div className="px-6 py-5 border-b border-zinc-200 dark:border-zinc-800 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <h2 className="text-base font-serif font-bold tracking-widest uppercase">
                  {t.cart.title}
                </h2>
                <span className="text-xs font-mono bg-zinc-100 dark:bg-zinc-800 px-2 py-0.5 rounded-full font-semibold">
                  {cart.reduce((total, item) => total + item.quantity, 0)} {t.cart.itemCount}
                </span>
              </div>
              <button
                onClick={() => setIsCartDrawerOpen(false)}
                className="p-1 hover:opacity-75 transition-opacity text-black dark:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Cart Items List */}
            <div className="flex-1 overflow-y-auto px-6 py-4 divide-y divide-zinc-100 dark:divide-zinc-900">
              {cart.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center py-12 space-y-4">
                  <div className="w-16 h-16 rounded-full bg-zinc-100 dark:bg-zinc-900 flex items-center justify-center text-zinc-400">
                    <Tag className="w-8 h-8" />
                  </div>
                  <h3 className="text-sm font-sans font-bold tracking-widest uppercase">
                    {t.cart.empty}
                  </h3>
                  <p className="text-xs text-zinc-500 max-w-xs">{t.cart.emptySubtitle}</p>
                  <button
                    onClick={() => {
                      setIsCartDrawerOpen(false);
                      navigateTo('shop');
                    }}
                    className="mt-4 bg-black text-white dark:bg-white dark:text-black font-semibold text-xs tracking-widest uppercase px-6 py-3 hover:opacity-90 transition-opacity"
                  >
                    {t.cart.startShopping}
                  </button>
                </div>
              ) : (
                cart.map((item, idx) => (
                  <div key={`${item.product.id}-${item.selectedSize}-${item.selectedColor.hex}-${idx}`} className="py-4 flex gap-4">
                    <img
                      src={item.product.images[0]}
                      alt={language === 'ar' ? item.product.nameAr : item.product.nameEn}
                      className="w-20 h-28 object-cover bg-zinc-100 dark:bg-zinc-900 shrink-0 cursor-pointer"
                      onClick={() => {
                        setIsCartDrawerOpen(false);
                        navigateTo('product', item.product.id);
                      }}
                    />
                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <div className="flex justify-between items-start">
                          <h4 className="text-xs font-sans font-semibold tracking-wider uppercase line-clamp-1 pr-2">
                            {language === 'ar' ? item.product.nameAr : item.product.nameEn}
                          </h4>
                          <button
                            onClick={() => removeFromCart(item.product.id, item.selectedSize, item.selectedColor.hex)}
                            className="text-zinc-400 hover:text-rose-600 transition-colors p-1"
                            title={t.cart.removeItem}
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                        <div className="flex items-center gap-3 text-[11px] text-zinc-500 font-mono mt-1">
                          <span>
                            {t.filter.size}: <strong>{item.selectedSize}</strong>
                          </span>
                          <span>|</span>
                          <span className="flex items-center gap-1">
                            {t.filter.color}:
                            <span
                              className="w-2.5 h-2.5 rounded-full inline-block border"
                              style={{ backgroundColor: item.selectedColor.hex }}
                            />
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center justify-between pt-2">
                        {/* Quantity controls */}
                        <div className="flex items-center border border-zinc-200 dark:border-zinc-800">
                          <button
                            onClick={() => updateCartQuantity(item.product.id, item.selectedSize, item.selectedColor.hex, -1)}
                            className="p-1 hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-600 dark:text-zinc-400"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="px-3 text-xs font-mono font-bold">{item.quantity}</span>
                          <button
                            onClick={() => updateCartQuantity(item.product.id, item.selectedSize, item.selectedColor.hex, 1)}
                            className="p-1 hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-600 dark:text-zinc-400"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>

                        <span className="text-xs font-mono font-bold text-black dark:text-white">
                          {formatPrice(item.product.price * item.quantity)}
                        </span>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Drawer Footer: Coupon + Summary + Checkout CTA */}
            {cart.length > 0 && (
              <div className="border-t border-zinc-200 dark:border-zinc-800 p-6 space-y-4 bg-zinc-50 dark:bg-zinc-900/50">
                {/* Coupon Code input */}
                {appliedCoupon ? (
                  <div className="flex items-center justify-between bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 px-3 py-2 text-xs">
                    <span className="text-emerald-700 dark:text-emerald-400 font-mono font-bold">
                      COUPON: {appliedCoupon.code} (-{appliedCoupon.discountType === 'percentage' ? `${appliedCoupon.value}%` : `${appliedCoupon.value} EGP`})
                    </span>
                    <button onClick={removeCoupon} className="text-xs text-rose-600 underline font-semibold">
                      {t.cart.removeItem}
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleApplyCoupon} className="flex gap-2">
                    <input
                      type="text"
                      value={couponInput}
                      onChange={e => setCouponInput(e.target.value)}
                      placeholder="Try: ZARA20 or EGYPTFREE"
                      className="flex-1 bg-white dark:bg-black border border-zinc-300 dark:border-zinc-700 px-3 py-2 text-xs font-mono uppercase focus:outline-none focus:border-black dark:focus:border-white"
                    />
                    <button
                      type="submit"
                      disabled={loadingCoupon}
                      className="bg-zinc-900 text-white dark:bg-zinc-100 dark:text-black font-semibold text-xs px-4 py-2 hover:opacity-90 transition-opacity"
                    >
                      {t.cart.applyCoupon}
                    </button>
                  </form>
                )}

                {/* Subtotal & Delivery Fee breakdown */}
                <div className="space-y-1.5 text-xs font-mono">
                  <div className="flex justify-between text-zinc-600 dark:text-zinc-400">
                    <span>{t.cart.subtotal}</span>
                    <span>{formatPrice(cartSubtotal)}</span>
                  </div>

                  {cartDiscountAmount > 0 && (
                    <div className="flex justify-between text-emerald-600 dark:text-emerald-400">
                      <span>{t.cart.discount}</span>
                      <span>-{formatPrice(cartDiscountAmount)}</span>
                    </div>
                  )}

                  <div className="flex justify-between text-zinc-600 dark:text-zinc-400">
                    <span>{t.cart.shipping}</span>
                    <span>{cartShippingFee === 0 ? t.cart.free : formatPrice(cartShippingFee)}</span>
                  </div>

                  <div className="flex justify-between text-sm font-bold text-black dark:text-white pt-2 border-t border-zinc-200 dark:border-zinc-800">
                    <span>{t.cart.total}</span>
                    <span>{formatPrice(cartGrandTotal)}</span>
                  </div>
                </div>

                {/* Checkout CTA */}
                <button
                  onClick={() => {
                    setIsCartDrawerOpen(false);
                    navigateTo('checkout');
                  }}
                  className="w-full bg-black text-white dark:bg-white dark:text-black font-semibold text-xs tracking-widest uppercase py-4 hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
                >
                  <span>{t.cart.checkout}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <div className="flex items-center justify-center gap-2 text-[10px] text-zinc-400 font-sans">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
                  <span>{t.freeReturnsNotice}</span>
                </div>
              </div>
            )}
          </motion.div>
        </div>
      </div>
      )}
    </AnimatePresence>
  );
};
