import { BaseController } from '@base/controller/base.controller';
import { Controller, Post, Param, Inject, Get, Body } from '@nestjs/common';
import { ApiTags, OmitType } from '@nestjs/swagger';
import { SwaggerRouteDecorator } from '@modules/decorators/swagger.config';
import { CreateCommentDto } from './dto/create-comment.dto';
import { User } from '@core/decorators/user.decorator';
import { UserAccountEntity } from '@modules/user/user-account/entities/user-account.entity';
import { DIToken } from '@core/constants/enums/ditoken.enum';
import { CommentsServiceInterface } from './interface/comments.service.interface';

@ApiTags('comments')
@Controller('comments')
export class CommentController extends BaseController {
	constructor(
		@Inject(DIToken.COMMENT_SERVICE_INTERFACE)
		private readonly commentService: CommentsServiceInterface
	) {
		super();
	}
	@SwaggerRouteDecorator({
		apiResponseData: { status: 200, type: CreateCommentDto },
		apiSecurityData: 'accessToken'
	})
	@Post(':postId')
	create(
		@Param('postId') postId: number,
		@Body() body: CreateCommentDto,
		@User() user: UserAccountEntity
	) {
		return this.commentService.createComment(postId, body, user);
	}

	@SwaggerRouteDecorator({
		apiResponseData: { status: 200, type: CreateCommentDto },
		apiSecurityData: 'accessToken'
	})
	@Get(':postId')
	getAll(@Param('postId') postId: number) {
		return this.commentService.getAllComments(postId);
	}
}
