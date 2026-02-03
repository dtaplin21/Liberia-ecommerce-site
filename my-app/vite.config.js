import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  define: {
    'import.meta.env.NEXT_PUBLIC_COMING_SOON': JSON.stringify(process.env.NEXT_PUBLIC_COMING_SOON || 'false')
  }
})
