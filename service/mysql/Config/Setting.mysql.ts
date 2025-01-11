import { BaseModelEntity, StatusEnum } from '../Common';
import { Column, Entity } from 'typeorm';

@Entity()
export class Setting extends BaseModelEntity {
  @Column(/* 标识 */) key: string;

  @Column(/* 名称 */) name: string;

  @Column(/* 排序 */) sort: number;

  @Column(/* 类型 */) types: string;

  @Column(/* 内容 */) value: string;

  @Column(/* 描述 */) remark: string;

  @Column(/* 状态 */ { type: 'enum', enum: StatusEnum, default: StatusEnum.Pending }) status: StatusEnum;
}
