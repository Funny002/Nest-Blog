import { Column, Entity, Index, ManyToOne } from 'typeorm';
import { BaseModelEntity, StatusEnum } from '../Common';
import { Articles } from './Articles.mysql';

@Entity()
@Index('index', ['uid', 'status', 'version', 'audit_uid', 'audit_at'], { unique: false })
export class ArticlesVersions extends BaseModelEntity {
  @ManyToOne(() => Articles, ({ versions }) => versions) pid: Articles;

  @Column(/* 创建人 */) uid: number;

  @Column(/* 版本 */) version: number;

  @Column(/* 内容 */ { type: 'text' }) content: string;

  @Column(/* 类型 */ { type: 'enum', enum: [0, 1], default: 1 }) is_draft: number;

  @Column(/* 状态 */ { type: 'enum', enum: StatusEnum, default: StatusEnum.Pending }) status: StatusEnum;

  @Column(/* 审核人 */) audit_uid: number;

  @Column(/* 审核时间 */ { type: 'datetime' }) audit_at: Date;

  @Column(/* 审核回复 */ { type: 'text' }) audit_remark: string;
}
