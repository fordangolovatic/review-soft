import { UserAccountEntity } from '@modules/user/user-account/entities/user-account.entity';
import { createLikeDto } from '../dto/create-like.dto';

export interface LikeServiceInterface {
	createLike(createLikeDto: createLikeDto, user: UserAccountEntity);

	getAllLike(postId: number);
}
