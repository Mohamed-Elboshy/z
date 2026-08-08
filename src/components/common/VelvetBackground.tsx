import React from 'react';
const burgundySilkBg = '/images/background/burgundy_silk_bg_1786109916303.jpg';

interface VelvetBackgroundProps {
  children?: React.ReactNode;
  className?: string;
}

export const VelvetBackground: React.FC<VelvetBackgroundProps> = ({
  children,
  className = ''
}) => {
  return (
    <div className={`relative min-h-screen w-full bg-[#0d0104] text-white overflow-hidden ${className}`}>
      {/* 1. Full Screen Silk Wallpaper Image */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <img
          src={burgundySilkBg}
          alt="Burgundy Silk Background"
          className="w-full h-full object-cover object-center opacity-85 scale-105"
          referrerPolicy="no-referrer"
        />
        {/* Dark vignette gradient overlay for contrast and content readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/25 to-black/80" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_transparent_20%,_rgba(5,1,2,0.65)_100%)]" />
      </div>

      {/* 2. Soft Ambient Lighting Boost */}
      <div className="pointer-events-none fixed inset-0 z-0 opacity-40 mix-blend-screen bg-[radial-gradient(ellipse_at_50%_20%,_rgba(180,20,60,0.35)_0%,_transparent_70%)]" />

      {/* 3. Subtle Texture Grain Overlay */}
      <div 
        className="pointer-events-none fixed inset-0 z-0 opacity-[0.03] mix-blend-overlay"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          backgroundSize: '180px 180px'
        }}
      />

      {/* 4. Content Container */}
      <div className="relative z-10 w-full">
        {children}
      </div>
    </div>
  );
};


