import { defineConfig } from 'vite'
import path from 'path'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  mode: 'production',
  plugins: [
    // The React and Tailwind plugins are both required for Make, even if
    // Tailwind is not being actively used – do not remove them
    react(),
    tailwindcss(),
  ],
  resolve: {
    alias: {
      // Alias @ to the src directory
      '@': path.resolve(__dirname, './src'),
    },
  },
  define: {
    // Set production mode to suppress dev warnings from dependencies like Lit
    'process.env.NODE_ENV': JSON.stringify('production'),
    // Suppress Lit dev mode warning by overriding the dev flag
    'import.meta.env.DEV': false,
    'import.meta.env.PROD': true,
    // Define global for Node.js library compatibility (required by some web3 libs)
    global: 'globalThis',
  },
  build: {
    minify: 'esbuild',
    sourcemap: false,
  },
})
