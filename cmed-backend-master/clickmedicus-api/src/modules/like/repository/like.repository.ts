import { BaseAbstractRepository } from '@base/repositories/base.repository';
import { Injectable } from '@nestjs/common';
import { LikeEntity } from '../entities/like.entity';
import { LikeRepositoryInterface } from '../interface/like.repository.interface';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { createLikeDto } from '../dto/create-like.dto';
import { PostEntity } from '@modules/social-media/media/entities/post.entity';

@Injectable()
export class LikeRepository
	extends BaseAbstractRepository<LikeEntity>
	implements LikeRepositoryInterface
{
	constructor(
		@InjectRepository(LikeEntity)
		private likeRepository: Repository<LikeEntity>,
		@InjectRepository(PostEntity)
		private readonly postRepository: Repository<PostEntity>
	) {
		super(likeRepository);
	}

	async getManyByCondition(postId): Promise<any> {
		return await this.likeRepository.find({
			where: [{ postId: postId }],
			relations: {
				userId: true,
				postId: true
			}
		});
	}

	async createEntity(createLikeDto: createLikeDto): Promise<LikeEntity> {
		const like = this.likeRepository.create();
		const post = await this.postRepository.findOne({
			where: { postId: createLikeDto.postId }
		});
		if (!post) {
			throw Error('Please select valid post');
		}
		like.postId = post;
		like.userId = createLikeDto.userId;

		console.log(like);
		return this.likeRepository.save(like);
	}
}
