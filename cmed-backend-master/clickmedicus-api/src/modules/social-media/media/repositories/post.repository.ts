import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BaseAbstractRepository } from '@base/repositories/base.repository';
import { PostEntity } from '../entities/post.entity';
import { PostRepositoryInterface } from '../interfaces/post.repository.interface';

/**
 * A repository for Post table.
 */
@Injectable()
export class PostRepository
	extends BaseAbstractRepository<PostEntity>
	implements PostRepositoryInterface
{
	constructor(
		@InjectRepository(PostEntity)
		private readonly postRepository: Repository<PostEntity>
	) {
		super(postRepository);
	}
}
