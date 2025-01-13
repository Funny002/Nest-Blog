import { BaseModelEntity, StatusEnum } from '../Common';
import { Column, Entity, Index } from 'typeorm';

@Entity()
@Index('unique', ['keys'], { unique: true })
@Index('index', ['name', 'types', 'status'], { unique: false })
export class Setting extends BaseModelEntity {
  @Column(/* 标识 */) keys: string;

  @Column(/* 名称 */) name: string;

  @Column(/* 排序 */) sort: number;

  @Column(/* 类型 */) types: string;

  @Column(/* 内容 */) value: string;

  @Column(/* 描述 */) remark: string;

  @Column(/* 状态 */ { type: 'enum', enum: StatusEnum, default: StatusEnum.Disable }) status: StatusEnum;
}
