import { Body, Controller, Delete, Param, Post, Put, Req } from '@nestjs/common';
import { CommentsCreateDto } from '@src/Comments/Dto/create.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { CommentsService } from './comments.service';
import { CustomError } from '@libs/error';

@ApiTags('Comments')
@Controller('comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @Post('create/:tid')
  @ApiOperation({ summary: '评论文章' })
  async createArticleComments(@Req() req: Request, @Param('tid') tid: number, @Body() body: CommentsCreateDto) {
    const uid = req['user']?.uid || 0;
    if (!uid && !body.name) throw new CustomError('请输入昵称');
    if (!(await this.commentsService.hasArticles(tid))) throw new CustomError('文章不存在');
    return await this.commentsService.create(tid, body, uid);
  }

  @Delete('delete/:cid')
  @ApiOperation({ summary: '删除评论' })
  async delete(@Param('cid') cid: number) {}

  @Put('update/:cid')
  @ApiOperation({ summary: '修改评论' })
  async update(@Param('cid') cid: number) {}
}
