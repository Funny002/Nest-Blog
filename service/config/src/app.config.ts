import { ValidationPipeOptions } from '@nestjs/common/pipes/validation.pipe';
import { registerAs } from '@nestjs/config';

/* 声明 */
export interface AppSystem {
  port: number;
  prefix: string;
  version: string;
  //
  filesPath?: string;
  cookieSecret?: string;
  pipes?: ValidationPipeOptions;
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
    cookieSecret: process.env['COOKIE_SECRET'],
    filesPath: process.env['FILES_PATH'] || './upload',
  };
});
