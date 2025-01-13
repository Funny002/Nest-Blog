import { BaseModelEntity, StatusEnum } from '../Common';
import { Column, Entity, Index } from 'typeorm';

@Entity()
@Index('index', ['uid', 'status'], { unique: false })
export class UsersLogin extends BaseModelEntity {
  @Column(/* 用户编号 */) uid: number;

  @Column(/* 登录设备 */) login_device: string;

  @Column(/* 登录IP */ { length: 20 }) login_ip: string;

  @Column(/* 登录时间 */ { type: 'datetime' }) login_at: Date;

  @Column(/* 状态 */ { type: 'enum', enum: StatusEnum, default: StatusEnum.Rejected }) status: StatusEnum;
}
