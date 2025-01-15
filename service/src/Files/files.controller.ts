import { Controller, Get } from '@nestjs/common';
import { FilesService } from './files.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Files')
@Controller('files')
export class FilesController {
  constructor(private readonly filesService: FilesService) {}

  @Get('preview/:id')
  @ApiOperation({ summary: '预览文件' })
  preview() {}

  @Get('download/:id')
  @ApiOperation({ summary: '下载文件' })
  download() {}

  @Get('list')
  @ApiOperation({ summary: '获取文件列表' })
  list() {}

  @Get('info/:id')
  @ApiOperation({ summary: '获取文件信息' })
  info() {}

  @Get('list/:uid')
  @ApiOperation({ summary: '获取用户文件列表' })
  listByUid() {}
}
