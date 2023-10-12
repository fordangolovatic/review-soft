import { DIToken } from '@core/constants/enums/ditoken.enum';
import { UserAccountEntity } from '@modules/user/user-account/entities/user-account.entity';
import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { DeleteResult, UpdateResult } from 'typeorm';
import { CreatePostDto } from './dto/create-post.dto';
import { PostEntity } from './entities/post.entity';
import { PostRepositoryInterface } from './interfaces/post.repository.interface';
import { UpdatePostDto } from './dto/update-post.dto';

@Injectable()
export class PostService {
	constructor(
		@Inject(DIToken.POST_REPOSITORY_INTERFACE)
		private readonly postRepository: PostRepositoryInterface
	) {}

	/**
	 * Returns a list of all the records of post.
	 */
	getList(): Promise<PostEntity[]> {
		try {
			return this.postRepository.getManyByCondition({
				relations: {
					article: true
				}
			});
		} catch (error) {
			throw error;
		}
	}

	async getPostById(id: number): Promise<PostEntity> {
		try {
			return await this.postRepository.getOneById({
				where: {
					postId: id
				},
				relations: {
					article: true
				}
			});
		} catch (error) {
			throw error;
		}
	}

	async updatePostById(
		id: number,
		updateData: UpdatePostDto
	): Promise<UpdateResult> {
		try {
			return await this.postRepository.update(id, updateData);
		} catch (error) {
			throw error;
		}
	}

	/**
	 * Create record(s).
	 */
	createPost(
		data: CreatePostDto,
		user: UserAccountEntity
	): Promise<PostEntity> {
		try {
			return this.postRepository.create({ ...data, user: user.userId });
		} catch (error) {
			throw error;
		}
	}

	/**
	 * Delete post based.
	 * @param {number} id - a unique id / primary key.
	 */
	async deletePost(id: number): Promise<void> {
		try {
			const result: DeleteResult = await this.postRepository.delete(id);
			if (!result.affected) {
				throw new HttpException(
					'Not found with this id',
					HttpStatus.NOT_FOUND
				);
			}
		} catch (error) {
			throw error;
		}
	}
}
