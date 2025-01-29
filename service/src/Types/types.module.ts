import { TypesController } from './types.controller';
import { TypesService } from './types.service';
import { MysqlModel } from '@libs/mysql';
import { Module } from '@nestjs/common';
import { Types } from '@mysql';

@Module({
  imports: [MysqlModel.feature(Types)],
  controllers: [TypesController],
  providers: [TypesService],
})
export class TypesModule {}
