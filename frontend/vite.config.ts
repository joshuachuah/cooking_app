import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    proxy: {
      '/recipes': 'http://localhost:8000',
      '/feedback': 'http://localhost:8000',
      '/health': 'http://localhost:8000'
    }
  }
})

