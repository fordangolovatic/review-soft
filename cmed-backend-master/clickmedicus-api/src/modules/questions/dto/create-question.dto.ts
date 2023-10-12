import { UserAccountEntity } from '@modules/user/user-account/entities/user-account.entity';
import { ApiProperty } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';

export class CreateQuestionDto {
	/**
	 * Question
	 */
	@ApiProperty({
		example: 'string',
		description: 'Title of Question',
		type: 'string',
		required: true
	})
	title: string;

	@ApiProperty({
		example: 'content',
		description: 'Content of Question',
		type: 'string',
		required: true
	})
	content: string;

	@ApiProperty({
		example: 'image',
		description: 'Image of Question',
		type: 'string',
		required: false
	})
	image: string;

	@IsOptional()
	createdBy: UserAccountEntity;

	@ApiProperty({
		example: false,
		description: 'isAnonymous',
		type: 'boolean',
		required: true
	})
	isAnonymous: boolean;

	@ApiProperty({
		example: 'Radiology',
		description: 'Question speciality',
		type: 'number',
		required: false
	})
	speciality: number;

	@ApiProperty({
		example: 'English',
		description: 'Question language',
		type: 'number',
		required: false
	})
	language: number;
}
