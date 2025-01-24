import { BaseEntity, CreateDateColumn, EntityManager, FindOptionsWhere, PrimaryGeneratedColumn, Repository, UpdateDateColumn } from 'typeorm';
import { QueryRunner } from 'typeorm/query-runner/QueryRunner';
import { PaginationRequest } from '@libs/pagination';

export abstract class BaseModelEntity<T extends BaseModelEntity<T>> extends BaseEntity {
  @PrimaryGeneratedColumn({ /* 主键 */ type: 'int' }) id: number;

  @CreateDateColumn({ /* 创建时间 */ type: 'datetime', default: null }) create_time: Date;

  @UpdateDateColumn({ /* 更新时间 */ type: 'datetime', default: null }) update_time: Date;

  /* 获取 QueryRunner */
  static getQueryRunner<T extends BaseModelEntity<T>>(this: { new (): T } & typeof BaseModelEntity): QueryRunner {
    return this.getRepository().metadata.connection.createQueryRunner();
  }

  /* 事务 */
  static async transaction<T extends BaseModelEntity<T>>(this: { new (): T } & typeof BaseModelEntity, handler: (query: QueryRunner, repository: Repository<T>) => any) {
    const query = this.getQueryRunner();
    await query.connect();
    await query.startTransaction();
    try {
      const repository = query.manager.getRepository(this) as Repository<T>;
      const result = await handler(query, repository);
      await query.commitTransaction();
      return result;
    } catch (e: any) {
      await query.rollbackTransaction();
      throw new Error(e.message);
    } finally {
      await query.release();
    }
  }

  static async getList<T extends BaseModelEntity<T>>(this: { new (): T } & typeof BaseModelEntity, page: PaginationRequest, where: FindOptionsWhere<T>): Promise<{ count: number; list: T[] }> {
    const { pageSize: take, pageSkip: skip, orderBy, orderKey } = page;
    return {
      count: await this.countBy(where),
      list: (await this.find({ where, skip, take, order: { [orderBy]: orderKey } })) as T[],
    };
  }
}
