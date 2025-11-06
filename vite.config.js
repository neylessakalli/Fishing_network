import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    open: true
  },
  root: '.',
  build: {
    outDir: 'dist',
    // Ensure public folder files are copied
    copyPublicDir: true
  },
  // Public directory for static assets (robots.txt, sitemap.xml, etc.)
  publicDir: 'public'
})

