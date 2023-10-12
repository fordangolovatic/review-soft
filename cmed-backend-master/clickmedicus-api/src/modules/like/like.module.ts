import { Module } from '@nestjs/common';
import { LikeController } from './like.controller';
import { LikeService } from './like.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LikeEntity } from './entities/like.entity';
import { DIToken } from '@core/constants/enums/ditoken.enum';
import { LikeRepository } from './repository/like.repository';
import { PostEntity } from '@modules/social-media/media/entities/post.entity';

@Module({
	imports: [TypeOrmModule.forFeature([LikeEntity, PostEntity])],
	controllers: [LikeController],
	providers: [
		{
			provide: DIToken.LIKE_REPOSITORY_INTERFACE,
			useClass: LikeRepository
		},
		{
			provide: DIToken.LIKE_SERVICE_INTERFACE,
			useClass: LikeService
		}
	]
})
export class LikeModule {}
