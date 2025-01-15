import { Controller, Delete, Get } from '@nestjs/common';
import { TypesService } from './types.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Types')
@Controller('types')
export class TypesController {
  constructor(private readonly typesService: TypesService) {}

  @Get('list')
  @ApiOperation({ summary: '获取类型列表' })
  getList() {}

  @Get('create')
  @ApiOperation({ summary: '创建类型' })
  create() {}

  @Delete('delete')
  @ApiOperation({ summary: '删除类型' })
  delete() {}
}
