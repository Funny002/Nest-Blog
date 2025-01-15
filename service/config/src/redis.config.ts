import { RedisOptions as RedisOptions_ioredis } from 'ioredis';
import { registerAs } from '@nestjs/config';

/* 名称 */
export const RedisName = 'redis-ioredis';

/* 声明 */
export type RedisOptions = RedisOptions_ioredis & { url?: string };

/* 配置 */
export const RedisConf = registerAs(RedisName, (): RedisOptions => {
  return {
    host: '127.0.0.1',
    port: 6379,
    db: 0,
  };
});
