import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// BASE_PATH is set by the GitHub Pages workflow to '/hospital/'.
// Locally and for Hostinger we keep './' (relative paths) so the build
// works at the document root or any subdirectory.
// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: process.env.BASE_PATH || './',
})
