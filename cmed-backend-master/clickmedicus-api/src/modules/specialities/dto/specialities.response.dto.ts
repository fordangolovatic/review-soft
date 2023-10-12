import { ApiProperty } from '@nestjs/swagger';

export class SpecialitiesResponseDto {
	@ApiProperty({
		example: 1,
		type: 'number',
		required: true
	})
	categoryId: number;

	@ApiProperty({
		example: 1,
		type: 'string',
		required: true
	})
	speciality: string;

	@ApiProperty({
		required: false,
		example: 'image'
	})
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
}
