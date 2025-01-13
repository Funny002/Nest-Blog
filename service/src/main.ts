import { AppModule } from './app.module';
import { NestFactory } from '@nestjs/core';
import { useSwagger } from '@libs/swagger';
import { Logger } from '@nestjs/common';
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';

const logger = new Logger('Bootstrap');

/* 初始化 */
async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(AppModule, new FastifyAdapter());

  const swaggerApi = useSwagger(app, AppModule.version);

  await app.listen(AppModule.port);

  return { port: AppModule.port, swaggerApi };
}

bootstrap().then(function ({ port, swaggerApi }) {
  const url = `http://localhost:${port}/`;
  logger.log(`Application is running on: ${url}`);
  logger.log(`Swagger is running on: ${url + swaggerApi}`);
});
