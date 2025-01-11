import { BaseModelEntity } from '../Common';
import { Column, Entity } from 'typeorm';

@Entity()
export class Tags extends BaseModelEntity {
  @Column(/* 名称 */ { length: 100 }) name: string;

  @Column(/* 引用 */) quote: number;
}
