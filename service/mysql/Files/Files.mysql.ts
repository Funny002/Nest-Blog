import { BaseModelEntity, StatusEnum } from '@app/mysql';
import { Column, Entity } from 'typeorm';

@Entity()
export class Files extends BaseModelEntity {
  @Column(/* 格式 */) format: string;

  @Column(/* 后缀 */ { length: 30 }) ext: string;

  @Column(/* 名称 */ { length: 50 }) name: string;

  @Column(/* 路径 */ { length: 200 }) path: string;

  @Column(/* 大小 */ { type: 'int' }) size: number;

  @Column(/* 哈希 */ { length: 125 }) hash: string;

  @Column(/* 校验码 */ { length: 32 }) md5: string;

  @Column(/* 原名称 */ { length: 100 }) original_name: string;

  @Column(/* 状态 */ { type: 'enum', enum: StatusEnum, default: StatusEnum.Pending }) status: StatusEnum;
}
