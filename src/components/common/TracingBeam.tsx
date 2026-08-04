import React, { useEffect, useRef, useState } from 'react';
import { motion, useTransform, useScroll, useSpring } from 'motion/react';

export const TracingBeam = ({
  children,
  className = ''
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end end']
  });

  const contentRef = useRef<HTMLDivElement>(null);
  const [svgHeight, setSvgHeight] = useState(0);

  useEffect(() => {
    if (contentRef.current) {
      setSvgHeight(contentRef.current.offsetHeight);
    }

    const resizeObserver = new ResizeObserver(entries => {
      for (let entry of entries) {
        setSvgHeight(entry.contentRect.height);
      }
    });

    if (contentRef.current) {
      resizeObserver.observe(contentRef.current);
    }

    return () => resizeObserver.disconnect();
  }, []);

  const y1 = useSpring(
    useTransform(scrollYProgress, [0, 0.8], [50, svgHeight]),
    {
      stiffness: 500,
      damping: 90
    }
  );

  const y2 = useSpring(
    useTransform(scrollYProgress, [0, 1], [50, svgHeight - 50]),
    {
      stiffness: 500,
      damping: 90
    }
  );

  return (
    <motion.div
      ref={ref}
      className={`relative w-full max-w-7xl mx-auto h-full ${className}`}
    >
      <div className="absolute -left-4 md:-left-12 top-3 z-30">
        <motion.div
          transition={{
            duration: 0.2,
            delay: 0.5
          }}
          animate={{
            boxShadow:
              scrollYProgress.get() > 0
                ? 'none'
                : '0 0 24px 0 rgba(255,255,255,0.8)'
          }}
          className="ml-[27px] h-4 w-4 rounded-full border border-zinc-200 bg-white flex items-center justify-center shadow-md dark:border-zinc-700 dark:bg-zinc-900"
        >
          <motion.div
            transition={{
              duration: 0.2,
              delay: 0.5
            }}
            animate={{
              backgroundColor:
                scrollYProgress.get() > 0 ? 'white' : '#ffffff',
              borderColor:
                scrollYProgress.get() > 0 ? 'white' : '#ffffff'
            }}
            className="h-2 w-2 rounded-full border border-zinc-400 bg-white dark:bg-white"
          />
        </motion.div>
        <svg
          viewBox={`0 0 20 ${svgHeight}`}
          width="20"
          height={svgHeight}
          className="ml-4 block"
          aria-hidden="true"
        >
          <motion.path
            d={`M 1 0V -36 l 18 24 V ${svgHeight * 0.98} l -18 24V ${svgHeight}`}
            fill="none"
            stroke="#27272a"
            strokeOpacity="0.3"
            transition={{
              duration: 10
            }}
          ></motion.path>
          <motion.path
            d={`M 1 0V -36 l 18 24 V ${svgHeight * 0.98} l -18 24V ${svgHeight}`}
            fill="none"
            stroke="url(#gradient)"
            strokeWidth="2.5"
            className="motion-reduce:hidden"
            transition={{
              duration: 10
            }}
          ></motion.path>
          <defs>
            <motion.linearGradient
              id="gradient"
              gradientUnits="userSpaceOnUse"
              x1="0"
              x2="0"
              y1={y1}
              y2={y2}
            >
              <stop stopColor="#18181b" stopOpacity="0" />
              <stop stopColor="#ffffff" />
              <stop stopColor="#e4e4e7" />
              <stop stopColor="#ffffff" stopOpacity="0" />
            </motion.linearGradient>
          </defs>
        </svg>
      </div>
      <div ref={contentRef}>{children}</div>
    </motion.div>
  );
};
