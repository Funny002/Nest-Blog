import { NestFastifyApplication } from '@nestjs/platform-fastify';

// 拦截器
import { CustomExceptionFilter } from './src/customException.filter';
import { ResponseInterceptor } from './src/response.interceptor';

/* 拦截器 */
export async function useInterceptor(app: NestFastifyApplication) {
  app.useGlobalInterceptors(new ResponseInterceptor());
  app.useGlobalFilters(new CustomExceptionFilter());
}
