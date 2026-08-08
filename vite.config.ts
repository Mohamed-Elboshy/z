import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig } from 'vite';

export default defineConfig(() => {
  return {
    plugins: [react(), tailwindcss()],

    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },

    build: {
      // الحد الذي عنده Vite يظهر تحذير حجم الـ chunk
      chunkSizeWarningLimit: 500,

      // تصغير وضغط ملفات JavaScript
      minify: true,

      // لا تنشئ ملفات sourcemap في production
      sourcemap: false,

      rollupOptions: {
        output: {
          manualChunks: {
            react: ['react', 'react-dom'],
            motion: ['motion/react'],
            icons: ['lucide-react'],
          },
        },
      },
    },

    server: {
      hmr: process.env.DISABLE_HMR !== 'true',

      watch:
        process.env.DISABLE_HMR === 'true'
          ? null
          : {},
    },
  };
});