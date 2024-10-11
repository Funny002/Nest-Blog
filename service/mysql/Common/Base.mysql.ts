import { BaseEntity, CreateDateColumn, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

export abstract class BaseModelEntity extends BaseEntity {
  @PrimaryGeneratedColumn({ /* 主键 */ type: 'int' }) id: number;

  @CreateDateColumn({ /* 创建时间 */ type: 'datetime', default: null }) create_time: Date;

  @UpdateDateColumn({ /* 更新时间 */ type: 'datetime', default: null }) update_time: Date;
}
