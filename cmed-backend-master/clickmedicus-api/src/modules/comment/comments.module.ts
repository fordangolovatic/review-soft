import { Module } from '@nestjs/common';
import { CommentController } from './comments.controller';
import { CommentsService } from './comments.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommentEntity } from './entities/comment.entity';
import { DIToken } from '@core/constants/enums/ditoken.enum';
import { CommentsRepository } from './repository/comments.repository';
import { PostEntity } from '@modules/social-media/media/entities/post.entity';

@Module({
	imports: [TypeOrmModule.forFeature([CommentEntity, PostEntity])],
	controllers: [CommentController],
	providers: [
		{
			provide: DIToken.COMMENT_REPOSITORY_INTERFACE,
			useClass: CommentsRepository
		},
		{
			provide: DIToken.COMMENT_SERVICE_INTERFACE,
			useClass: CommentsService
		}
	]
})
export class CommentsModule {}
