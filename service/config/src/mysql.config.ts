import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { registerAs } from '@nestjs/config';
import * as process from 'process';

/* 名称 */
export const MysqlName = 'app_service';

/* 配置 */
export const MysqlConf = registerAs(MysqlName, (): TypeOrmModuleOptions => {
  return {
    type: 'mysql',
    port: 3306,
    host: '127.0.0.1',
    username: process.env['MYSQL_USER'],
    password: process.env['MYSQL_PASS'],
    database: process.env['MYSQL_DB'],
    charset: 'utf8',
    //
    debug: false,
    logging: ['error', 'migration'],
    logger: 'simple-console',
    synchronize: true,
    retryDelay: 5000,
    retryAttempts: 10,
    maxQueryExecutionTime: 1000,
  };
});
