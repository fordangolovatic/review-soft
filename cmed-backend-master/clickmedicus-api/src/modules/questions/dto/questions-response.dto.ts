import { ApiProperty } from '@nestjs/swagger';
import { SpecialityEntity } from '@modules/specialities/entities/speciality.entity';
import { LanguageEntity } from '@modules/shared/language/entities/language.entity';

export class QuestionsResponseDto {
	/**
	 * Question
	 */
	@ApiProperty({
		example: 1,
		description: "Question's Id",
		type: 'number',
		required: true
	})
	questionId: number;

	@ApiProperty({
		example: 'string',
		description: 'Question`s title',
		type: 'string',
		required: true
	})
	title: string;

	@ApiProperty({
		example: 'content',
		description: 'Question`s content',
		type: 'string',
		required: true
	})
	content: string;

	@ApiProperty({
		example: 'image',
		description: 'Question`s image',
		type: 'string',
		required: false
	})
	image: string;

	@ApiProperty({
		example: false,
		description: 'isAnonymous',
		type: 'boolean',
		required: true
	})
	isAnonymous: boolean;

	@ApiProperty({
		example: [
			{
				specialityId: 7,
				speciality: 'Radiology',
				createdAt: '2023-04-07T12:01:30.000Z'
			}
		],
		description: 'Question`s speciality',
		type: 'string',
		required: false
	})
	speciality: SpecialityEntity;

	@ApiProperty({
		example: [
			{
				languageId: 12,
				languageName: 'English',
				shortCode: 'En',
				createdBy: 26,
				createdDate: '2023-01-09T13:42:51.000Z',
				modifiedBy: null,
				modifiedDate: null
			}
		],
		description: 'Question`s language',
		type: 'string',
		required: false
	})
	language: LanguageEntity;

	@ApiProperty({
		example: '2023-01-09T13:42:51.000Z',
		description: 'Publish date',
		type: 'date',
		required: false
	})
	publishDate: Date;
}
