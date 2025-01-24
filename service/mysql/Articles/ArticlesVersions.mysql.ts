import { BaseModelEntity, StatusEnum } from '../Common';
import { Column, Entity, Index } from 'typeorm';
import { Articles } from './Articles.mysql';

@Entity()
@Index('index', ['uid', 'status', 'version', 'audit_uid', 'audit_time'], { unique: false })
export class ArticlesVersions extends BaseModelEntity<ArticlesVersions> {
  @Column(/* 文章 */) pid: number;

  @Column(/* 创建人 */) uid: number;

  @Column(/* 版本 */ { default: 0 }) version: number;

  @Column(/* 内容 */ { type: 'text' }) content: string;

  @Column(/* 类型 */ { type: 'enum', enum: [0, 1], default: 1 }) is_draft: number;

  @Column(/* 状态 */ { type: 'enum', enum: StatusEnum, default: StatusEnum.Pending }) status: StatusEnum;

  @Column(/* 审核人 */ { nullable: true }) audit_uid: number;

  @Column(/* 审核时间 */ { type: 'datetime', nullable: true }) audit_time: Date;

  @Column(/* 审核回复 */ { type: 'text', nullable: true }) audit_remark: string;

  constructor(article?: Articles, content?: string) {
    super();
    if (article) {
      this.version = 0;
      this.pid = article.id;
      this.content = content;
      this.uid = article.uid;
      this.status = article.status;
      this.is_draft = article.is_draft;
    }
  }
}
