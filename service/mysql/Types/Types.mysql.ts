import { Column, Entity, Index, Tree, TreeChildren, TreeParent } from 'typeorm';
import { BaseModelEntity } from '../Common';

enum StatusEnum {
  Enable = 'enable', // 启用
  Disable = 'disable', // 禁用
}

@Entity()
@Tree('closure-table')
@Index('unique', ['name'], { unique: true })
export class Types extends BaseModelEntity<Types> {
  @TreeParent() pid: Types;

  @TreeChildren() children: Types[];

  @Column(/* 引用 */) quote: number;

  @Column(/* 名称 */ { length: 100 }) name: string;

  @Column(/* 状态 */ { type: 'enum', enum: StatusEnum, default: StatusEnum.Enable }) status: StatusEnum;

  constructor(name?: string, parent?: Types) {
    super();
    if (name) this.name = name;
    if (parent) this.pid = parent;
  }
}
