import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { ArticlesService } from './articles.service';

// Dto
import { ArticleCreateDto } from '@src/Articles/Dto/create.dto';
import { ArticleUpdateDto } from '@src/Articles/Dto/update.dto';

@ApiTags('Articles')
@Controller('articles')
export class ArticlesController {
  constructor(private readonly articlesService: ArticlesService) {}

  @Get('info/:tid')
  @ApiOperation({ summary: '获取文章信息' })
  async info(@Param('tid') tid: number) {
    return await this.articlesService.getArticle(tid);
  }

  @Post('create')
  @ApiOperation({ summary: '创建文章' })
  async create(@Body() body: ArticleCreateDto) {
    return body;
  }

  @Put('update/:tid')
  @ApiOperation({ summary: '修改文章' })
  async update(@Param('tid') tid: number, @Body() body: ArticleUpdateDto) {
    return await this.articlesService.updateArticle(tid, body);
  }

  @Delete('delete/:tid')
  @ApiOperation({ summary: '删除文章' })
  async delete(@Param('tid') tid: number) {}

  @Get('list')
  @ApiOperation({ summary: '获取文章列表' })
  async list() {}

  @Get('userList')
  @ApiOperation({ summary: '获取用户文章列表' })
  async userList() {}
}
