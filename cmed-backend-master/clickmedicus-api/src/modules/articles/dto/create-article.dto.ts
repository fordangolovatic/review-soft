import { UserAccountEntity } from '@modules/user/user-account/entities/user-account.entity';
import { ApiProperty } from '@nestjs/swagger';
import { IsIn, IsNotEmpty, IsOptional } from 'class-validator';
import { ArticleTypeEnum } from '../entities/article.entity';

/**
 * A DTO class for Article.
 */
export class CreateArticleDto {
	@ApiProperty({
		example: 'title',
		description: 'Title of Article',
		type: 'string',
		required: true
	})
	@IsNotEmpty()
	title: string;

	@ApiProperty({
		example: 'content',
		description: 'Content of Article',
		type: 'string',
		required: true
	})
	@IsNotEmpty()
	content: string;

	@ApiProperty({
		required: false,
		example: 'general'
	})
	@IsIn(Object.values(ArticleTypeEnum))
	type: ArticleTypeEnum;

	@ApiProperty({
		required: false,
		example: 'image'
	})
	@IsOptional()
	image: string;

	@IsOptional()
	createdBy: UserAccountEntity;

	@ApiProperty({
		required: false,
	})
	@IsOptional()
	specialityId: number;

	@ApiProperty({required: false})
	@IsOptional()
	languageId: number;
}
