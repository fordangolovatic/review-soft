import { IsDefined, IsString, IsNotEmpty, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { UserAccountEntity } from '@modules/user/user-account/entities/user-account.entity';

export class CreateCommentDto {
	/**
	 * Content
	 */
	@IsDefined()
	@IsString()
	message: string;

	@IsOptional()
	userId: UserAccountEntity;
}
