import { INestApplication } from '@nestjs/common';

// 拦截器
import { CustomExceptionFilter } from './src/customException.filter';
import { ResponseInterceptor } from './src/response.interceptor';

/* 拦截器 */
export async function useInterceptor(app: INestApplication) {
  app.useGlobalInterceptors(new ResponseInterceptor());
  app.useGlobalFilters(new CustomExceptionFilter());
}
