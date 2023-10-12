import { IsOptional } from 'class-validator';

export class QueryQuestionsDto {
	@IsOptional()
	specialties: string[];

	@IsOptional()
	languages: string[];
}
