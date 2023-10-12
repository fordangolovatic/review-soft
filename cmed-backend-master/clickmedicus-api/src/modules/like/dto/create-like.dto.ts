import { UserAccountEntity } from '@modules/user/user-account/entities/user-account.entity';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional } from 'class-validator';

export class createLikeDto {
	@ApiProperty({
		example: '1',
		description: 'Id of post',
		type: 'number',
		required: true
	})
	@IsNotEmpty()
	postId: number;

	@IsOptional()
	userId: UserAccountEntity;
}
