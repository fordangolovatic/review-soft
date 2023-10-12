import { BaseRepositoryInterface } from '@base/interfaces/base.repository.interface';
import { CommentEntity } from '../entities/comment.entity';
import { CreateCommentDto } from '../dto/create-comment.dto';

export interface CommentsRepositoryInterface
	extends BaseRepositoryInterface<CommentEntity> {
	getManyByCondition(commentId): Promise<any>;

	createEntity(
		postId: number,
		createCommentDto: CreateCommentDto
	): Promise<CommentEntity>;
}
