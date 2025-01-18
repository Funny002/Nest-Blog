import { ArticleCreateDto } from '@src/Articles/Dto/create.dto';
import { PartialType } from '@nestjs/swagger';

export class ArticleUpdateDto extends PartialType(ArticleCreateDto) {}
