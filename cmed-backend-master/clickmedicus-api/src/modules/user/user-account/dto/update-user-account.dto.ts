import { ApiProperty } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';
import { CityEntity } from '@modules/shared/city/entities/city.entity';
import { CountryEntity } from '@modules/shared/country/entities/country.entity';
import { StateEntity } from '@modules/shared/state/entities/state.entity';

/**
 * A DTO class for account.
 */
export class UpdateAccountDto {
	@IsOptional()
	@ApiProperty({
		required: false,
		example: 'test'
	})
	firstName: string;

	@IsOptional()
	@ApiProperty({
		required: false,
		example: 'test'
	})
	lastName: string;

	@ApiProperty({
		required: true,
		example: 'null'
	})
	profileImage: string;

	@IsOptional()
	@ApiProperty({
		required: false,
		example: '2031-04-04T21:00:00.000Z'
	})
	dateOfBirth: Date;

	@IsOptional()
	@ApiProperty({
		required: false,
		example: 1
	})
	city: CityEntity;

	@IsOptional()
	@ApiProperty({
		required: false,
		example: 1
	})
	country: CountryEntity;

	@IsOptional()
	@ApiProperty({
		required: false,
		example: 1
	})
	state: StateEntity;

	@IsOptional()
	@ApiProperty({
		required: false,
		example: 'test'
	})
	address: string;

	@IsOptional()
	@ApiProperty({
		required: false,
		example: []
	})
	languages: [];
}
