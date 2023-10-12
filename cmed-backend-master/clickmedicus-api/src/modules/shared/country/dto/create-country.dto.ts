import { Transform, TransformFnParams } from 'class-transformer';
import {
	IsBoolean,
	IsDateString,
	IsDefined,
	IsInt,
	IsNotEmpty,
	IsOptional,
	IsPositive,
	Length
} from 'class-validator';

/**
 * A DTO class for country.
 */
export class CreateCountryDto {
	/**
	 * Name of the country.
	 */
	@IsDefined()
	@IsNotEmpty()
	@Transform(({ value }: TransformFnParams) => value.trim())
	@Length(2, 100)
	countryName: string;

	/**
	 * Is country required state.
	 */
	@IsDefined()
	@IsBoolean()
	allowState: boolean;

	/**
	 * User id of a user who created the record.
	 */
	@IsOptional()
	@IsInt()
	@IsPositive()
	createdBy: number;

	/**
	 * Date and time when the record is created.
	 */
	@IsOptional()
	@Transform(({ value }: TransformFnParams) => value.trim())
	@IsDateString()
	createdDate: string = new Date().toISOString();
}
