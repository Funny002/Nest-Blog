import { BaseModelEntity, RoleEnum, StatusEnum } from '../Common';
import { Column, Entity, Index } from 'typeorm';

export type UsersLoginTags = 'web';

export interface UsersLoginLimit {
  tags: string[]; // 允许登录标签
  limits?: {
    [Key in UsersLoginTags]?: number; // 登录次数限制
  };
}

@Entity()
@Index('index', ['login_at'], { unique: false })
@Index('unique', ['uid', 'email', 'user'], { unique: true })
export class Users extends BaseModelEntity {
  @Column(/* 用户编号 */) uid: number;

  @Column(/* 邮箱 */) email: string;

  @Column(/* 用户名 */) user: string;

  @Column(/* 头像 */) avatar: string;

  @Column(/* 密码 */ { length: 32 }) pass: string;

  @Column(/* 链接 */ { length: 100 }) href: string;

  @Column(/* 登录IP */ { length: 20 }) login_ip: string;

  @Column(/* 锁定次数 */ { default: 0 }) lock_count: number;

  @Column(/* 锁定时间 */ { type: 'datetime' }) lock_at: Date;

  @Column(/* 登录时间 */ { type: 'datetime' }) login_at: Date;

  @Column(/* 登录次数 */ { type: 'simple-json' }) login_limit: UsersLoginLimit;

  @Column(/* 角色 */ { type: 'enum', enum: RoleEnum, default: RoleEnum.Guest }) role: RoleEnum;

  @Column(/* 状态 */ { type: 'enum', enum: StatusEnum, default: StatusEnum.Pending }) status: StatusEnum;
}
