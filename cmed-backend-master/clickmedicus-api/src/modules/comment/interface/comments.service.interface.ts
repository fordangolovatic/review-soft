import { UserAccountEntity } from '@modules/user/user-account/entities/user-account.entity';
import { CreateCommentDto } from '../dto/create-comment.dto';

export interface CommentsServiceInterface {
	createComment(
		postId: number,
		createCommentDto: CreateCommentDto,
		user: UserAccountEntity
	);

	getAllComments(commentId: number);
}
