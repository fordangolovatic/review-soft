import { Transform, TransformFnParams } from 'class-transformer';
import {
	IsDateString,
	IsDefined,
	IsInt,
	IsNotEmpty,
	IsOptional,
	IsPositive, Length
} from 'class-validator';

/**
 * A DTO class for currency.
 */
export class CreateCurrencyDto {
	/**
	 * Name of the currency.
	 */
	@IsDefined()
	@IsNotEmpty()
	@Transform(({ value }: TransformFnParams) => value.trim())
	@Length(2, 500)
	currencyName: string;

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
