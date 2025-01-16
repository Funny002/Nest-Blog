import { registerAs } from '@nestjs/config';

/* 声明 */
export interface LoggerOptions {
  charset: string;
  filesPath: string;
}

/* 名称 */
export const LoggerName = 'logger_name';

/* 配置 */
export const LoggerConf = registerAs(LoggerName, (): LoggerOptions => {
  return {
    charset: process.env['LOGGER_CHAR'] || 'utf8',
    filesPath: process.env['LOGGER_FILE_PATH'] || './logger',
  };
});
