import { ArticlesVersions } from './ArticlesVersions.mysql';
import { BaseModelEntity, StatusEnum } from '../Common';
import { Column, Entity, OneToMany } from 'typeorm';

@Entity()
export class Articles extends BaseModelEntity {
  @Column(/* 创建人 */) uid: number;

  @Column(/* 标题 */ { length: 100 }) title: string;

  @Column(/* 标签 */ { type: 'simple-array' }) tags: Array<string>;

  @Column(/* 分类 */ { type: 'simple-array' }) types: Array<string>;

  @Column(/* 附件 */ { type: 'simple-array' }) files: Array<string>;

  @Column(/* 浏览 */ { type: 'int', default: 0 }) views: number;

  @Column(/* 点赞 */ { type: 'int', default: 0 }) likes: number;

  @Column(/* 收藏 */ { type: 'int', default: 0 }) collect: number;

  @Column(/* 评论 */ { type: 'int', default: 0 }) comments: number;

  @Column(/* 状态 */ { type: 'enum', enum: StatusEnum, default: StatusEnum.Pending }) status: StatusEnum;

  @OneToMany(() => ArticlesVersions, ({ pid }) => pid) versions: Array<ArticlesVersions>;
}
