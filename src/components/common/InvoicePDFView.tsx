import React from 'react';
import { Order } from '../../types';
import { useApp } from '../../context/AppContext';
import { X, Printer, ShieldCheck } from 'lucide-react';

interface InvoicePDFViewProps {
  order: Order;
  onClose: () => void;
}

export const InvoicePDFView: React.FC<InvoicePDFViewProps> = ({ order, onClose }) => {
  const { language, formatPrice } = useApp();

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-white text-black max-w-3xl w-full p-8 sm:p-12 relative shadow-2xl printable-invoice">
        {/* Actions Top Right (Hidden during print) */}
        <div className="absolute top-6 right-6 flex items-center gap-3 print:hidden">
          <button
            onClick={handlePrint}
            className="flex items-center gap-2 bg-black text-white px-4 py-2 text-xs font-mono font-bold uppercase hover:bg-zinc-800 transition-colors"
          >
            <Printer className="w-4 h-4" />
            <span>PRINT INVOICE</span>
          </button>
          <button onClick={onClose} className="p-2 text-zinc-500 hover:text-black">
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Invoice Header */}
        <div className="border-b-2 border-black pb-8 mb-8 flex justify-between items-start">
          <div>
            <h1 className="text-4xl font-serif font-black tracking-widest uppercase">ZARA</h1>
            <p className="text-[10px] font-mono tracking-widest text-zinc-600 uppercase mt-1">
              FASHION E-COMMERCE EGYPT S.A.E.
            </p>
            <p className="text-[10px] font-mono text-zinc-500 mt-0.5">
              Tax Reg. No: 492-109-883 | Tax Card: 104-921
            </p>
            <p className="text-[10px] font-mono text-zinc-500">
              Mall of Egypt Hub, Giza, Cairo Governorate
            </p>
          </div>
          <div className="text-right">
            <h2 className="text-xl font-mono font-bold uppercase">TAX INVOICE</h2>
            <p className="text-xs font-mono text-zinc-600 mt-1">
              Invoice No: <strong>{order.id}</strong>
            </p>
            <p className="text-xs font-mono text-zinc-600">
              Date: {new Date(order.createdAt).toLocaleDateString()}
            </p>
          </div>
        </div>

        {/* Billed To & Payment Meta */}
        <div className="grid grid-cols-2 gap-8 mb-8 text-xs font-mono">
          <div className="space-y-1">
            <h3 className="font-bold uppercase text-zinc-400">BILLED TO</h3>
            <p className="font-bold text-sm">{order.customerName}</p>
            <p>{order.address}</p>
            <p>{order.governorate}, Egypt</p>
            <p>Tel: {order.customerPhone}</p>
            <p>Email: {order.customerEmail}</p>
          </div>
          <div className="space-y-1 border-l pl-6">
            <h3 className="font-bold uppercase text-zinc-400">PAYMENT & STATUS</h3>
            <p>
              Method: <strong className="uppercase">{order.paymentMethod}</strong>
            </p>
            <p>
              Status: <strong className="text-emerald-700">{order.paymentStatus}</strong>
            </p>
            {order.fawryReference && (
              <p className="text-amber-700 font-bold">
                Fawry Code: {order.fawryReference}
              </p>
            )}
            <p>
              Fulfilment: <strong>{order.orderStatus}</strong>
            </p>
          </div>
        </div>

        {/* Items Table */}
        <table className="w-full text-xs font-mono mb-8 border-collapse">
          <thead>
            <tr className="border-b-2 border-black text-left">
              <th className="py-2">ITEM DESCRIPTION</th>
              <th className="py-2">SIZE / COLOR</th>
              <th className="py-2 text-right">QTY</th>
              <th className="py-2 text-right">UNIT PRICE</th>
              <th className="py-2 text-right">TOTAL</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-200">
            {order.items.map((item, idx) => (
              <tr key={idx}>
                <td className="py-3 font-semibold uppercase">{language === 'ar' ? item.nameAr : item.nameEn}</td>
                <td className="py-3 text-zinc-600">
                  {item.size} / {item.color}
                </td>
                <td className="py-3 text-right">{item.quantity}</td>
                <td className="py-3 text-right">{formatPrice(item.price)}</td>
                <td className="py-3 text-right font-bold">{formatPrice(item.price * item.quantity)}</td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Total Calculations */}
        <div className="flex justify-end mb-8">
          <div className="w-64 space-y-2 text-xs font-mono border-t-2 border-black pt-4">
            <div className="flex justify-between">
              <span>Subtotal:</span>
              <span>{formatPrice(order.subtotal)}</span>
            </div>
            {order.discountAmount > 0 && (
              <div className="flex justify-between text-emerald-700 font-bold">
                <span>Discount:</span>
                <span>-{formatPrice(order.discountAmount)}</span>
              </div>
            )}
            <div className="flex justify-between">
              <span>Shipping:</span>
              <span>{order.shippingFee === 0 ? 'FREE' : formatPrice(order.shippingFee)}</span>
            </div>
            <div className="flex justify-between text-base font-bold border-t border-black pt-2">
              <span>Grand Total:</span>
              <span>{formatPrice(order.total)}</span>
            </div>
          </div>
        </div>

        {/* Footer info */}
        <div className="border-t border-zinc-300 pt-6 text-[10px] font-mono text-zinc-500 text-center space-y-1">
          <div className="flex items-center justify-center gap-1 text-emerald-700 font-bold">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>OFFICIAL ELECTRONIC TAX RECEIPT - ZARA EGYPT</span>
          </div>
          <p>Thank you for shopping at Zara Flagship Store. Keep this receipt for 30-day returns & exchanges.</p>
        </div>
      </div>
    </div>
  );
};
