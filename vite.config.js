import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],

  // Path alias: import '@/components/...' instead of '../../../components/...'
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },

  // Pre-bundle heavy Three.js deps for faster dev startup
  optimizeDeps: {
    include: ['three', '@react-three/fiber', '@react-three/drei'],
  },
})
