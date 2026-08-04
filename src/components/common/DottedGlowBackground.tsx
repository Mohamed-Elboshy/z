import React from 'react';

interface DottedGlowBackgroundProps {
  children?: React.ReactNode;
  className?: string;
}

export const DottedGlowBackground: React.FC<DottedGlowBackgroundProps> = ({
  children,
  className = ''
}) => {
  return (
    <div className={`relative min-h-screen w-full bg-[#FAFAFA] dark:bg-zinc-950 text-black dark:text-white transition-colors overflow-hidden ${className}`}>
      {/* 1. Dotted Matrix Pattern with Luxury Gold (#D7981A) - Scaled +15% */}
      <div 
        className="pointer-events-none absolute inset-0 z-0 opacity-[0.25] dark:opacity-[0.4]"
        style={{
          backgroundImage: `radial-gradient(#D7981A 1.38px, transparent 1.38px)`,
          backgroundSize: '27.6px 27.6px'
        }}
      />

      {/* 2. Soft Gold Ambient Glow Orbs */}
      <div 
        className="pointer-events-none absolute -top-40 -left-40 w-[600px] h-[600px] rounded-full blur-[140px] opacity-20 dark:opacity-25 transition-all duration-1000 z-0"
        style={{
          background: 'radial-gradient(circle, #D7981A 0%, rgba(215,152,26,0) 70%)'
        }}
      />
      <div 
        className="pointer-events-none absolute top-1/3 -right-40 w-[700px] h-[700px] rounded-full blur-[160px] opacity-15 dark:opacity-20 transition-all duration-1000 z-0"
        style={{
          background: 'radial-gradient(circle, #D7981A 0%, rgba(215,152,26,0) 70%)'
        }}
      />
      <div 
        className="pointer-events-none absolute bottom-10 left-1/4 w-[500px] h-[500px] rounded-full blur-[150px] opacity-10 dark:opacity-15 transition-all duration-1000 z-0"
        style={{
          background: 'radial-gradient(circle, #D7981A 0%, rgba(215,152,26,0) 70%)'
        }}
      />

      {/* 3. Radial Mask Layer to soften background towards edges */}
      <div className="pointer-events-none absolute inset-0 z-0 bg-radial from-transparent via-transparent to-[#FAFAFA]/70 dark:to-zinc-950/80" />

      {/* Content wrapper */}
      <div className="relative z-10 w-full">
        {children}
      </div>
    </div>
  );
};
