// vite.config.ts
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import UnoCSS from 'unocss/vite'

// Use environment variable to determine base URL
const baseUrl = process.env.NODE_ENV === 'production' ? '/common_yaml/' : '/'

export default defineConfig({
  base: baseUrl,
  plugins: [
    vue(),
    UnoCSS(),
  ],
  // Configure asset handling
  build: {
    assetsDir: 'assets',
    rollupOptions: {
      output: {
        assetFileNames: 'assets/[name].[hash][extname]'
      }
    }
  },
})