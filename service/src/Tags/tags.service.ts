import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { In, Repository } from 'typeorm';
import { Tags } from '@mysql';

@Injectable()
export class TagsService {
  constructor(@InjectRepository(Tags) private tags: Repository<Tags>) {}

  async hasTagsId(id: number) {
    return (await this.tags.countBy({ id })) >= 1;
  }

  async hasTags(name: string) {
    return (await this.tags.countBy({ name })) >= 1;
  }

  async createTags(name: string) {
    if (!(await this.hasTags(name))) throw new Error('标签已存在');
    return await this.createBatchTags([name]);
  }

  async updateTags(id: number, name: string) {
    if (!(await this.hasTagsId(id))) throw new Error('标签不存在');
    return await this.tags.update(id, { name });
  }

  async createBatchTags(names: string[]) {
    const names_A = [];
    for (const name of names) {
      if (names_A.includes(name)) throw new Error('存在重复的标签名称');
      names_A.push(name);
    }
    const count = await this.tags.countBy({ name: In(names_A) });
    if (count >= 1) throw new Error('部分标签名称已存在');
    return await this.tags.save(
      names_A.map((name) => {
        return new Tags(name);
      }),
    );
  }

  async updateBatchTags(ids: number[], names: string[]) {
  }
}
