import { DynamicModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import * as dotenv from 'dotenv';

dotenv.config();

// config
import { JwtAuthConf } from './src/jwtAuth.config';
import { LoggerConf } from './src/logger.config';
import { MysqlConf } from './src/mysql.config';
import { RedisConf } from './src/redis.config';
import { BullConf } from './src/bull.config';
import { AppConf } from './src/app.config';

/* 引用 Config */
export class ConfigModel {
  static use(load?: any[]): Promise<DynamicModule> {
    return ConfigModule.forRoot({ isGlobal: true, load });
  }
}

export * from './src/app.config';
export * from './src/bull.config';
export * from './src/mysql.config';
export * from './src/redis.config';
export * from './src/logger.config';
export * from './src/jwtAuth.config';

export const AllConfig = [AppConf, BullConf, RedisConf, MysqlConf, JwtAuthConf, LoggerConf];
