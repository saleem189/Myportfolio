import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  base: '/Myportfolio/',
  plugins: [
    vue(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  optimizeDeps: {
    include: ['firebase/app', 'firebase/firestore', 'firebase/analytics']
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          // Separate Vue core and router
          'vue-vendor': ['vue', 'vue-router'],
          // Firebase libraries
          'firebase-vendor': ['firebase/app', 'firebase/firestore', 'firebase/analytics'],
          // UI libraries
          'ui-vendor': ['lucide-vue-next', 'vue3-cookies', 'v-tooltip', 'vue-scrollto']
        }
      }
    },
    // Increase chunk size warning limit to 600kb (optional, but helps reduce warnings)
    chunkSizeWarningLimit: 600
  }
})
