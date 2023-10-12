import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';

export class CreateResponseDto {
	@ApiProperty({
		type: Number,
		example: 13,
		required: true
	})
	@Type(() => Number)
	from: number;

	@ApiProperty({
		type: Number,
		example: 25,
		required: true
	})
	@Type(() => Number)
	to: number;

	@ApiProperty({
		required: true,
		example: 'some text message'
	})
	content: string;

	@ApiProperty({
		required: true,
		example: 'message subject'
	})
	subject: string;

	@ApiProperty({ required: false, example: 1 })
	consultationId?: number;
}
