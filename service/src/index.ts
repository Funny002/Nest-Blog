import { Logger, ValidationPipe, VersioningType } from '@nestjs/common';
import { useInterceptor } from '@interceptor';
import { useMiddleware } from '@middleware';
import { NestFactory } from '@nestjs/core';
import { useSwagger } from '@libs/swagger';
import { AppModule } from './app.module';

/* 初始化 */
async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors(); // 跨域

  app.setGlobalPrefix(AppModule.prefix); // 前缀

  app.enableVersioning({ type: VersioningType.URI }); // 版本控制

  app.useGlobalPipes(new ValidationPipe(AppModule.pipes)); // 参数校验

  const swaggerApi = useSwagger(app, AppModule.version); // swagger

  await useMiddleware(app); // 中间件

  await useInterceptor(app); // 拦截器

  await app.listen(AppModule.port);

  return { port: AppModule.port, swaggerApi };
}

const logger = new Logger('Bootstrap');

bootstrap().then(function ({ port, swaggerApi }) {
  const url = `http://localhost:${port}/`;
  logger.log(`Application is running on: ${url}`);
  logger.log(`Swagger is running on: ${url + swaggerApi}`);
});
