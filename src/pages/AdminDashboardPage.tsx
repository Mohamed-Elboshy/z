import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { translations } from '../translations/i18n';
import { Product, Order } from '../types';
import { InvoicePDFView } from '../components/common/InvoicePDFView';
import { LayoutDashboard, Package, ShoppingCart, Tag, Plus, Trash2, Edit, TrendingUp, AlertTriangle, Printer, CheckCircle } from 'lucide-react';

export const AdminDashboardPage: React.FC = () => {
  const { language, products, orders, coupons, updateOrderStatus, formatPrice, addToast } = useApp();
  const t = translations[language];

  const [activeAdminTab, setActiveAdminTab] = useState<'overview' | 'products' | 'orders' | 'coupons'>('overview');
  const [selectedInvoice, setSelectedInvoice] = useState<Order | null>(null);

  // Stats calculation
  const totalRevenue = orders.reduce((acc, curr) => acc + curr.total, 0);
  const totalOrdersCount = orders.length;
  const activeProductsCount = products.length;
  const lowStockCount = products.filter(p => p.stock <= 5).length;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b border-zinc-200 dark:border-zinc-800 pb-4 gap-4">
        <div>
          <span className="text-[10px] font-mono tracking-[0.3em] uppercase text-amber-500 font-bold">ZARA STORE MANAGEMENT SYSTEM</span>
          <h1 className="text-3xl font-serif font-bold uppercase tracking-wider">{t.admin.title}</h1>
          <p className="text-xs font-mono text-zinc-500 mt-0.5">Cairo Flagship E-Commerce Control Console</p>
        </div>
        <div className="flex items-center gap-2 text-xs font-mono bg-zinc-100 dark:bg-zinc-900 px-4 py-2 border border-zinc-200 dark:border-zinc-800">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
          <span>Server Status: <strong className="text-emerald-600">LIVE & SYNCED</strong></span>
        </div>
      </div>

      {/* Overview Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-6 bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 space-y-2">
          <div className="flex justify-between text-zinc-400">
            <span className="text-xs font-mono font-bold uppercase">{t.admin.stats.revenue}</span>
            <TrendingUp className="w-4 h-4 text-emerald-500" />
          </div>
          <div className="text-2xl font-mono font-bold text-black dark:text-white">
            {formatPrice(totalRevenue)}
          </div>
          <p className="text-[10px] font-mono text-emerald-600">+18.4% vs last week</p>
        </div>

        <div className="p-6 bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 space-y-2">
          <div className="flex justify-between text-zinc-400">
            <span className="text-xs font-mono font-bold uppercase">{t.admin.stats.orders}</span>
            <ShoppingCart className="w-4 h-4 text-amber-500" />
          </div>
          <div className="text-2xl font-mono font-bold text-black dark:text-white">
            {totalOrdersCount}
          </div>
          <p className="text-[10px] font-mono text-zinc-500">Total Fulfilled Orders</p>
        </div>

        <div className="p-6 bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 space-y-2">
          <div className="flex justify-between text-zinc-400">
            <span className="text-xs font-mono font-bold uppercase">{t.admin.stats.activeProducts}</span>
            <Package className="w-4 h-4 text-blue-500" />
          </div>
          <div className="text-2xl font-mono font-bold text-black dark:text-white">
            {activeProductsCount}
          </div>
          <p className="text-[10px] font-mono text-zinc-500">SKUs in Catalog</p>
        </div>

        <div className="p-6 bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 space-y-2">
          <div className="flex justify-between text-zinc-400">
            <span className="text-xs font-mono font-bold uppercase">{t.admin.stats.lowStock}</span>
            <AlertTriangle className="w-4 h-4 text-rose-500" />
          </div>
          <div className="text-2xl font-mono font-bold text-rose-600">
            {lowStockCount}
          </div>
          <p className="text-[10px] font-mono text-rose-500">Requires Replenishment</p>
        </div>
      </div>

      {/* Admin Navigation Tabs */}
      <div className="flex border-b border-zinc-200 dark:border-zinc-800 text-xs font-mono font-bold uppercase">
        <button
          onClick={() => setActiveAdminTab('overview')}
          className={`py-3 px-6 border-b-2 transition-colors ${
            activeAdminTab === 'overview' ? 'border-black dark:border-white text-black dark:text-white' : 'border-transparent text-zinc-400'
          }`}
        >
          {t.admin.tabs.overview}
        </button>
        <button
          onClick={() => setActiveAdminTab('products')}
          className={`py-3 px-6 border-b-2 transition-colors ${
            activeAdminTab === 'products' ? 'border-black dark:border-white text-black dark:text-white' : 'border-transparent text-zinc-400'
          }`}
        >
          {t.admin.tabs.products} ({products.length})
        </button>
        <button
          onClick={() => setActiveAdminTab('orders')}
          className={`py-3 px-6 border-b-2 transition-colors ${
            activeAdminTab === 'orders' ? 'border-black dark:border-white text-black dark:text-white' : 'border-transparent text-zinc-400'
          }`}
        >
          {t.admin.tabs.orders} ({orders.length})
        </button>
        <button
          onClick={() => setActiveAdminTab('coupons')}
          className={`py-3 px-6 border-b-2 transition-colors ${
            activeAdminTab === 'coupons' ? 'border-black dark:border-white text-black dark:text-white' : 'border-transparent text-zinc-400'
          }`}
        >
          {t.admin.tabs.coupons}
        </button>
      </div>

      {/* TAB 1: OVERVIEW & ANALYTICS */}
      {activeAdminTab === 'overview' && (
        <div className="space-y-6">
          <h2 className="text-xs font-serif font-bold tracking-widest uppercase">WEEKLY SALES CHART (EGP)</h2>
          <div className="p-6 bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 h-64 flex items-end justify-between gap-4">
            {[
              { day: 'Mon', amount: 12400 },
              { day: 'Tue', amount: 18900 },
              { day: 'Wed', amount: 24500 },
              { day: 'Thu', amount: 32000 },
              { day: 'Fri', amount: 48000 },
              { day: 'Sat', amount: 52000 },
              { day: 'Sun', amount: 41000 }
            ].map(item => (
              <div key={item.day} className="flex-1 flex flex-col items-center gap-2 h-full justify-end">
                <span className="text-[10px] font-mono text-zinc-400 font-bold">{item.amount / 1000}k</span>
                <div
                  className="w-full bg-black dark:bg-white transition-all hover:bg-amber-500 dark:hover:bg-amber-400"
                  style={{ height: `${(item.amount / 55000) * 100}%` }}
                />
                <span className="text-xs font-mono font-bold">{item.day}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 2: PRODUCT MANAGEMENT */}
      {activeAdminTab === 'products' && (
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-xs font-serif font-bold tracking-widest uppercase">PRODUCT CATALOG INVENTORY</h2>
            <button
              onClick={() => addToast('Opening add product form...', 'info')}
              className="bg-black text-white dark:bg-white dark:text-black text-xs font-mono font-bold px-4 py-2 uppercase flex items-center gap-1"
            >
              <Plus className="w-4 h-4" />
              <span>{t.admin.products.addNew}</span>
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-xs font-mono border-collapse min-w-[700px]">
              <thead>
                <tr className="border-b-2 border-black dark:border-white text-left">
                  <th className="py-2">IMAGE</th>
                  <th className="py-2">PRODUCT NAME</th>
                  <th className="py-2">CATEGORY</th>
                  <th className="py-2">PRICE</th>
                  <th className="py-2">STOCK</th>
                  <th className="py-2 text-right">ACTIONS</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800">
                {products.map(p => (
                  <tr key={p.id}>
                    <td className="py-3">
                      <img src={p.images[0]} alt="" className="w-10 h-12 object-cover bg-zinc-200" />
                    </td>
                    <td className="py-3 font-bold">{language === 'ar' ? p.nameAr : p.nameEn}</td>
                    <td className="py-3 text-zinc-500">{p.category} ({p.gender})</td>
                    <td className="py-3 font-bold">{formatPrice(p.price)}</td>
                    <td className="py-3">
                      <span className={`font-bold ${p.stock <= 5 ? 'text-rose-600' : 'text-emerald-600'}`}>
                        {p.stock} units
                      </span>
                    </td>
                    <td className="py-3 text-right space-x-2">
                      <button className="p-1 hover:text-amber-500" title="Edit">
                        <Edit className="w-4 h-4" />
                      </button>
                      <button className="p-1 hover:text-rose-600" title="Delete">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 3: ORDER FULFILLMENT MANAGEMENT */}
      {activeAdminTab === 'orders' && (
        <div className="space-y-6">
          <h2 className="text-xs font-serif font-bold tracking-widest uppercase">EGYPT CUSTOMER ORDERS</h2>

          <div className="space-y-4">
            {orders.map(order => (
              <div key={order.id} className="p-6 bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 space-y-4 font-mono text-xs">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b pb-3 gap-2">
                  <div>
                    <span className="font-bold text-base text-black dark:text-white">{order.id}</span>
                    <span className="text-zinc-400 ml-2">Customer: <strong>{order.customerName}</strong> ({order.customerPhone})</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-zinc-500 uppercase">Status:</span>
                    <select
                      value={order.orderStatus}
                      onChange={e => updateOrderStatus(order.id, e.target.value as any)}
                      className="bg-zinc-100 dark:bg-zinc-900 border px-3 py-1 font-bold text-xs uppercase cursor-pointer"
                    >
                      <option value="Pending">Pending</option>
                      <option value="Confirmed">Confirmed</option>
                      <option value="Preparing">Preparing</option>
                      <option value="Packed">Packed</option>
                      <option value="Shipping">Shipping</option>
                      <option value="Delivered">Delivered</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <span className="font-bold text-zinc-400 uppercase">Items:</span>
                    <ul className="list-disc list-inside text-zinc-600 dark:text-zinc-300 mt-1">
                      {order.items.map((it, idx) => (
                        <li key={idx}>
                          {language === 'ar' ? it.nameAr : it.nameEn} (Size: {it.size}, Qty: {it.quantity})
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="text-right space-y-1">
                    <p>Method: <strong className="uppercase">{order.paymentMethod}</strong></p>
                    <p className="text-base font-bold text-emerald-600">{formatPrice(order.total)}</p>
                    <button
                      onClick={() => setSelectedInvoice(order)}
                      className="bg-black text-white dark:bg-white dark:text-black font-semibold text-[10px] tracking-widest uppercase px-3 py-1.5 inline-flex items-center gap-1 mt-2"
                    >
                      <Printer className="w-3 h-3" />
                      <span>PRINT INVOICE</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 4: COUPONS */}
      {activeAdminTab === 'coupons' && (
        <div className="space-y-6">
          <h2 className="text-xs font-serif font-bold tracking-widest uppercase">PROMO DISCOUNTS</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 font-mono text-xs">
            {coupons.map(coupon => (
              <div key={coupon.id} className="p-4 bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 space-y-2">
                <span className="bg-amber-400 text-black font-bold px-2 py-0.5 text-[10px] rounded">
                  {coupon.discountPercent}% OFF
                </span>
                <h3 className="text-lg font-bold text-black dark:text-white">{coupon.code}</h3>
                <p className="text-zinc-500">Min Order: {formatPrice(coupon.minOrderAmount)}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {selectedInvoice && (
        <InvoicePDFView order={selectedInvoice} onClose={() => setSelectedInvoice(null)} />
      )}

    </div>
  );
};
