import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { fileURLToPath, URL } from 'node:url'
export default defineConfig({
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules/radix-ui') || id.includes('node_modules/@radix-ui'))
            return 'vendor-ui'
          if (id.includes('node_modules/recharts') || id.includes('node_modules/d3-'))
            return 'vendor-charts'
        },
      },
    },
  },
  plugins: [react(), tailwindcss()],
  resolve: { alias: { '@': fileURLToPath(new URL('./src', import.meta.url)) } },
})
