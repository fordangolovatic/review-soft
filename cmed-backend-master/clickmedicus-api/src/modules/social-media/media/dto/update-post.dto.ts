import { ApiProperty } from '@nestjs/swagger';

export class UpdatePostDto {
	@ApiProperty({
		required: true,
		example: 'content'
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
}
