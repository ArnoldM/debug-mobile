/// <reference types="vitest" />

import angular from '@analogjs/vite-plugin-angular';

import { defineConfig } from 'vite';
import tsconfigPaths from "vite-tsconfig-paths";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  return {
    plugins: [angular(), tsconfigPaths()],
    test: {
      globals: true,
      environment: 'jsdom',
      setupFiles: ['src/test-setup.ts'],
      include: ['**/*.spec.ts'],
      exclude: ['e2e/*.ts', 'node_modules/**/*'],
      reporters: ['default'],
      coverage: {
        enabled: true,
        provider: 'istanbul',
        reporter: ['html'],

      },
      server: {
        deps: {
          inline: ['@ionic/angular', '@stencil/core']
        }
      }
    },
    define: {
      'import.meta.vitest': mode !== 'production',
    },
  };
});
