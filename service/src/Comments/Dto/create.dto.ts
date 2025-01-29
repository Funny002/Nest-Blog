import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CommentsCreateDto {
  @IsString()
  @IsOptional()
  @ApiProperty({ description: '上层', required: false })
  parent: number;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: '评论内容', required: true })
  content: string;

  @IsString()
  @IsOptional()
  @ApiProperty({ description: '昵称', required: false })
  name: string;

  @IsString()
  @IsOptional()
  @ApiProperty({ description: '邮箱', required: false })
  email: string;

  @IsString()
  @IsOptional()
  @ApiProperty({ description: '链接', required: false })
  href: string;

  @IsString({ each: true })
  @IsOptional({ each: true })
  @ApiProperty({ description: '附件', required: false })
  files: string[];
}
