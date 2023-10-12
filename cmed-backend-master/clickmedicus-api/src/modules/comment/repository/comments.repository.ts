import { BaseAbstractRepository } from '@base/repositories/base.repository';
import { CommentEntity } from '../entities/comment.entity';
import { CommentsRepositoryInterface } from '../interface/comments.repository.interface';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCommentDto } from '../dto/create-comment.dto';
import { PostEntity } from '@modules/social-media/media/entities/post.entity';

export class CommentsRepository
	extends BaseAbstractRepository<CommentEntity>
	implements CommentsRepositoryInterface
{
	constructor(
		@InjectRepository(CommentEntity)
		private commentRepository: Repository<CommentEntity>,
		@InjectRepository(PostEntity)
		private readonly postRepository: Repository<PostEntity>
	) {
		super(commentRepository);
	}

	async getManyByCondition(postId): Promise<any> {
		return await this.commentRepository.find({
			where: [{ postId: postId }],
			relations: {
				user: true,
				postId: true
			}
		});
	}

	async createEntity(
		postId: number,
		createCommentDto: CreateCommentDto
	): Promise<CommentEntity> {
		const comment = this.commentRepository.create();
		const post = await this.postRepository.findOne({
			where: { postId }
		});
		if (!post) {
			throw Error('Please select valid post');
		}
		comment.postId = post;
		comment.message = createCommentDto.message;
		comment.user = createCommentDto.userId;

		return this.commentRepository.save(comment);
	}
}
