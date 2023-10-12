import { ApiTags } from '@nestjs/swagger';
import {
	Body,
	Controller,
	Delete,
	Get,
	Inject,
	Param,
	Post
} from '@nestjs/common';
import { DIToken } from '@core/enums/ditoken.enum';
import { UserAccountEntity } from '@modules/user/user-account/entities/user-account.entity';
import { User } from '@core/decorators/user.decorator';
import { SwaggerRouteDecorator } from '@modules/decorators/swagger.config';
import { FavoriteArticlesServiceInterface } from './interface/favorite-article.service.interface';
import { CreateFavoriteArtilceDto } from './dto/create-favorite-artilce.dto';

@ApiTags('Favorite Articles')
@Controller('favorite-articles')
export class FavoriteArticlesController {
	constructor(
		@Inject(DIToken.FAVORITE_ARTICLES_SERVICE_INTERFACE)
		private readonly favoriteArticlesService: FavoriteArticlesServiceInterface
	) {}

	@Get('')
	findAll(@User() user: UserAccountEntity) {
		return this.favoriteArticlesService.getAll(user);
	}

	@SwaggerRouteDecorator({
		apiBodyData: {
			type: CreateFavoriteArtilceDto
		},
		apiResponseData: { status: 201, type: CreateFavoriteArtilceDto },
		apiSecurityData: 'accessToken'
	})
	@Post('add')
	public async create(
		@Body() data: CreateFavoriteArtilceDto,
		@User() user: UserAccountEntity
	) {
		return await this.favoriteArticlesService.createFavoriteArticle(
			data,
			user
		);
	}

	@SwaggerRouteDecorator({
		apiResponseData: { status: 204 },
		apiSecurityData: 'accessToken'
	})
	@Delete('remove/:id')
	remove(@Param('id') id: number) {
		return this.favoriteArticlesService.delete(+id);
	}
}
