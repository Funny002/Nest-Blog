import { TypesSqlService } from './types.sql.service';
import { MysqlModel } from '@libs/mysql';
import { Module } from '@nestjs/common';
import { Types } from '@mysql';

@Module({
  imports: [MysqlModel.feature(Types)],
  providers: [TypesSqlService],
  exports: [TypesSqlService],
})
export class TypesSqlModule {}
