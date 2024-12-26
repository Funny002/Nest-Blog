import {i18n} from '../locale/locale';
import {setupRouter} from '../router';
import {BaseConfig} from './config';
import {createPinia} from 'pinia';
import Main from './index.vue';
import {createApp} from 'vue';

async function bootstrap() {
  window.__CONFIG__ = new BaseConfig({title: 'Nest Blog'}); // config
  const app = createApp(Main); // app
  app.use(createPinia());  // pinia
  await setupRouter(app); // router
  app.use(i18n); // i18n
  app.mount('#app');
  return app;
}

bootstrap().then(() => {
  console.log('[bootstrap]', window.__CONFIG__.baseUrl);
});
