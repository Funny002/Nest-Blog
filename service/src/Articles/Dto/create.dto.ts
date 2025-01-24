import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export enum StatusEnum {
  Delete = 'delete', // 删除
  Pending = 'pending', // 审核
  Approved = 'approved', // 通过
  Rejected = 'rejected', // 拒绝
}

export enum TypeEnum {
  Public = 'public', // 公开
  Private = 'private', // 私密
}

export class ArticleCreateDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: '标题', required: true })
  title: string;

  @IsString({ each: true })
  @IsOptional({ each: true })
  @ApiProperty({ description: '标签', required: false })
  tags: string[];

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: '内容', required: true })
  content: string;

  @IsString({ each: true })
  @IsOptional({ each: true })
  @ApiProperty({ description: '附件', required: false })
  files: string[];

  @IsString({ each: true })
  @IsOptional({ each: true })
  @ApiProperty({ description: '分类', required: false })
  types: string[];

  @IsNumber()
  @IsOptional({ each: true })
  @ApiProperty({ description: '草稿', enum: [0, 1], default: 0, required: false })
  is_draft: number;

  @IsString()
  @IsOptional()
  @ApiProperty({ description: '类型', enum: TypeEnum, default: TypeEnum.Public, required: false })
  type: string;

  @IsString()
  @IsOptional()
  @ApiProperty({ description: '状态', enum: StatusEnum, default: StatusEnum.Pending, required: false })
  status: string;
}
