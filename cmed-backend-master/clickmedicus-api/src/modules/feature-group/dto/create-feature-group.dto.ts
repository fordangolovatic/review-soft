import { Transform, TransformFnParams } from 'class-transformer';
import {
	IsDateString,
	IsDefined,
	IsInt,
	IsNotEmpty,
	IsOptional,
	IsPositive,
	Length
} from 'class-validator';

/**
 * A DTO class for FeatureGroup.
 */
export class CreateFeatureGroupDto {
	/**
	 * Name of the feature group.
	 */
	@IsDefined()
	@IsNotEmpty()
	@Transform(({ value }: TransformFnParams) => value.trim())
	@Length(2, 100)
	featureGroupName: string;

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
	@IsDateString()
	createdDate: string = new Date().toISOString();
}
