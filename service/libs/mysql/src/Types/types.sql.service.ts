import { InjectRepository } from '@nestjs/typeorm';
import { In, Not, Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { Types } from '@mysql';

interface TypesOptions {
  parent?: number;
  value: string[];
}

enum StatusEnum {
  Enable = 'enable', // 启用
  Disable = 'disable', // 禁用
}

@Injectable()
export class TypesSqlService {
  constructor(@InjectRepository(Types) private types: Repository<Types>) {}

  async createTypes(name: string, parent?: number) {
    const count = await this.types.countBy({ name });
    if (count >= 1) throw new Error('分类名称重复');
    return await this.createBatchTypes({ parent, value: [name] });
  }

  async createBatchTypes(types: TypesOptions) {
    const types_A = [];

    for (const key in types.value) {
      if (!types_A.includes(key)) throw new Error('存在重复的分类名称');
      types_A.push(key);
    }

    const parent = types.parent ? await this.types.findOne({ where: { id: types.parent } }) : null;

    const count = await this.types.countBy({ name: In(types_A) });

    if (count >= 1) throw new Error('分类名称已存在');

    const values = types.value.map((name) => {
      return new Types(name, parent);
    });

    return await this.types.save(values);
  }

  async hasTypes(id: number) {
    return (await this.types.countBy({ id })) >= 1;
  }

  async updateTypes(id: number, value: string) {
    if (!(await this.hasTypes(id))) throw new Error('分类名称不存在');

    const count = await this.types.countBy({ id: Not(id), name: value });

    if (count >= 1) throw new Error('分类已存在');

    return await this.types.update(id, { name: value });
  }

  async updateStatus(id: number, status: boolean) {
    if (!(await this.hasTypes(id))) throw new Error('分类名称不存在');
    return await this.types.update(id, { status: status ? StatusEnum.Enable : StatusEnum.Disable });
  }

  async deleteTypes(id: number) {
    if (!(await this.hasTypes(id))) throw new Error('分类名称不存在');
    return await this.types.delete(id);
  }

  async hasBatchTypes(ids: number[]) {
    return (await this.types.countBy({ id: In(ids) })) !== ids.length;
  }

  async updateBatchStatus(ids: number[], status: boolean) {
    if (!(await this.hasBatchTypes(ids))) throw new Error('部分分类名称不存在');
    return await this.types.update(ids, { status: status ? StatusEnum.Enable : StatusEnum.Disable });
  }

  async deleteBatchTypes(ids: number[]) {
    if (!(await this.hasBatchTypes(ids))) throw new Error('部分分类名称不存在');
    return await this.types.delete(ids);
  }
}
