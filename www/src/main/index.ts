import { setupRouter } from '../router';
import { createPinia } from 'pinia';
import { createApp } from 'vue';
import Main from './index.vue';

async function bootstrap() {
  const app = createApp(Main); // app
  app.use(createPinia());  // pinia
  await setupRouter(app); // router
  app.mount('#app');
  return app;
}

bootstrap().then(() => {
  // bootstrap
});
