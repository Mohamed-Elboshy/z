import React from 'react';
import { useApp } from '../../context/AppContext';
import { CheckCircle2, AlertCircle, Info, XCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export const ToastContainer: React.FC = () => {
  const { toasts } = useApp();

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3 max-w-md w-full pointer-events-none px-4">
      <AnimatePresence>
        {toasts.map(toast => (
          <motion.div
            key={toast.id}
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
            className="pointer-events-auto flex items-center gap-3 bg-black text-white dark:bg-white dark:text-black px-5 py-3.5 shadow-2xl border border-zinc-800 dark:border-zinc-200 text-xs tracking-wider uppercase font-sans font-medium"
          >
            {toast.type === 'success' && <CheckCircle2 className="w-4 h-4 text-emerald-400 dark:text-emerald-600 shrink-0" />}
            {toast.type === 'warning' && <AlertCircle className="w-4 h-4 text-amber-400 dark:text-amber-600 shrink-0" />}
            {toast.type === 'error' && <XCircle className="w-4 h-4 text-rose-400 dark:text-rose-600 shrink-0" />}
            {toast.type === 'info' && <Info className="w-4 h-4 text-sky-400 dark:text-sky-600 shrink-0" />}
            <span className="flex-1 leading-snug">{toast.text}</span>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};
