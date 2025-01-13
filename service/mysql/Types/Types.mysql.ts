import { Column, Entity, Index, Tree, TreeChildren, TreeParent } from 'typeorm';
import { BaseModelEntity } from '../Common';

@Entity()
@Tree('closure-table')
@Index('unique', ['name'], { unique: true })
export class Types extends BaseModelEntity {
  @TreeParent() pid: Types;

  @TreeChildren() children: Types[];

  @Column(/* 名称 */ { length: 100 }) name: string;

  @Column(/* 引用 */ { length: 100 }) quote: number;
}
