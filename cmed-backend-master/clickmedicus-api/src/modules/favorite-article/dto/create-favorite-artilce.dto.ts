import { IsDateString, IsInt, IsOptional, IsPositive } from 'class-validator';
import { UserAccountEntity } from '@modules/user/user-account/entities/user-account.entity';

export class CreateFavoriteArtilceDto {
	/**
	 * article id.
	 */
	@IsOptional()
	@IsPositive()
	@IsInt()
	articleId: number;

	/**
	 * User id of a user who created the record.
	 */
	@IsOptional()
	@IsInt()
	@IsPositive()
	createdBy: UserAccountEntity;
}
