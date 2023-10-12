import { UserAccountEntity } from '@modules/user/user-account/entities/user-account.entity';
import { ApiProperty } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';

export class ProfessionalInfoResponseDto {
	@ApiProperty({
		required: false,
		example: 1
	})
	@IsOptional()
	professionalInfoId: number;

	@ApiProperty({
		required: false,
		example: 1
	})
	@IsOptional()
	experienceInYears: number;

	@ApiProperty({
		required: false,
		example: [
			{
				professionalExperienceId: 5,
				speciality: 'dsdasdas',
				position: 'dasdasdasdsa',
				location: 'fdsfdsfds',
				startDate: '2023-04-07T12:22:16.000Z',
				endDate: '2023-04-07T12:22:16.000Z',
				isOngoing: false
			}
		]
	})
	@IsOptional()
	professionalExperience: [];

	@ApiProperty({
		required: false,
		example: [
			{
				specialityId: 16,
				speciality: 'Allergy',
				createdAt: '2023-04-07T12:01:30.000Z'
			}
		]
	})
	@IsOptional()
	speciality: [];
}
