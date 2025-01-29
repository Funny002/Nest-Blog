import { TagsController } from './tags.controller';
import { TagsService } from './tags.service';
import { MysqlModel } from '@libs/mysql';
import { Module } from '@nestjs/common';
import { Tags } from '@mysql';

@Module({
  imports: [MysqlModel.feature(Tags)],
  controllers: [TagsController],
  providers: [TagsService],
})
export class TagsModule {}
