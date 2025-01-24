import { Articles, ArticlesVersions } from '@mysql';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';

// DTO
import { ArticleCreateDto } from '@src/Articles/Dto/create.dto';
import { ArticleUpdateDto } from '@src/Articles/Dto/update.dto';

@Injectable()
export class ArticlesService {
  constructor(
    @InjectRepository(Articles) private articles: Repository<Articles>,
    @InjectRepository(ArticlesVersions) private articlesVersions: Repository<ArticlesVersions>,
  ) {}

  async create(uid: number, body: ArticleCreateDto) {
    return Articles.transaction(async (query) => {
      const data = new Articles(body, uid);
      const articlesRes = query.manager.getRepository(Articles);
      const articlesVersionsRes = query.manager.getRepository(ArticlesVersions);
      //
      const article = await articlesRes.save(data);
      const versions = new ArticlesVersions(article, body.content);
      await articlesVersionsRes.save(versions);
      return article;
    });
  }

  async getArticle(id: number) {
    // return await this.articlesSqlService.getArticles(id);
  }

  async createArticle(body: ArticleCreateDto) {}

  async updateArticle(id: number, body: ArticleUpdateDto) {}
}
