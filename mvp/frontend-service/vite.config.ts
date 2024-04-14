import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: '/',
  plugins: [react()],
  define: {
    VITE_BACKEND_HOST: JSON.stringify(process.env.VITE_BACKEND_HOST),
    VITE_BACKEND_PORT: process.env.VITE_BACKEND_PORT,
  },
  preview: {
    port: 8080,
    strictPort: true,
  },
  server: {
    port: 8080,
    strictPort: true,
    host: true,
    watch: {
      usePolling: true,
      interval: 100,
    },
  },
});
