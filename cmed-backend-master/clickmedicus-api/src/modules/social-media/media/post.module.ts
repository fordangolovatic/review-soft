import { Module } from '@nestjs/common';
import { PostService } from './post.service';
import { PostController } from './post.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostEntity } from './entities/post.entity';
import { DIToken } from '@core/constants/enums/ditoken.enum';
import { PostRepository } from './repositories/post.repository';

@Module({
  imports:[TypeOrmModule.forFeature([PostEntity])],
  controllers: [PostController],
	providers: [
		{
			provide: DIToken.POST_REPOSITORY_INTERFACE,
			useClass: PostRepository
		},
		PostService
	],
})
export class PostModule {}
