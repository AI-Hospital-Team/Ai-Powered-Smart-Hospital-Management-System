
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],

  // GitHub Pages uses a repository subpath.
  // Vercel serves the app from the domain root.
  base:
    process.env.GITHUB_PAGES === 'true'
      ? '/Ai-Powered-Smart-Hospital-Management-System/'
      : '/',
})
