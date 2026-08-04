import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { translations } from '../translations/i18n';
import { Trash2, Plus, Minus, ArrowRight, ShieldCheck, Tag } from 'lucide-react';

export const CartPage: React.FC = () => {
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
    navigateTo
  } = useApp();

  const [couponInput, setCouponInput] = useState('');
  const t = translations[language];

  const handleApplyCoupon = async (e: React.FormEvent) => {
    e.preventDefault();
    if (couponInput.trim()) {
      await applyCouponCode(couponInput);
      setCouponInput('');
    }
  };

  if (cart.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center space-y-6">
        <div className="w-20 h-20 rounded-full bg-zinc-100 dark:bg-zinc-900 flex items-center justify-center mx-auto text-zinc-400">
          <Tag className="w-10 h-10" />
        </div>
        <h1 className="text-2xl font-serif font-bold tracking-widest uppercase">{t.cart.empty}</h1>
        <p className="text-xs text-zinc-500 font-mono max-w-sm mx-auto">{t.cart.emptySubtitle}</p>
        <button
          onClick={() => navigateTo('shop')}
          className="bg-black text-white dark:bg-white dark:text-black font-semibold text-xs tracking-widest uppercase px-8 py-4 hover:opacity-90 transition-opacity inline-flex items-center gap-2"
        >
          <span>{t.cart.startShopping}</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <div className="border-b border-zinc-200 dark:border-zinc-800 pb-4">
        <h1 className="text-3xl font-serif font-bold uppercase tracking-wider">{t.cart.title}</h1>
        <p className="text-xs font-mono text-zinc-400 mt-1">Review your selected items before checkout</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Cart Items List (8 cols) */}
        <div className="lg:col-span-8 space-y-4">
          <div className="divide-y divide-zinc-200 dark:divide-zinc-800">
            {cart.map((item, idx) => (
              <div key={idx} className="py-6 flex gap-6">
                <img
                  src={item.product.images[0]}
                  alt={item.product.nameEn}
                  className="w-24 h-32 object-cover bg-zinc-100 dark:bg-zinc-900 shrink-0 cursor-pointer"
                  onClick={() => navigateTo('product', item.product.id)}
                />
                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex justify-between items-start">
                      <h3 className="text-sm font-sans font-bold uppercase tracking-wide">
                        {language === 'ar' ? item.product.nameAr : item.product.nameEn}
                      </h3>
                      <button
                        onClick={() => removeFromCart(item.product.id, item.selectedSize, item.selectedColor.hex)}
                        className="text-zinc-400 hover:text-rose-600 transition-colors p-1"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                    <div className="flex items-center gap-4 text-xs font-mono text-zinc-500 mt-2">
                      <span>Size: <strong>{item.selectedSize}</strong></span>
                      <span>Color: <strong>{language === 'ar' ? item.selectedColor.nameAr : item.selectedColor.nameEn}</strong></span>
                      <span>SKU: {item.product.sku}</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-4">
                    <div className="flex items-center border border-zinc-300 dark:border-zinc-700">
                      <button
                        onClick={() => updateCartQuantity(item.product.id, item.selectedSize, item.selectedColor.hex, -1)}
                        className="p-1.5 hover:bg-zinc-100 dark:hover:bg-zinc-800"
                      >
                        <Minus className="w-3.5 h-3.5" />
                      </button>
                      <span className="px-4 text-xs font-mono font-bold">{item.quantity}</span>
                      <button
                        onClick={() => updateCartQuantity(item.product.id, item.selectedSize, item.selectedColor.hex, 1)}
                        className="p-1.5 hover:bg-zinc-100 dark:hover:bg-zinc-800"
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <span className="text-base font-mono font-bold text-black dark:text-white">
                      {formatPrice(item.product.price * item.quantity)}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Order Summary & Coupon (4 cols) */}
        <div className="lg:col-span-4 bg-zinc-50 dark:bg-zinc-900 p-6 border border-zinc-200 dark:border-zinc-800 space-y-6 h-fit">
          <h2 className="text-sm font-serif font-bold uppercase tracking-wider pb-3 border-b border-zinc-200 dark:border-zinc-800">
            ORDER SUMMARY
          </h2>

          {/* Coupon Code input */}
          {appliedCoupon ? (
            <div className="flex items-center justify-between bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 p-3 text-xs">
              <span className="text-emerald-700 dark:text-emerald-400 font-mono font-bold">
                COUPON: {appliedCoupon.code}
              </span>
              <button onClick={removeCoupon} className="text-rose-600 font-bold underline">
                Remove
              </button>
            </div>
          ) : (
            <form onSubmit={handleApplyCoupon} className="flex gap-2">
              <input
                type="text"
                value={couponInput}
                onChange={e => setCouponInput(e.target.value)}
                placeholder="PROMO CODE (ZARA20)"
                className="flex-1 bg-white dark:bg-black border border-zinc-300 dark:border-zinc-700 px-3 py-2 text-xs font-mono uppercase"
              />
              <button
                type="submit"
                className="bg-black text-white dark:bg-white dark:text-black text-xs font-bold px-4 py-2"
              >
                APPLY
              </button>
            </form>
          )}

          <div className="space-y-2 text-xs font-mono text-zinc-600 dark:text-zinc-400">
            <div className="flex justify-between">
              <span>{t.cart.subtotal}</span>
              <span>{formatPrice(cartSubtotal)}</span>
            </div>
            {cartDiscountAmount > 0 && (
              <div className="flex justify-between text-emerald-600 dark:text-emerald-400 font-bold">
                <span>{t.cart.discount}</span>
                <span>-{formatPrice(cartDiscountAmount)}</span>
              </div>
            )}
            <div className="flex justify-between">
              <span>{t.cart.shipping}</span>
              <span>{cartShippingFee === 0 ? t.cart.free : formatPrice(cartShippingFee)}</span>
            </div>
            <div className="flex justify-between text-base font-bold text-black dark:text-white pt-3 border-t border-zinc-200 dark:border-zinc-800">
              <span>{t.cart.total}</span>
              <span>{formatPrice(cartGrandTotal)}</span>
            </div>
          </div>

          <button
            onClick={() => navigateTo('checkout')}
            className="w-full bg-black text-white dark:bg-white dark:text-black font-semibold text-xs tracking-widest uppercase py-4 hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
          >
            <span>{t.cart.checkout}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
