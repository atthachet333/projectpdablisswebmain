import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],

  server: {
    host: '0.0.0.0',
    port: 5555,

    allowedHosts: [
      'pdabliss.com',
      'www.pdabliss.com',
    ],

    proxy: {
      '/api': {
        target: 'http://127.0.0.1:5556',
        changeOrigin: true,
        secure: false,
      },
    },
  },

  preview: {
    host: '0.0.0.0',
    port: 5555,

    allowedHosts: [
      'pdabliss.com',
      'www.pdabliss.com',
    ],
  },

  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          react: ['react', 'react-dom'],
          router: ['react-router-dom'],
          motion: ['framer-motion'],
          swiper: ['swiper'],
        },
      },
    },
  },
})