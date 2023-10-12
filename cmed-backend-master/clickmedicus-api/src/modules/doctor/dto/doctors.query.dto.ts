import { UserAccountSort } from '@modules/user/user-account/interfaces/user-account.sort.interface';
import { IsOptional } from 'class-validator';

export class QueryDoctorsDto {
	@IsOptional()
	firstName: string;

	@IsOptional()
	lastName: string;

	@IsOptional()
	specialities: string[];

	@IsOptional()
	languages: string[];

	@IsOptional()
	countries: string[];

	@IsOptional()
	sort: UserAccountSort;
}
