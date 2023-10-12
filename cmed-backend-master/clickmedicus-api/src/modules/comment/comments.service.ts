import { DIToken } from '@core/constants/enums/ditoken.enum';
import { Inject, Injectable } from '@nestjs/common';
import { CommentsRepositoryInterface } from './interface/comments.repository.interface';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UserAccountEntity } from '@modules/user/user-account/entities/user-account.entity';
import { CommentEntity } from './entities/comment.entity';

@Injectable()
export class CommentsService {
	constructor(
		@Inject(DIToken.COMMENT_REPOSITORY_INTERFACE)
		private readonly commentRepository: CommentsRepositoryInterface
	) {}

	async createComment(
		postId: number,
		createCommentDto: CreateCommentDto,
		user: UserAccountEntity
	): Promise<CommentEntity> {
		createCommentDto.userId = user;
		return this.commentRepository.createEntity(postId, createCommentDto);
	}

	async getAllComments(postId: number) {
		return this.commentRepository.getManyByCondition(postId);
	}
}
