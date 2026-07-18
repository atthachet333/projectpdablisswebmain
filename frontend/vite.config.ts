import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5555,
    proxy: {
      '/api': {
        target: 'http://localhost:5556',
        changeOrigin: true,
        secure: false,
      },
    },
  },
  preview: {
    port: 5555,
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
