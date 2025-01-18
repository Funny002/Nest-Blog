import { ValidationPipeOptions } from '@nestjs/common/pipes/validation.pipe';
import { DoubleCsrfConfigOptions } from 'csrf-csrf/lib';
import { registerAs } from '@nestjs/config';
import { Request } from 'express';

/* 声明 */
export interface AppSystem {
  port: number;
  prefix: string;
  version: string;
  //
  filesPath?: string;
  cookieSecret?: string;
  pipes?: ValidationPipeOptions;
  csrfOptions?: DoubleCsrfConfigOptions;
}

/* 名称 */
export const AppName = 'app_name';

/* 配置 */
export const AppConf = registerAs(AppName, (): AppSystem => {
  return {
    port: 9871,
    prefix: '',
    version: '1',
    pipes: {
      whitelist: true,
      transform: true,
      stopAtFirstError: true,
    },
    csrfOptions: {
      cookieOptions: {
        // secure: true,
      },
      size: 32,
      // ignoredMethods: ['GET', 'HEAD', 'OPTIONS'],
      getSecret: () => process.env['CSRF_SECRET'] || 'CSRF_SECRET',
      getTokenFromRequest: (req: Request) => req.headers['x-csrf-token'],
    },
    cookieSecret: process.env['COOKIE_SECRET'],
    filesPath: process.env['UPLOAD_FILE_PATH'] || './upload',
  };
});
