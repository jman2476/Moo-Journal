import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/graphql': {
        target: 'http://localhost:3469',
        changeOrigin: true,
        secure: false,
        ws: true
      }
    }
  }
})
