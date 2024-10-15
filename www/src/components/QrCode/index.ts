import { defineAsyncComponent } from 'vue';

export const QrCodeView = defineAsyncComponent(() => import('./src/QrCode.vue'));

export * from './src/Tools';

export default QrCodeView;
