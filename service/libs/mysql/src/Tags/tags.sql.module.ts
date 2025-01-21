import { TagsSqlService } from './tags.sql.service';
import { MysqlModel } from '@libs/mysql';
import { Module } from '@nestjs/common';
import { Tags } from '@mysql';

@Module({
  imports: [MysqlModel.feature(Tags)],
  providers: [TagsSqlService],
  exports: [TagsSqlService],
})
export class TagsSqlModule {}
