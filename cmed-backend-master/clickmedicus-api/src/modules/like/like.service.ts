import { Injectable, Inject } from '@nestjs/common';
import { DIToken } from '@core/constants/enums/ditoken.enum';
import { createLikeDto } from './dto/create-like.dto';
import { UserAccountEntity } from '@modules/user/user-account/entities/user-account.entity';
import { LikeRepositoryInterface } from './interface/like.repository.interface';
import { LikeEntity } from './entities/like.entity';

@Injectable()
export class LikeService {
	constructor(
		@Inject(DIToken.LIKE_REPOSITORY_INTERFACE)
		private readonly likeRepository: LikeRepositoryInterface
	) {}

	async createLike(
		createLikeDto: createLikeDto,
		user: UserAccountEntity
	): Promise<LikeEntity> {
		createLikeDto.userId = user;
		return this.likeRepository.createEntity(createLikeDto);
	}

	async getAllLike(postId: number) {
		return this.likeRepository.getManyByCondition(postId);
	}
}
