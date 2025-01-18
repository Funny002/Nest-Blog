import { ArticlesSqlService } from '@libs/mysql';
import { Injectable } from '@nestjs/common';

// DTO
import { ArticleCreateDto } from '@src/Articles/Dto/create.dto';
import { ArticleUpdateDto } from '@src/Articles/Dto/update.dto';

@Injectable()
export class ArticlesService {
  constructor(private readonly articlesSqlService: ArticlesSqlService) {}

  async getArticle(id: number) {
    return await this.articlesSqlService.getArticles(id);
  }

  async createArticle(body: ArticleCreateDto) {}

  async updateArticle(id: number, body: ArticleUpdateDto) {}
}
