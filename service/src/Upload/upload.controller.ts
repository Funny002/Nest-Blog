import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { Controller, Delete, Post, UseInterceptors } from '@nestjs/common';
import { ApiConsumes, ApiOperation, ApiTags } from '@nestjs/swagger';
import { UploadService } from './upload.service';

@ApiTags('Upload')
@Controller('upload')
export class UploadController {
  constructor(private readonly uploadService: UploadService) {}

  @Post('create')
  @ApiOperation({ summary: '创建上传' })
  clipCreate() {}

  @Post('clip')
  @ApiOperation({ summary: '上传切片' })
  clipUpload() {}

  @Post('merge')
  @ApiOperation({ summary: '合并切片' })
  clipMerge() {}

  @Delete('delete')
  @ApiOperation({ summary: '删除上传' })
  clipDelete() {}

  @Post('file')
  @ApiOperation({ summary: '上传文件' })
  @UseInterceptors(FileInterceptor('file'))
  @ApiConsumes('multipart/form-data; utf-8')
  uploadFile() {}

  @Post('files')
  @ApiOperation({ summary: '上传多个文件' })
  @UseInterceptors(FilesInterceptor('files'))
  @ApiConsumes('multipart/form-data; utf-8')
  uploadFiles() {}

  @Post('avatar')
  @ApiOperation({ summary: '上传头像' })
  @UseInterceptors(FileInterceptor('avatar'))
  @ApiConsumes('multipart/form-data; utf-8')
  uploadAvatar() {}
}
