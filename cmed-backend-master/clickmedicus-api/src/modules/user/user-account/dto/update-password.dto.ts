
import { OmitType, PartialType } from '@nestjs/swagger';
import { Transform, TransformFnParams } from 'class-transformer';
import {
	IsDefined,
	IsNotEmpty,
	Length,
	IsString
} from 'class-validator';
import { CreateUserDto } from './create-user.dto';

/**
 * A DTO class for update an existing user.
 */
export class UpdatePasswordDto extends PartialType(
	OmitType(CreateUserDto, ['createdBy', 'createdDate'] as const)
) {
	/**
	 * Old password to login into the system.
	 */
	@IsDefined()
	@IsString()
	@IsNotEmpty()
	@Transform(({ value }: TransformFnParams) => value?.trim())
	@Length(8, 20)
	oldPassword: string;

	/**
	 * New password to login into the system.
	 */
	@IsDefined()
	@IsString()
	@IsNotEmpty()
	@Transform(({ value }: TransformFnParams) => value?.trim())
	@Length(8, 20)
	newPassword: string;
}
