import { BaseModelEntity, StatusEnum } from '../Common';
import { Column, Entity, Index } from 'typeorm';

@Entity()
@Index('index', ['uid', 'audit_uid', 'status'], { unique: false })
export class UsersName extends BaseModelEntity {
  @Column(/* 用户编号 */) uid: number;

  @Column(/* 名称 */ { length: 100 }) name: string;

  @Column(/* 原名称 */ { length: 100 }) original_name: string;

  @Column(/* 状态 */ { type: 'enum', enum: StatusEnum, default: StatusEnum.Rejected }) status: StatusEnum;

  @Column(/* 审核人 */) audit_uid: number;

  @Column(/* 审核时间 */ { type: 'datetime' }) audit_at: Date;

  @Column(/* 审核回复 */ { type: 'text' }) audit_remark: string;
}
