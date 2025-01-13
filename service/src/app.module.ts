import { ArticlesModule } from './Articles/articles.module';
import { CommentsModule } from './Comments/comments.module';
import { AppName, AppSystem, ConfigGlobal } from '@config';
import { TypesModule } from './Types/types.module';
import { FilesModule } from './Files/files.module';
import { UsersModule } from './Users/users.module';
import { TagsModule } from './Tags/tags.module';
import { AuthModule } from './Auth/auth.module';
import { ConfigService } from '@nestjs/config';
import { Module } from '@nestjs/common';

@Module({
  imports: [
    // 配置项
    ConfigGlobal.use(),
    UsersModule,
    ArticlesModule,
    CommentsModule,
    TagsModule,
    TypesModule,
    FilesModule,
    AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {
  public static port: number;

  public static version: string;

  constructor(private readonly configService: ConfigService) {
    const config = configService.get<AppSystem>(AppName);

    AppModule.port = config.port;

    AppModule.version = config.version;
  }
}
