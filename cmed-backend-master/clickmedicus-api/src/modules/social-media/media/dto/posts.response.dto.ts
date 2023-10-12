import { ApiProperty } from '@nestjs/swagger';

export class PostsReponse {
	@ApiProperty({
		required: true,
		example: 1
	})
	postId: number;
	@ApiProperty({
		required: true,
		example: 'Content'
	})
	content: string;
	@ApiProperty({
		required: true,
		example: 'Image'
	})
	image: string;
	@ApiProperty({
		required: true,
		example: 'video'
	})
	video: string;
	@ApiProperty({
		required: true,
		example: 'article'
	})
	article: string;
	@ApiProperty({
		required: true,
		example: '2022-12-17T22:00:00.000Z'
	})
	created_date: Date;
}
