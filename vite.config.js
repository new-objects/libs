import { defineConfig } from 'vite';

export default defineConfig({
  test: {
    environment: 'jsdom',
    testTimeout: 1000,
  },
});
