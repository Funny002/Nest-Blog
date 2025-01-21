import { Column, Entity, Index, Tree, TreeChildren, TreeParent } from 'typeorm';
import { BaseModelEntity, StatusEnum } from '../Common';

@Entity()
@Tree('closure-table')
@Index('index', ['pid', 'uid', 'name', 'audit_uid', 'audit_at'], { unique: false })
export class Comments extends BaseModelEntity<Comments> {
  @TreeParent() pid: Comments;

  @Column(/* 用户 */) uid: number;

  @TreeChildren() children: Comments[];

  @Column(/* 名称 */ { length: 100 }) name: string;

  @Column(/* 邮箱 */ { length: 100 }) email: string;

  @Column(/* 链接 */ { length: 100 }) href: string;

  @Column(/* 内容 */ { type: 'text' }) content: string;

  @Column(/* 点赞 */ { type: 'int', default: 0 }) likes: number;

  @Column(/* 附件 */ { type: 'simple-array' }) files: Array<string>;

  @Column(/* 状态 */ { type: 'enum', enum: StatusEnum, default: StatusEnum.Pending }) status: StatusEnum;

  @Column(/* 审核人 */) audit_uid: number;

  @Column(/* 审核回复 */ { type: 'datetime' }) audit_at: Date;

  @Column(/* 审核回复 */ { type: 'text' }) audit_remark: string;
}
