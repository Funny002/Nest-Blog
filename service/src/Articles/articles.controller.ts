import { ArticlesService } from './articles.service';
import { Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Articles')
@Controller('articles')
export class ArticlesController {
  constructor(private readonly articlesService: ArticlesService) {}

  @Get('info/:tid')
  @ApiOperation({ summary: '获取文章信息' })
  async info(@Param('tid') tid: number) {}

  @Post('create')
  @ApiOperation({ summary: '创建文章' })
  async create() {}

  @Put('update/:tid')
  @ApiOperation({ summary: '修改文章' })
  async update(@Param('tid') tid: number) {}

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
