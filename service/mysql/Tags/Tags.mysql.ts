import { BaseModelEntity } from '../Common';
import { Column, Entity, Index } from 'typeorm';

@Entity()
@Index('unique', ['name'], { unique: true })
export class Tags extends BaseModelEntity {
  @Column(/* 名称 */ { length: 100 }) name: string;

  @Column(/* 引用 */) quote: number;
}
