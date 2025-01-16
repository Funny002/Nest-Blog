import { INestApplication } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AppName, AppSystem } from '@config';

// 中间件

/* 中间件 */
export async function useMiddleware(app: INestApplication) {
  const config = app.get(ConfigService).get<AppSystem>(AppName);
}
