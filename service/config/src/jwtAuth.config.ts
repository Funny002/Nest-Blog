import { JwtModuleOptions } from '@nestjs/jwt/dist/interfaces/jwt-module-options.interface';
import { registerAs } from '@nestjs/config';
import * as process from 'process';

/* 名称 */
export const JwtAuthName = 'Jwt_Auth_Name';

/* 声明 */
export type JwtAuthOptions = JwtModuleOptions;

/* 配置 */
export const JwtAuthConf = registerAs(JwtAuthName, (): JwtAuthOptions => {
  return {
    secret: process.env['JWT_SECRET'],
    signOptions: { expiresIn: '12h' },
  };
});
