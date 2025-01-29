import { EntityClassOrSchema } from '@nestjs/typeorm/dist/interfaces/entity-class-or-schema.type';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';
import { MysqlName } from '@config';

/* Mysql */
export class MysqlModel {
  /* 初始化 */
  static use(entities: any[], options?: TypeOrmModuleOptions) {
    return TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        const config = configService.get<TypeOrmModuleOptions>(MysqlName);
        return Object.assign({ ...config }, { ...options, entities });
      },
    });
  }

  /* 引用 */
  static feature(...args: EntityClassOrSchema[]) {
    return TypeOrmModule.forFeature(args);
  }
}
