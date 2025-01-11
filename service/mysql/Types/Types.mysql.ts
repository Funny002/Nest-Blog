import { Column, Entity, Tree, TreeChildren, TreeParent } from 'typeorm';
import { BaseModelEntity } from '../Common';

@Entity()
@Tree('closure-table')
export class Types extends BaseModelEntity {
  @TreeParent() pid: Types;

  @TreeChildren() children: Types[];

  @Column(/* 名称 */ { length: 100 }) name: string;

  @Column(/* 引用 */ { length: 100 }) quote: number;
}
