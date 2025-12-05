import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      devOptions: {
        enabled: true  // <--- THIS IS THE MAGIC LINE FOR LOCALHOST:5173
      },
      includeAssets: ['favicon.ico', 'apple-touch-icon.png', 'masked-icon.svg'],
      manifest: {
        name: 'BabyBliss Shop',
        short_name: 'BabyBliss',
        description: 'Premium Baby Products & Fashion',
        theme_color: '#ec4899',
        background_color: '#ffffff',
        display: 'standalone',
        scope: '/',
        start_url: '/',
        orientation: 'portrait',
        icons: [
          {
            src: 'pwa-192x192.png', // Ensure this file name matches exactly in public folder
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: 'pwa-512x512.png', // Ensure this file name matches exactly in public folder
            sizes: '512x512',
            type: 'image/png'
          }
        ]
      }
    })
  ],
})