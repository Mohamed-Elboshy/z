import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';

interface VelvetBackgroundProps {
  children?: React.ReactNode;
  className?: string;
}

export const VelvetBackground: React.FC<VelvetBackgroundProps> = ({
  children,
  className = ''
}) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () =>
      setIsMobile(typeof window !== 'undefined' && window.innerWidth <= 768);

    check();

    window.addEventListener('resize', check);

    return () => window.removeEventListener('resize', check);
  }, []);

  return (
    <div
      className={`relative min-h-screen w-full bg-[#040205] text-white transition-colors overflow-hidden ${className}`}
    >
      {/* 1. Deep Black Velvet Gradient Base */}
      <div className="pointer-events-none absolute inset-0 z-0 bg-[radial-gradient(circle_at_top_left,_rgba(30,6,16,0.85),_rgba(0,0,0,0.1))]" />

      {/* 1b. Burgundy Textile Line Overlay */}
      <motion.div
        animate={
          isMobile
            ? {
                backgroundPosition: ['0% 0%', '50% 50%'],
                opacity: [0.14, 0.2]
              }
            : {
                backgroundPosition: [
                  '0% 0%',
                  '100% 50%',
                  '50% 100%',
                  '0% 0%'
                ],
                opacity: [0.18, 0.3, 0.22, 0.18]
              }
        }
        transition={{
          duration: isMobile ? 18 : 24,
          repeat: Infinity,
          ease: 'easeInOut'
        }}
        className="pointer-events-none absolute inset-0 z-0 mix-blend-screen"
        style={{
          backgroundImage: `
            radial-gradient(circle at 20% 20%, rgba(255,255,255,0.18) 0%, transparent 30%),
            radial-gradient(circle at 80% 30%, rgba(255,255,255,0.12) 0%, transparent 25%),
            radial-gradient(circle at 30% 80%, rgba(255,255,255,0.10) 0%, transparent 22%)
          `,
          backgroundSize: '220% 220%'
        }}
      />

      {/* 2. Tactile Micro Noise Fabric Texture */}
      <motion.div
        animate={{
          opacity: [0.035, 0.06, 0.04, 0.035],
          scale: [1, 1.02, 1, 1.01]
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: 'easeInOut'
        }}
        className="pointer-events-none absolute inset-0 z-0 mix-blend-overlay"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.88' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          backgroundSize: '160px 160px'
        }}
      />

      {/* 3. Velvet Soft Edge Vignette */}
      <div className="pointer-events-none absolute inset-0 z-0 bg-[radial-gradient(circle_at_center,_transparent_40%,_#030205_100%)] opacity-90" />

      <div className="relative z-10 w-full">
        {children}
      </div>
    </div>
  );
};