import { NestFastifyApplication } from '@nestjs/platform-fastify';
import { ConfigService } from '@nestjs/config';
import { AppName, AppSystem } from '@config';

// 中间件
import helmet from '@fastify/helmet';
import cookie from '@fastify/cookie';
import csrf from '@fastify/csrf-protection';

/* 中间件 */
export async function useMiddleware(app: NestFastifyApplication) {
  const config = app.get(ConfigService).get<AppSystem>(AppName);

  await app.register(cookie, { secret: config.cookieSecret }); // fastify 添加 cookie

  await app.register(csrf, { cookieOpts: { signed: true } }); // fastify 添加 csrf

  await app.register(helmet); // fastify 添加 helmet
}
