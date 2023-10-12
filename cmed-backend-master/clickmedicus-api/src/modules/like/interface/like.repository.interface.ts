import { BaseRepositoryInterface } from '@base/interfaces/base.repository.interface';
import { LikeEntity } from '../entities/like.entity';
import { createLikeDto } from '../dto/create-like.dto';

export interface LikeRepositoryInterface
	extends BaseRepositoryInterface<LikeEntity> {
	getManyByCondition(postId): Promise<any>;

	createEntity(createLikeDto: createLikeDto): Promise<LikeEntity>;
}
