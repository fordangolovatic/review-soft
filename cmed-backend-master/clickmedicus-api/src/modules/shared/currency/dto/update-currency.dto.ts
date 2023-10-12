import { OmitType, PartialType } from '@nestjs/swagger';
import { Transform, TransformFnParams } from 'class-transformer';
import {
    IsDateString,
    IsDefined,
    IsInt,
    IsOptional,
    IsPositive
} from 'class-validator';
import { CreateCurrencyDto } from './create-currency.dto';

/**
 * A DTO class for currency.
 */
export class UpdateCurrencyDto extends PartialType(
	OmitType(CreateCurrencyDto, ['createdBy', 'createdDate'] as const)
) {
	/**
	 * PK of the table.
	 */
	@IsDefined()
	@IsInt()
	@IsPositive()
	currencyId: number;

	/**
	 * User id of a user who modified the record.
	 */
	@IsOptional()
	@IsInt()
	@IsPositive()
	modifiedBy?: number;

	/**
	 * Date and time when the record is modified.
	 */
	@IsOptional()
	@Transform(({ value }: TransformFnParams) => value.trim())
	@IsDateString()
	modifiedDate?: string = new Date().toISOString();
}
