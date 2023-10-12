import { ApiProperty } from '@nestjs/swagger';

export class MetadataResponseDto {
	@ApiProperty({
		required: true,
		example: 'admin',
		type: String
	})
	accountType: string;

	@ApiProperty({
		required: true,
		example: 'https://clickmedicus-media.com/images/some_name.jpg',
		type: String
	})
	profileImage: string;

	@ApiProperty({
		required: true,
		example: 5,
		type: Number
	})
	userId: number;

	@ApiProperty({
		required: true,
		example: 'First',
		type: String
	})
	firstName: string;

	@ApiProperty({
		required: true,
		example: 'Last',
		type: String
	})
	lastName: string;
}
