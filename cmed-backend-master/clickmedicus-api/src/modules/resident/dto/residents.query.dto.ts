import { IsOptional } from 'class-validator';

export class QueryResidentsDto {
	@IsOptional()
	firstName: string;

	@IsOptional()
	lastName: string;

	@IsOptional()
	languages: string[];

	@IsOptional()
	countries: string[];
}
