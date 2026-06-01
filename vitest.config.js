import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    globals: true,
    environment: 'jsdom',
    include: [
      '**/__tests__/**/*.{test,spec}.{js,mjs,cjs,ts}',
      '**/*.{test,spec}.{js,mjs,cjs,ts}',
    ],
    exclude: ['**/node_modules/**', '**/__fixtures__/**'],
  },
});
