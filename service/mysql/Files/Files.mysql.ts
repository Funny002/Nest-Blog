import { BaseModelEntity, StatusEnum } from '../Common';
import { Column, Entity, Index } from 'typeorm';

@Entity()
@Index('index', ['format', 'uid', 'types', 'status'], { unique: false })
export class Files extends BaseModelEntity<Files> {
  @Column(/* 格式 */) format: string;

  @Column(/* 用户编号 */) uid: number;

  @Column(/* 后缀 */ { length: 30 }) ext: string;

  @Column(/* 名称 */ { length: 50 }) name: string;

  @Column(/* 路径 */ { length: 200 }) path: string;

  @Column(/* 大小 */ { type: 'int' }) size: number;

  @Column(/* 哈希 */ { length: 125 }) hash: string;

  @Column(/* 校验码 */ { length: 32 }) md5: string;

  @Column(/* 原名称 */ { length: 100 }) original_name: string;

  @Column(/* 类型 */ { type: 'enum', enum: StatusEnum, default: StatusEnum.Public }) types: StatusEnum;

  @Column(/* 状态 */ { type: 'enum', enum: StatusEnum, default: StatusEnum.Pending }) status: StatusEnum;
}
