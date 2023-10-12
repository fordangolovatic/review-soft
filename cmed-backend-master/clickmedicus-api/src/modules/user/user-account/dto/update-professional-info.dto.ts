import { ApiProperty } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';
import { UpdateProfessionalExperienceDto } from './update-professional-experience.dto';

export class UpdateProfessionalInfoDto {
	@IsOptional()
	@ApiProperty({
		required: false,
		example: []
	})
	specialities: [];

	@IsOptional()
	@ApiProperty({
		required: false,
		example: 1
	})
	experienceInYears: number;

	@IsOptional()
	@ApiProperty({
		required: false,
		example: [
			{
				speciality: 'speciality',
				position: 'position',
				location: 'location',
				startDate: 'Jan 2023',
				endDate: 'Jan 2033',
				isOngoing: true
			}
		]
	})
	professionalExperiences: UpdateProfessionalExperienceDto[];
}
