import { IsOptional } from 'class-validator';

/**
 * A DTO class for account.
 */
export class CreateProfessionalExperienceDto {
	@IsOptional()
	speciality: string;

	@IsOptional()
	position: string;

	@IsOptional()
	location: string;

	@IsOptional()
	startDate: string;

	@IsOptional()
	endDate: string;

	@IsOptional()
	isOngoing: boolean;
}
