import React from 'react';

export const ProductCardSkeleton: React.FC = () => {
  return (
    <div className="flex flex-col bg-white dark:bg-zinc-950 border border-zinc-200/80 dark:border-zinc-800 animate-pulse">
      <div className="aspect-[3/4] w-full bg-zinc-200 dark:bg-zinc-800/60" />
      <div className="p-4 space-y-3">
        <div className="h-2.5 w-1/3 bg-zinc-200 dark:bg-zinc-800 rounded" />
        <div className="h-4 w-3/4 bg-zinc-200 dark:bg-zinc-800 rounded" />
        <div className="h-3 w-1/2 bg-zinc-200 dark:bg-zinc-800 rounded" />
      </div>
    </div>
  );
};

export const HeroSkeleton: React.FC = () => {
  return (
    <div className="w-full h-[550px] bg-zinc-200 dark:bg-zinc-900 animate-pulse flex flex-col justify-end p-12">
      <div className="h-4 w-32 bg-zinc-300 dark:bg-zinc-800 mb-4 rounded" />
      <div className="h-12 w-2/3 bg-zinc-300 dark:bg-zinc-800 mb-6 rounded" />
      <div className="h-10 w-44 bg-zinc-300 dark:bg-zinc-800 rounded" />
    </div>
  );
};
