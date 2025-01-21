import { Articles, ArticlesVersions } from '@mysql';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';

@Injectable()
export class ArticlesSqlService {
  constructor(
    @InjectRepository(Articles) private articles: Repository<Articles>,
    @InjectRepository(ArticlesVersions) private articlesVersions: Repository<ArticlesVersions>,
  ) {}

  async createArticle() {}

  // async getArticles(id: number) {
  //   console.log('id', id);
  //   return await this.articles.findOne({ where: { id } });
  // }
  //
  // async getArticlesContent(articles: Articles) {
  //   // articles.versions
  //   return articles.versions;
  //   // return await this.articlesVersions.findOne({where:{}})
  // }
  //
  // async getArticlesInfo(id: number) {
  //   const articles = await this.getArticles(id);
  //   const articlesContent = await this.getArticlesContent(articles);
  // }
}
