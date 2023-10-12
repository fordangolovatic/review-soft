import { ApiProperty } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';
import { UpdateProfessionalExperienceDto } from './update-professional-experience.dto';

export class CreateProfessionalInfoDto {
	@ApiProperty({
		required: false,
		example: 1
	})
	@IsOptional()
	experienceInYears: number;

	@ApiProperty({
		required: false,
		example: [1]
	})
	@IsOptional()
	specialities: [];

	@ApiProperty({
		required: false,
		example: [1]
	})
	@IsOptional()
	professionalExperiences: UpdateProfessionalExperienceDto[];
}
