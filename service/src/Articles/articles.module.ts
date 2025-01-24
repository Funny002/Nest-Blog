import { ArticlesController } from './articles.controller';
import { ArticlesService } from './articles.service';
import { Articles, ArticlesVersions } from '@mysql';
import { MysqlModel } from '@libs/mysql';
import { Module } from '@nestjs/common';

@Module({
  imports: [
    // Mysql
    MysqlModel.feature(Articles, ArticlesVersions),
  ],
  controllers: [ArticlesController],
  providers: [ArticlesService],
})
export class ArticlesModule {}
