import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';
import { IsIn, IsOptional } from 'class-validator';
import { ArticleTypeEnum } from '../entities/article.entity';
import { CreateArticleDto } from './create-article.dto';

export class UpdateArticleDto extends PartialType(CreateArticleDto) {
	@ApiProperty({
		description: 'Content',
		example: 'Content',
		required: false
	})
	@IsOptional()
	content: string;

	@ApiProperty({
		required: false
	})
	@IsIn(Object.values(ArticleTypeEnum))
	type: ArticleTypeEnum;

	@ApiProperty({
		required: false,
		example: 'image'
	})
	@IsOptional()
	image: string;

	@ApiProperty({ description: 'Speciality', required: false })
	@IsOptional()
	specialityId?: number;

	@ApiProperty({ description: 'Language', required: false })
	@IsOptional()
	languageId?: number;
}
