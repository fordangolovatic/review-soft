import { ApiProperty } from '@nestjs/swagger';

export class ArticleResponse {
	@ApiProperty({
		required: true,
		example: 13
	})
	articleId: number;

	@ApiProperty({
		required: true,
		example: 'title'
	})
	title: string;

	@ApiProperty({
		required: true,
		example: 'content'
	})
	content: string;

	@ApiProperty({
		required: true,
		example: 'general'
	})
	type: string;

	@ApiProperty({
		required: true,
		example: 'image'
	})
	image: string;

	@ApiProperty({
		required: true,
		example: '2022-12-17T22:00:00.000Z'
	})
	createdAt: Date;

	@ApiProperty({
		required: true,
		example: [
			{
				specialityId: '7',
				specialityName: 'Radiology',
				createdAt: '2023-03-31T12:39:30.000Z'
			}
		]
	})
	specialities: [];
}
