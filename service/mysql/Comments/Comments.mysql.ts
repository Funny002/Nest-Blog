import { Column, Entity, Index, Tree, TreeChildren, TreeParent } from 'typeorm';
import { BaseModelEntity, StatusEnum } from '../Common';

@Entity()
@Tree('closure-table')
@Index('index', ['pid', 'uid', 'name', 'audit_uid', 'audit_at'], { unique: false })
export class Comments extends BaseModelEntity<Comments> {
  @TreeParent() pid: Comments;

  @TreeChildren() children: Comments[];

  @Column(/* 文章 */) tid: number;

  @Column(/* 用户 */ { nullable: true }) uid: number;

  @Column(/* 名称 */ { length: 100, nullable: true }) name: string;

  @Column(/* 邮箱 */ { length: 100, nullable: true }) email: string;

  @Column(/* 链接 */ { length: 100, nullable: true }) href: string;

  @Column(/* 内容 */ { type: 'text' }) content: string;

  @Column(/* 点赞 */ { type: 'int', default: 0 }) likes: number;

  @Column(/* 附件 */ { type: 'simple-array' }) files: Array<string>;

  @Column(/* 状态 */ { type: 'enum', enum: StatusEnum, default: StatusEnum.Pending }) status: StatusEnum;

  @Column(/* 审核人 */ { nullable: true }) audit_uid: number;

  @Column(/* 审核回复 */ { type: 'datetime', nullable: true }) audit_at: Date;

  @Column(/* 审核回复 */ { type: 'text', nullable: true }) audit_remark: string;

  constructor(tid?: number, body: Record<string, any> = {}, parent?: Comments) {
    super();
    if (tid) {
      this.tid = tid;
      this.content = body.content;
      //
      if (parent) this.pid = parent;
      if (body.uid) this.uid = body.uid;
      if (body.name) this.name = body.name;
      if (body.href) this.href = body.href;
      if (body.email) this.email = body.email;
      if (body.files) this.files = body.files;
    }
  }
}
