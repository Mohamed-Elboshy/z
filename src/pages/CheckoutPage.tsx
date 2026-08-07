import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { translations } from '../translations/i18n';
import { GOVERNORATES_EGYPT } from '../data/mockData';
import { Order } from '../types';
import { InvoicePDFView } from '../components/common/InvoicePDFView';
import { CheckCircle2, ShieldCheck, CreditCard, Truck, ArrowRight, Printer, AlertCircle } from 'lucide-react';

export const CheckoutPage: React.FC = () => {
  const {
    language,
    cart,
    user,
    cartSubtotal,
    cartDiscountAmount,
    cartShippingFee,
    cartGrandTotal,
    formatPrice,
    createOrder,
    navigateTo,
    addToast
  } = useApp();

  const t = translations[language];

  // Form states
  const [firstName, setFirstName] = useState(user?.firstName || '');
  const [lastName, setLastName] = useState(user?.lastName || '');
  const [email, setEmail] = useState(user?.email || '');
  const [phone, setPhone] = useState(user?.phone || '+20 100 123 4567');
  const [governorate, setGovernorate] = useState(GOVERNORATES_EGYPT[0]);
  const [city, setCity] = useState('New Cairo');
  const [streetAddress, setStreetAddress] = useState('90th Street');
  const [buildingNo, setBuildingNo] = useState('14');
  const [apartmentNo, setApartmentNo] = useState('3');

  // Delivery method
  const [deliverySpeed, setDeliverySpeed] = useState<'standard' | 'sameday'>('standard');

  // Payment method
  const [paymentMethod, setPaymentMethod] = useState<'fawry' | 'instapay' | 'visa' | 'mastercard' | 'meeza' | 'cod'>('fawry');
  
  // Card details
  const [cardNumber, setCardNumber] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCvc, setCardCvc] = useState('');

  // Processing state
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [completedOrder, setCompletedOrder] = useState<Order | null>(null);
  const [showInvoiceModal, setShowInvoiceModal] = useState(false);

  const handlePlaceOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!firstName || !lastName || !email || !phone || !streetAddress) {
      addToast(language === 'ar' ? 'يرجى إدخال كافة بيانات الشحن' : 'Please complete shipping address', 'error');
      return;
    }

    if ((paymentMethod === 'visa' || paymentMethod === 'mastercard' || paymentMethod === 'meeza') && !cardNumber) {
      addToast(language === 'ar' ? 'يرجى إدخال بيانات الكارت البنكي' : 'Please enter card details', 'error');
      return;
    }

    setIsSubmitting(true);
    try {
      const order = await createOrder({
        customerName: `${firstName} ${lastName}`,
        customerEmail: email,
        customerPhone: phone,
        governorate,
        city,
        address: `${buildingNo} ${streetAddress}, Apt ${apartmentNo}, ${city}`,
        paymentMethod
      });
      setCompletedOrder(order);
    } catch {
      addToast('Failed to process order', 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Order Confirmation Success View
  if (completedOrder) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-16 text-center space-y-8">
        <div className="w-20 h-20 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto">
          <CheckCircle2 className="w-10 h-10" />
        </div>

        <div className="space-y-2">
          <h1 className="text-2xl sm:text-3xl font-serif font-bold uppercase tracking-wider text-black dark:text-white">
            {t.checkout.orderSuccessTitle}
          </h1>
          <p className="text-xs font-mono text-zinc-500 max-w-md mx-auto">
            {t.checkout.orderSuccessSubtitle}
          </p>
        </div>

        {/* Reference & Details Box */}
        <div className="p-6 bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-left font-mono text-xs space-y-4">
          <div className="flex justify-between border-b pb-3">
            <span className="text-zinc-500">{t.checkout.orderReference}</span>
            <span className="font-bold text-base text-black dark:text-white">{completedOrder.id}</span>
          </div>

          {completedOrder.paymentMethod === 'fawry' && (
            <div className="p-4 bg-amber-50 dark:bg-amber-950/50 border border-amber-300 dark:border-amber-700 space-y-2 text-amber-900 dark:text-amber-200">
              <div className="flex justify-between items-center">
                <span className="font-bold">{t.checkout.fawryCodeLabel}</span>
                <span className="text-xl font-bold font-mono tracking-widest text-amber-600 dark:text-amber-400">
                  {completedOrder.fawryReference}
                </span>
              </div>
              <p className="text-[11px] leading-relaxed">{t.checkout.fawryInstructions}</p>
            </div>
          )}

          {completedOrder.paymentMethod === 'instapay' && (
            <div className="p-4 bg-purple-50 dark:bg-purple-950/50 border border-purple-300 dark:border-purple-700 space-y-2 text-purple-900 dark:text-purple-200">
              <span className="font-bold">InstaPay Address: z.egypt@instapay</span>
              <p className="text-[11px] leading-relaxed">{t.checkout.instapayInstructions}</p>
            </div>
          )}

          <div className="flex justify-between">
            <span className="text-zinc-500">Customer:</span>
            <span className="font-bold">{completedOrder.customerName}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-zinc-500">Shipping Address:</span>
            <span className="font-bold">{completedOrder.address}</span>
          </div>
          <div className="flex justify-between border-t pt-3">
            <span className="text-zinc-500">Total Amount:</span>
            <span className="font-bold text-base text-emerald-600">{formatPrice(completedOrder.total)}</span>
          </div>
        </div>

        <div className="flex flex-wrap justify-center gap-4">
          <button
            onClick={() => setShowInvoiceModal(true)}
            className="bg-black text-white dark:bg-white dark:text-black font-semibold text-xs tracking-widest uppercase px-6 py-3.5 flex items-center gap-2 hover:opacity-90"
          >
            <Printer className="w-4 h-4" />
            <span>{t.checkout.printInvoice}</span>
          </button>
          <button
            onClick={() => navigateTo('tracking')}
            className="border border-zinc-300 dark:border-zinc-700 font-semibold text-xs tracking-widest uppercase px-6 py-3.5 hover:bg-zinc-100 dark:hover:bg-zinc-800"
          >
            {t.checkout.trackYourOrder}
          </button>
        </div>

        {showInvoiceModal && (
          <InvoicePDFView order={completedOrder} onClose={() => setShowInvoiceModal(false)} />
        )}
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <div className="border-b border-zinc-200 dark:border-zinc-800 pb-4">
        <h1 className="text-3xl font-serif font-bold uppercase tracking-wider">{t.checkout.title}</h1>
        <p className="text-xs font-mono text-zinc-400 mt-1">100% Secure Checkout powered by Fawry & Visa Egypt</p>
      </div>

      <form onSubmit={handlePlaceOrder} className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        
        {/* Left Form: Shipping, Speed & Payment (7 cols) */}
        <div className="lg:col-span-7 space-y-8">
          
          {/* Step 1: Shipping Address */}
          <div className="space-y-4">
            <h2 className="text-sm font-serif font-bold uppercase tracking-wider text-black dark:text-white pb-2 border-b">
              {t.checkout.step1}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-mono">
              <div>
                <label className="block mb-1 font-bold">{t.checkout.firstName}</label>
                <input
                  type="text"
                  required
                  value={firstName}
                  onChange={e => setFirstName(e.target.value)}
                  className="w-full bg-white dark:bg-black border p-2.5 text-xs focus:outline-none"
                />
              </div>
              <div>
                <label className="block mb-1 font-bold">{t.checkout.lastName}</label>
                <input
                  type="text"
                  required
                  value={lastName}
                  onChange={e => setLastName(e.target.value)}
                  className="w-full bg-white dark:bg-black border p-2.5 text-xs focus:outline-none"
                />
              </div>
              <div>
                <label className="block mb-1 font-bold">{t.checkout.email}</label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  className="w-full bg-white dark:bg-black border p-2.5 text-xs focus:outline-none"
                />
              </div>
              <div>
                <label className="block mb-1 font-bold">{t.checkout.phone}</label>
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={e => setPhone(e.target.value)}
                  className="w-full bg-white dark:bg-black border p-2.5 text-xs focus:outline-none"
                />
              </div>
              <div className="sm:col-span-2">
                <label className="block mb-1 font-bold">{t.checkout.governorate}</label>
                <select
                  value={governorate}
                  onChange={e => setGovernorate(e.target.value)}
                  className="w-full bg-white dark:bg-black border p-2.5 text-xs focus:outline-none cursor-pointer"
                >
                  {GOVERNORATES_EGYPT.map(gov => (
                    <option key={gov} value={gov}>
                      {gov}
                    </option>
                  ))}
                </select>
              </div>
              <div className="sm:col-span-2">
                <label className="block mb-1 font-bold">{t.checkout.streetAddress}</label>
                <input
                  type="text"
                  required
                  value={streetAddress}
                  onChange={e => setStreetAddress(e.target.value)}
                  placeholder="Street name, Villa or Building details"
                  className="w-full bg-white dark:bg-black border p-2.5 text-xs focus:outline-none"
                />
              </div>
            </div>
          </div>

          {/* Step 2: Delivery Speed */}
          <div className="space-y-4">
            <h2 className="text-sm font-serif font-bold uppercase tracking-wider text-black dark:text-white pb-2 border-b">
              {t.checkout.step2}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-mono">
              <label
                onClick={() => setDeliverySpeed('standard')}
                className={`p-4 border cursor-pointer flex items-center justify-between transition-colors ${
                  deliverySpeed === 'standard' ? 'border-black dark:border-white bg-zinc-50 dark:bg-zinc-900 font-bold' : 'border-zinc-300 dark:border-zinc-700'
                }`}
              >
                <div>
                  <p>{t.checkout.deliveryStandard}</p>
                  <span className="text-[10px] text-zinc-500">2-4 Days in Egypt</span>
                </div>
                <span className="font-bold">{cartShippingFee === 0 ? 'FREE' : '60 EGP'}</span>
              </label>

              <label
                onClick={() => setDeliverySpeed('sameday')}
                className={`p-4 border cursor-pointer flex items-center justify-between transition-colors ${
                  deliverySpeed === 'sameday' ? 'border-black dark:border-white bg-zinc-50 dark:bg-zinc-900 font-bold' : 'border-zinc-300 dark:border-zinc-700'
                }`}
              >
                <div>
                  <p>{t.checkout.deliverySameDay}</p>
                  <span className="text-[10px] text-amber-500 font-bold">Cairo & Giza VIP Express</span>
                </div>
                <span className="font-bold">120 EGP</span>
              </label>
            </div>
          </div>

          {/* Step 3: Local Payment Options */}
          <div className="space-y-4">
            <h2 className="text-sm font-serif font-bold uppercase tracking-wider text-black dark:text-white pb-2 border-b">
              {t.checkout.step3}
            </h2>

            <div className="space-y-3 text-xs font-mono">
              {/* Fawry */}
              <label
                onClick={() => setPaymentMethod('fawry')}
                className={`p-4 border cursor-pointer block transition-colors ${
                  paymentMethod === 'fawry' ? 'border-amber-500 bg-amber-50/50 dark:bg-amber-950/20' : 'border-zinc-300 dark:border-zinc-700'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="bg-yellow-400 text-black font-bold px-2 py-0.5 text-[10px] rounded">FAWRY PAY</span>
                    <span className="font-bold">{t.checkout.paymentMethods.fawry}</span>
                  </div>
                </div>
                {paymentMethod === 'fawry' && (
                  <p className="mt-2 text-[11px] text-zinc-600 dark:text-zinc-400 leading-relaxed">
                    {t.checkout.fawryInstructions}
                  </p>
                )}
              </label>

              {/* InstaPay */}
              <label
                onClick={() => setPaymentMethod('instapay')}
                className={`p-4 border cursor-pointer block transition-colors ${
                  paymentMethod === 'instapay' ? 'border-purple-500 bg-purple-50/50 dark:bg-purple-950/20' : 'border-zinc-300 dark:border-zinc-700'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="bg-purple-600 text-white font-bold px-2 py-0.5 text-[10px] rounded">INSTAPAY</span>
                    <span className="font-bold">{t.checkout.paymentMethods.instapay}</span>
                  </div>
                </div>
                {paymentMethod === 'instapay' && (
                  <p className="mt-2 text-[11px] text-zinc-600 dark:text-zinc-400 leading-relaxed">
                    {t.checkout.instapayInstructions}
                  </p>
                )}
              </label>

              {/* Meeza Card */}
              <label
                onClick={() => setPaymentMethod('meeza')}
                className={`p-4 border cursor-pointer block transition-colors ${
                  paymentMethod === 'meeza' ? 'border-emerald-500 bg-emerald-50/50 dark:bg-emerald-950/20' : 'border-zinc-300 dark:border-zinc-700'
                }`}
              >
                <div className="flex items-center gap-2">
                  <span className="bg-emerald-600 text-white font-bold px-2 py-0.5 text-[10px] rounded">MEEZA</span>
                  <span className="font-bold">{t.checkout.paymentMethods.meeza}</span>
                </div>
              </label>

              {/* Visa / MasterCard */}
              <label
                onClick={() => setPaymentMethod('visa')}
                className={`p-4 border cursor-pointer block transition-colors ${
                  paymentMethod === 'visa' || paymentMethod === 'mastercard' ? 'border-blue-500 bg-blue-50/50 dark:bg-blue-950/20' : 'border-zinc-300 dark:border-zinc-700'
                }`}
              >
                <div className="flex items-center gap-2">
                  <CreditCard className="w-4 h-4 text-blue-500" />
                  <span className="font-bold">{t.checkout.paymentMethods.visa}</span>
                </div>
              </label>

              {/* Card Inputs if Visa / Meeza */}
              {(paymentMethod === 'visa' || paymentMethod === 'mastercard' || paymentMethod === 'meeza') && (
                <div className="p-4 bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 space-y-3">
                  <div>
                    <label className="block mb-1">Card Number (16 Digits)</label>
                    <input
                      type="text"
                      maxLength={16}
                      value={cardNumber}
                      onChange={e => setCardNumber(e.target.value)}
                      placeholder="4000 1234 5678 9010"
                      className="w-full bg-white dark:bg-black border p-2 text-xs"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block mb-1">Expiry Date</label>
                      <input
                        type="text"
                        placeholder="MM/YY"
                        value={cardExpiry}
                        onChange={e => setCardExpiry(e.target.value)}
                        className="w-full bg-white dark:bg-black border p-2 text-xs"
                      />
                    </div>
                    <div>
                      <label className="block mb-1">CVV</label>
                      <input
                        type="password"
                        maxLength={4}
                        placeholder="123"
                        value={cardCvc}
                        onChange={e => setCardCvc(e.target.value)}
                        className="w-full bg-white dark:bg-black border p-2 text-xs"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Cash on Delivery */}
              <label
                onClick={() => setPaymentMethod('cod')}
                className={`p-4 border cursor-pointer block transition-colors ${
                  paymentMethod === 'cod' ? 'border-black dark:border-white bg-zinc-50 dark:bg-zinc-900 font-bold' : 'border-zinc-300 dark:border-zinc-700'
                }`}
              >
                <div className="flex items-center gap-2">
                  <Truck className="w-4 h-4 text-zinc-500" />
                  <span className="font-bold">{t.checkout.paymentMethods.cod}</span>
                </div>
              </label>
            </div>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-black text-white dark:bg-white dark:text-black py-4 text-xs font-bold tracking-widest uppercase hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
          >
            {isSubmitting ? (
              <span>PROCESSING PAYMENT...</span>
            ) : (
              <>
                <span>{t.checkout.placeOrder}</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </div>

        {/* Right Summary (5 cols) */}
        <div className="lg:col-span-5 bg-zinc-50 dark:bg-zinc-900 p-6 border border-zinc-200 dark:border-zinc-800 space-y-6 h-fit">
          <h2 className="text-sm font-serif font-bold uppercase tracking-wider pb-3 border-b">
            {t.checkout.step4}
          </h2>

          {/* Items */}
          <div className="divide-y divide-zinc-200 dark:divide-zinc-800 max-h-80 overflow-y-auto pr-2">
            {cart.map((item, idx) => (
              <div key={idx} className="py-3 flex gap-3 text-xs font-mono">
                <img src={item.product.images[0]} alt="" className="w-12 h-16 object-cover bg-zinc-200 shrink-0" />
                <div className="flex-1 overflow-hidden">
                  <h4 className="font-bold uppercase truncate">
                    {language === 'ar' ? item.product.nameAr : item.product.nameEn}
                  </h4>
                  <p className="text-zinc-500 text-[10px]">
                    Size: {item.selectedSize} | Qty: {item.quantity}
                  </p>
                  <span className="font-bold text-black dark:text-white">
                    {formatPrice(item.product.price * item.quantity)}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Totals */}
          <div className="space-y-2 text-xs font-mono border-t pt-4">
            <div className="flex justify-between">
              <span>{t.cart.subtotal}</span>
              <span>{formatPrice(cartSubtotal)}</span>
            </div>
            {cartDiscountAmount > 0 && (
              <div className="flex justify-between text-emerald-600 font-bold">
                <span>{t.cart.discount}</span>
                <span>-{formatPrice(cartDiscountAmount)}</span>
              </div>
            )}
            <div className="flex justify-between">
              <span>{t.cart.shipping}</span>
              <span>{cartShippingFee === 0 ? t.cart.free : formatPrice(cartShippingFee)}</span>
            </div>
            <div className="flex justify-between text-base font-bold text-black dark:text-white border-t pt-3">
              <span>{t.cart.total}</span>
              <span>{formatPrice(cartGrandTotal)}</span>
            </div>
          </div>
        </div>

      </form>
    </div>
  );
};
