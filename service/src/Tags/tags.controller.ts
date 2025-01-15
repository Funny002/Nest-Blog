import { Controller, Delete, Get, Post } from '@nestjs/common';
import { TagsService } from './tags.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Tags')
@Controller('tags')
export class TagsController {
  constructor(private readonly tagsService: TagsService) {}

  @Get('list')
  @ApiOperation({ summary: '获取标签列表' })
  async list() {}

  @Post('create')
  @ApiOperation({ summary: '创建标签' })
  async create() {}

  @Delete('delete')
  @ApiOperation({ summary: '删除' })
  async delete() {}
}
