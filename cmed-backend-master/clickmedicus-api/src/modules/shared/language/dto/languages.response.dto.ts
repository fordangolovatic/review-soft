import { ApiProperty } from '@nestjs/swagger';

export class LanguagesResponse {
	@ApiProperty({
		required: true,
		example: 12
	})
	languageId: string;
	@ApiProperty({
		required: true,
		example: 'English'
	})
	languageName: string;
	@ApiProperty({
		required: true,
		example: 'En'
	})
	shortCode: string;
	@ApiProperty({
		required: true,
		example: 26
	})
	createdBy: number;
	@ApiProperty({
		required: true,
		example: '2022-12-19T22:00:00.000Z'
	})
	createdDate: string;
	@ApiProperty({
		required: true,
		example: 'null'
	})
	modifiedBy: string;
	@ApiProperty({
		required: true,
		example: 'null'
	})
	modifiedDate: string;
}
