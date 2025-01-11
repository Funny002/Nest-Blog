import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './Users/users.module';
import { ArticlesModule } from './Articles/articles.module';
import { CommentsModule } from './Comments/comments.module';
import { TagsModule } from './Tags/tags.module';
import { TypesModule } from './Types/types.module';
import { FilesModule } from './files/files.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    UsersModule,
    ArticlesModule,
    CommentsModule,
    TagsModule,
    TypesModule,
    FilesModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
