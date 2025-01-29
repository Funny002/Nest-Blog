import { CommentsCreateDto } from '@src/Comments/Dto/create.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { Articles, Comments, Users } from '@mysql';
import { Repository } from 'typeorm';
import { CustomError } from '@libs/error';

@Injectable()
export class CommentsService {
  constructor(
    @InjectRepository(Users) private users: Repository<Users>,
    @InjectRepository(Articles) private articles: Repository<Articles>,
    @InjectRepository(Comments) private comments: Repository<Comments>,
  ) {}

  async hasArticles(tid: number) {
    return (await this.articles.countBy({ id: tid })) >= 1;
  }

  async create(tid: number, body: CommentsCreateDto, uid?: number) {
    let parent = undefined;
    if (body.parent) {
      parent = await this.comments.findOneBy({ id: body.parent });
      if (!parent) throw new CustomError('回复评论不存在');
    }
    const comment = new Comments(tid, { ...body, uid }, parent);
    //
    return await this.comments.save(comment);
  }
}
