import { BaseController } from '@base/controller/base.controller';
import { DIToken } from '@core/constants/enums/ditoken.enum';
import { NoAuthRoute } from '@core/decorators/noauth.decorator';
import { User } from '@core/decorators/user.decorator';
import { SwaggerRouteDecorator } from '@modules/decorators/swagger.config';
import { UserAccountEntity } from '@modules/user/user-account/entities/user-account.entity';
import {
	Body,
	Controller,
	Delete,
	Get,
	Inject,
	Param,
	Patch,
	Post
} from '@nestjs/common';
import { ApiTags, OmitType } from '@nestjs/swagger';
import { ArticleResponse } from './dto/article.response.dto';
import { ArticlesResponse } from './dto/articles.response.dto';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
import { ArticleServiceInterface } from './interfaces/article.service.interface';

@ApiTags('Articles')
@Controller('articles')
export class ArticlesController extends BaseController {
	constructor(
		@Inject(DIToken.ARTICLE_SERVICE_INTERFACE)
		private readonly articleService: ArticleServiceInterface
	) {
		super();
	}

	@SwaggerRouteDecorator({
		apiBodyData: {
			type: OmitType(CreateArticleDto, ['createdBy'] as const)
		},
		apiResponseData: { status: 200, type: ArticleResponse },
		apiSecurityData: 'accessToken'
	})
	@Post()
	create(@Body() body: CreateArticleDto, @User() user: UserAccountEntity) {
		return this.articleService.createArticle(body, user);
	}

	@SwaggerRouteDecorator({
		apiResponseData: { status: 200, type: ArticlesResponse, isArray: true },
		apiSecurityData: 'accessToken'
	})
	@Get()
	@NoAuthRoute()
	getAll() {
		return this.articleService.getAllArticle();
	}

	@SwaggerRouteDecorator({
		apiResponseData: { status: 200, type: ArticleResponse, isArray: true },
		apiSecurityData: 'accessToken'
	})
	@Get('me')
	getUserArticles(@User() user: UserAccountEntity) {
		return this.articleService.getUserArticles(user);
	}

	@SwaggerRouteDecorator({
		apiResponseData: { status: 200, type: ArticleResponse },
		apiSecurityData: 'accessToken'
	})
	@Get(':id')
	@NoAuthRoute()
	findOne(@Param('id') id: number) {
		return this.articleService.getById(+id);
	}

	@SwaggerRouteDecorator({
		apiResponseData: { status: 200 },
		apiSecurityData: 'accessToken',
		apiBodyData: { type: UpdateArticleDto }
	})
	@Patch(':id')
	update(
		@Param('id') id: number,
		@Body() updateArticleDto: UpdateArticleDto,
		@User() user: UserAccountEntity
	) {
		return this.articleService.updateById(
			+id,
			updateArticleDto,
			user.userId
		);
	}

	@SwaggerRouteDecorator({
		apiResponseData: { status: 204 },
		apiSecurityData: 'accessToken'
	})
	@Delete(':id')
	remove(@Param('id') id: number, @User() user: UserAccountEntity) {
		return this.articleService.deleteById(+id, user.userId);
	}
}
