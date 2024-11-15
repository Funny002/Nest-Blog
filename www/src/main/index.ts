import { setupRouter } from '../router';
import * as Utils from '@utils/object';
import { createPinia } from 'pinia';
import { createApp } from 'vue';
import Main from './index.vue';

class BaseConfig {
  __options: Partial<BaseConfigOption>;
  title: string = 'Doc Title';

  constructor(title: string, options?: Partial<BaseConfigOption>) {
    this.title = title;
    this.__options = options || {};
    Object.defineProperty(this, '__options', { enumerable: false });
  }

  get tags() {
    return this.__options.tags;
  }

  get base() {
    return this.__options.base || '/';
  }

  get scheme(): 'http' | 'https' {
    const scheme = this.__options.scheme;
    if (!Utils.isString(scheme)) return scheme ? 'https' : 'http';
    return /^https?$/.test(scheme) ? scheme : 'http';
  }

  get host() {
    return this.__options.host || 'localhost';
  }

  get port() {
    const port = this.__options.port;
    if (Utils.isNumber(port)) {
      return [0, 80].includes(port) ? 80 : port;
    }
    return 80;
  }

  get baseApi() {
    const { port, host, scheme, base } = this;
    return [scheme, '://', host, port !== 80 ? `:${ port }` : '', base].join('');
  }
}

async function bootstrap() {
  window.__CONFIG__ = new BaseConfig('Nest Blog'); // config
  const app = createApp(Main); // app
  app.use(createPinia());  // pinia
  await setupRouter(app); // router
  app.mount('#app');
  return app;
}

bootstrap().then(() => {
  console.log('bootstrap', window.__CONFIG__.baseApi);
});
