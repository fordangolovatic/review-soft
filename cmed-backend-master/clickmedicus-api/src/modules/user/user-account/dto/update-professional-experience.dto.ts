import { ApiProperty } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';

/**
 * A DTO class for account.
 */
export class UpdateProfessionalExperienceDto {
	@IsOptional()
	@ApiProperty({
		required: false,
		example: 2
	})
	professionalExperienceId: number;

	@IsOptional()
	@ApiProperty({
		required: false,
		example: 'test'
	})
	speciality: string;
	@IsOptional()
	@ApiProperty({
		required: false,
		example: 'test'
	})
	position: string;

	@IsOptional()
	@ApiProperty({
		required: false,
		example: 'test'
	})
	location: string;

	@IsOptional()
	@ApiProperty({
		required: false,
		example: 'test'
	})
	startDate: string;

	@IsOptional()
	@ApiProperty({
		required: false,
		example: 'test'
	})
	endDate: string;

	@IsOptional()
	@ApiProperty({
		required: false,
		example: true
	})
	isOngoing: boolean;
}
