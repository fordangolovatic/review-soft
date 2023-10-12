import { ApiProperty } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';
/**
 * A DTO class for Speciality.
 */
export class CreateSpecialityDto {
	/**
	 * Speciality
	 */
	@ApiProperty({
		example: 'Dermatology',
		description: 'Speciality name',
		type: 'string',
		required: true
	})
	speciality: string;

	@ApiProperty({
		required: false,
		example: 'image'
	})
	@IsOptional()
	image: string;
}
