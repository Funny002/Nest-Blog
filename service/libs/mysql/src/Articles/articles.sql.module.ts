import { ArticlesSqlService } from './articles.sql.service';
import { Articles, ArticlesVersions } from '@mysql';
import { MysqlModel } from '@libs/mysql';
import { Module } from '@nestjs/common';

@Module({
  imports: [MysqlModel.feature(Articles, ArticlesVersions)],
  providers: [ArticlesSqlService],
  exports: [ArticlesSqlService],
})
export class ArticlesSqlModule {}
