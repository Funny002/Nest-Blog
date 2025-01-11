import { BaseModelEntity, StatusEnum } from '../Common';
import { Column, Entity, ManyToOne } from 'typeorm';
import { Articles } from './Articles.mysql';

@Entity()
export class ArticlesVersions extends BaseModelEntity {
  @Column(/* 创建人 */) uid: number;

  @Column(/* 版本 */) version: number;

  @Column(/* 审核人 */) audit_uid: number;

  @Column(/* 内容 */ { type: 'text' }) content: string;

  @Column(/* 审核回复 */ { type: 'text' }) remark: string;

  @Column(/* 类型 */ { type: 'enum', enum: StatusEnum, default: StatusEnum.Draft }) types: StatusEnum;

  @Column(/* 状态 */ { type: 'enum', enum: StatusEnum, default: StatusEnum.Pending }) status: StatusEnum;

  @ManyToOne(() => Articles, ({ versions }) => versions) pid: Articles;
}
