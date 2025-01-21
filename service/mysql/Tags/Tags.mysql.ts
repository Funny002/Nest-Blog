import { BaseModelEntity } from '../Common';
import { Column, Entity, Index } from 'typeorm';

enum StatusEnum {
  Enable = 'enable', // 启用
  Disable = 'disable', // 禁用
}

@Entity()
@Index('unique', ['name'], { unique: true })
export class Tags extends BaseModelEntity<Tags> {
  @Column(/* 引用 */) quote: number;

  @Column(/* 名称 */ { length: 100 }) name: string;

  @Column(/* 状态 */ { type: 'enum', enum: StatusEnum, default: StatusEnum.Enable }) status: StatusEnum;

  constructor(name?: string) {
    super();
    if (name) this.name = name;
  }
}
