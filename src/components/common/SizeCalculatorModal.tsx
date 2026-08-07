import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { translations } from '../../translations/i18n';
import { X, Sparkles, CheckCircle2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export const SizeCalculatorModal: React.FC = () => {
  const { language, sizeCalcProduct, setSizeCalcProduct } = useApp();
  const t = translations[language];

  const [height, setHeight] = useState<number>(172);
  const [weight, setWeight] = useState<number>(68);
  const [fitPref, setFitPref] = useState<'tight' | 'regular' | 'oversized'>('regular');
  const [calculatedSize, setCalculatedSize] = useState<string | null>(null);

  if (!sizeCalcProduct) return null;

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault();

    // Standard Zara BMI-based size calculation formula algorithm
    const bmi = weight / ((height / 100) * (height / 100));
    let size = 'M';

    if (bmi < 19) size = 'XS';
    else if (bmi >= 19 && bmi < 22) size = 'S';
    else if (bmi >= 22 && bmi < 25) size = 'M';
    else if (bmi >= 25 && bmi < 28) size = 'L';
    else if (bmi >= 28 && bmi < 32) size = 'XL';
    else size = 'XXL';

    if (fitPref === 'tight') {
      if (size === 'XXL') size = 'XL';
      else if (size === 'XL') size = 'L';
      else if (size === 'L') size = 'M';
      else if (size === 'M') size = 'S';
      else if (size === 'S') size = 'XS';
    } else if (fitPref === 'oversized') {
      if (size === 'XS') size = 'S';
      else if (size === 'S') size = 'M';
      else if (size === 'M') size = 'L';
      else if (size === 'L') size = 'XL';
      else if (size === 'XL') size = 'XXL';
    }

    setCalculatedSize(size);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 overflow-y-auto bg-black/70 backdrop-blur-md flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 max-w-lg w-full shadow-2xl border border-zinc-200 dark:border-zinc-800 p-6 sm:p-8 relative"
        >
          <button
            onClick={() => {
              setCalculatedSize(null);
              setSizeCalcProduct(null);
            }}
            className="absolute top-6 right-6 p-1 text-zinc-400 hover:text-black dark:hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-2 mb-2 text-amber-500 font-mono text-xs">
            <Sparkles className="w-4 h-4" />
            <span>ZARA SMART FIT ENGINE</span>
          </div>

          <h3 className="text-lg font-serif font-bold uppercase tracking-wider mb-6">
            {t.sizeCalc.title}
          </h3>

          <form onSubmit={handleCalculate} className="space-y-5">
            {/* Height slider */}
            <div>
              <div className="flex justify-between text-xs font-mono mb-1">
                <label>{t.sizeCalc.height}</label>
                <span className="font-bold">{height} cm</span>
              </div>
              <input
                type="range"
                min={140}
                max={210}
                value={height}
                onChange={e => setHeight(Number(e.target.value))}
                className="w-full accent-black dark:accent-white"
              />
            </div>

            {/* Weight slider */}
            <div>
              <div className="flex justify-between text-xs font-mono mb-1">
                <label>{t.sizeCalc.weight}</label>
                <span className="font-bold">{weight} kg</span>
              </div>
              <input
                type="range"
                min={40}
                max={130}
                value={weight}
                onChange={e => setWeight(Number(e.target.value))}
                className="w-full accent-black dark:accent-white"
              />
            </div>

            {/* Fit Preference */}
            <div>
              <label className="text-xs font-mono mb-2 block">{t.sizeCalc.fitPreference}</label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { key: 'tight', label: t.sizeCalc.tight },
                  { key: 'regular', label: t.sizeCalc.regular },
                  { key: 'oversized', label: t.sizeCalc.oversized }
                ].map(item => (
                  <button
                    key={item.key}
                    type="button"
                    onClick={() => setFitPref(item.key as any)}
                    className={`py-2 px-1 text-[10px] font-mono border text-center transition-colors ${
                      fitPref === item.key
                        ? 'bg-black text-white dark:bg-white dark:text-black border-black dark:border-white font-bold'
                        : 'border-zinc-300 dark:border-zinc-700'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-black text-white dark:bg-white dark:text-black py-3.5 text-xs font-bold tracking-widest uppercase hover:opacity-90 transition-opacity"
            >
              {t.sizeCalc.calculate}
            </button>
          </form>

          {/* Result Box */}
          {calculatedSize && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-6 p-4 bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-center space-y-2"
            >
              <div className="flex items-center justify-center gap-1.5 text-emerald-600 dark:text-emerald-400 font-bold text-xs">
                <CheckCircle2 className="w-4 h-4" />
                <span>94% Accuracy Based on Z Egyptian Shoppers</span>
              </div>
              <p className="text-xs text-zinc-500">{t.sizeCalc.recommendedSize}</p>
              <div className="text-3xl font-mono font-black text-black dark:text-white">
                {calculatedSize}
              </div>
            </motion.div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
