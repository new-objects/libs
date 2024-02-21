import { defineConfig } from 'vite';

export default defineConfig({
  test: {
    browser: {
      enabled: true,
      name: 'chrome',
    },
    testTimeout: 1000,
  },
});
