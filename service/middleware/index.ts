import { INestApplication } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AppName, AppSystem } from '@config';

// 中间件

import helmet from 'helmet';
import { doubleCsrf } from 'csrf-csrf';
import * as cookieParser from 'cookie-parser';

/* 中间件 */
export async function useMiddleware(app: INestApplication) {
  const { cookieSecret, csrfOptions } = app.get(ConfigService).get<AppSystem>(AppName);
  const { doubleCsrfProtection } = doubleCsrf(csrfOptions);

  app.use(cookieParser(cookieSecret));

  app.use(doubleCsrfProtection);

  app.use(helmet());
}
