import { Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Comments')
@Controller('comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @Post('articles/:tid')
  @ApiOperation({ summary: '评论文章' })
  async createArticleComments(@Param('tid') tid: number) {}

  @Post('reply/:cid')
  @ApiOperation({ summary: '回复评论' })
  async replyArticleComments(@Param('cid') cid: number) {}

  @Delete(':cid')
  @ApiOperation({ summary: '删除评论' })
  async delete(@Param('cid') cid: number) {}

  @Put(':cid')
  @ApiOperation({ summary: '修改评论' })
  async update(@Param('cid') cid: number) {}

  @Get('articles/:tid')
  @ApiOperation({ summary: '获取文章评论' })
  async getArticleComments(@Param('tid') tid: number) {}

  @Get('all')
  @ApiOperation({ summary: '获取所有评论' })
  async getAllComments() {}
}
