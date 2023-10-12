import { LanguageEntity } from '@modules/shared/language/entities/language.entity';
import { OmitType, PartialType } from '@nestjs/swagger';
import {
	IsDateString,
	IsDefined,
	IsInt,
	IsOptional,
	IsPositive,
	IsString
} from 'class-validator';
import { CreateUserDto } from './create-user.dto';

/**
 * A DTO class for update an existing user.
 */
export class UpdateUserDto extends PartialType(
	OmitType(CreateUserDto, ['createdBy', 'createdDate'] as const)
) {
	/**
	 * Primary key of the table.
	 */
	@IsDefined()
	@IsInt()
	@IsPositive()
	userId: number;

	/**
	 * User id of a user who modified the record.
	 */
	@IsOptional()
	@IsInt()
	@IsPositive()
	modifiedBy: number;

	/**
	 * Date and time when the record is modified.
	 */
	@IsOptional()
	@IsDateString()
	modifiedDate: string = new Date().toISOString();

	@IsOptional()
	@IsString()
	firstName: string;

	@IsOptional()
	@IsString()
	lastName: string;

	@IsOptional()
	@IsString()
	description: string;

	@IsOptional()
	@IsDateString()
	dateOfBirth: string;

	@IsOptional()
	cityId: number;

	@IsOptional()
	countryId: number;

	@IsOptional()
	stateId: number;

	@IsOptional()
	@IsString()
	address: string;

	@IsOptional()
	profileImage: string; // TODO - Not implemented

	@IsOptional()
	languages: LanguageEntity[];
}
