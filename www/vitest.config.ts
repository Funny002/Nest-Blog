import {defineConfig, mergeConfig} from 'vitest/config';
import ViteConfig from './vite.config';

export default mergeConfig(ViteConfig, defineConfig({
  test: {
    environment: 'happy-dom',
    // reporters: ['html'],
    include: [
      'test/**/*.(test|jest).{ts,js}',
    ],
  },
}));
