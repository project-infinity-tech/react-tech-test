import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'node:path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
  ],
  server: {
    port: 8000,
  },
  test: {
    environment: 'jsdom',
    setupFiles: './testSetup.ts',
    pool: 'forks', // https://github.com/vitest-dev/vitest/issues/3077
  },
});
