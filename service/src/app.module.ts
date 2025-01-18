import { ValidationPipeOptions } from '@nestjs/common/pipes/validation.pipe';
import { AllConfig, AppName, AppSystem, ConfigModel } from '@config';
import { AppController } from '@src/app.controller';
import { ConfigService } from '@nestjs/config';
import { MysqlModel } from '@libs/mysql';
import { Module } from '@nestjs/common';
import { AllEntities } from '@mysql';

// Modules
import { ArticlesModule } from './Articles/articles.module';
import { CommentsModule } from './Comments/comments.module';
import { UploadModule } from './Upload/upload.module';
import { TypesModule } from './Types/types.module';
import { FilesModule } from './Files/files.module';
import { UsersModule } from './Users/users.module';
import { TagsModule } from './Tags/tags.module';
import { AuthModule } from './Auth/auth.module';

@Module({
  imports: [
    ConfigModel.use(AllConfig), // 配置
    MysqlModel.use(AllEntities), // 数据库
    // module
    UsersModule,
    ArticlesModule,
    CommentsModule,
    TagsModule,
    TypesModule,
    FilesModule,
    AuthModule,
    UploadModule,
  ],
  controllers: [AppController],
  providers: [ConfigService],
})
export class AppModule {
  public static port: number;

  public static version: string;

  public static pipes: ValidationPipeOptions;

  public static prefix: string;

  constructor(private readonly configService: ConfigService) {
    const config = configService.get<AppSystem>(AppName);

    AppModule.port = config.port;

    AppModule.pipes = config.pipes;

    AppModule.prefix = config.prefix;

    AppModule.version = config.version;
  }
}
