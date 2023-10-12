import { DIToken } from '@core/constants/enums/ditoken.enum';
import { Controller, Inject, Post, Body, Get, Param } from '@nestjs/common';
import { ApiTags, OmitType } from '@nestjs/swagger';
import { LikeServiceInterface } from './interface/like.service.interface';
import { BaseController } from '@base/controller/base.controller';
import { SwaggerRouteDecorator } from '@modules/decorators/swagger.config';
import { User } from '@core/decorators/user.decorator';
import { createLikeDto } from './dto/create-like.dto';
import { UserAccountEntity } from '@modules/user/user-account/entities/user-account.entity';

@ApiTags('Likes')
@Controller('likes')
export class LikeController extends BaseController {
	constructor(
		@Inject(DIToken.LIKE_SERVICE_INTERFACE)
		private readonly likeService: LikeServiceInterface
	) {
		super();
	}

	@SwaggerRouteDecorator({
		apiBodyData: {
			type: OmitType(createLikeDto, ['userId'] as const)
		},
		apiResponseData: { status: 200, type: createLikeDto },
		apiSecurityData: 'accessToken'
	})
	@Post(':postId')
	create(@Param() postId: createLikeDto, @User() user: UserAccountEntity) {
		return this.likeService.createLike(postId, user);
	}

	@SwaggerRouteDecorator({
		apiResponseData: { status: 200, type: createLikeDto },
		apiSecurityData: 'accessToken'
	})
	@Get(':postId')
	getAll(@Param('postId') postId: number) {
		return this.likeService.getAllLike(postId);
	}
}
