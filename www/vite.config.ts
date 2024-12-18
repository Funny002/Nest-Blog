import {ElementPlusResolver} from 'unplugin-vue-components/resolvers';
import Components from 'unplugin-vue-components/vite';
import AutoImport from 'unplugin-auto-import/vite';
import vue from '@vitejs/plugin-vue';
import {defineConfig} from 'vite';
import {resolve} from 'node:path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    AutoImport({
      resolvers: [ElementPlusResolver()],
    }),
    Components({
      resolvers: [ElementPlusResolver()],
    }),
  ],
  base: './',
  clearScreen: false, // 控制台清空
  cacheDir: resolve(__dirname, '.cache'),
  publicDir: resolve(__dirname, './public'),
  server: {
    port: 4083,
    open: false,
    host: '0.0.0.0',
  },
  css: {
    devSourcemap: true, // css开发时产生映射
  },
  json: {
    stringify: true, // json直接载入性能优化
  },
  build: {
    target: 'esnext', // es6 | esnext
    sourcemap: false, //  css不产生反向映射
    minify: 'esbuild', // 代码混淆
    cssCodeSplit: true, // css是否拆分
    assetsInlineLimit: 0, // 全部采用外部引用
    reportCompressedSize: true, // gzip 压缩大小报告
    outDir: resolve(__dirname, '../output/www'),
    rollupOptions: {
      output: {
        compact: true,
        entryFileNames: 'js/[name]-[hash].js',
        chunkFileNames: 'js/[name]-[hash].js',
        assetFileNames: '[ext]/[name]-[hash].[ext]',
      },
    },
  },
  resolve: {
    alias: {
      '@api': resolve(__dirname, 'src/api'),
      '@store': resolve(__dirname, 'src/store'),
      '@utils': resolve(__dirname, 'src/utils'),
      '@views': resolve(__dirname, 'src/views'),
      // '@plugin': resolve(__dirname, 'src/plugin'),
      '@module': resolve(__dirname, 'src/components'),
      '@home': resolve(__dirname, 'src/packages/home'),
      '@admin': resolve(__dirname, 'src/packages/admin'),
    },
  },
});
