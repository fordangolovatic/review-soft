import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DIToken } from '@core/constants/enums/ditoken.enum';
import { UserAccountEntity } from '@modules/user/user-account/entities/user-account.entity';
import { FavoriteArtilcesServiceService } from './favorite-artilce.service';
import { FavoriteArticlesRepository } from './repository/favorite-article.repostory';
import { FavoriteArticlesController } from './favorite-article.controller';
import { FavoriteArticleEntity } from './entities/favorite-article.entity';
import { ArticleEntity } from '@modules/articles/entities/article.entity';

@Module({
	imports: [
		TypeOrmModule.forFeature([
			FavoriteArticleEntity,
			ArticleEntity,
			UserAccountEntity
		])
	],
	providers: [
		{
			provide: DIToken.FAVORITE_ARTICLES_SERVICE_INTERFACE,
			useClass: FavoriteArtilcesServiceService
		},
		{
			provide: DIToken.FAVORITE_ARTICLES_REPOSITORY_INTERFACE,
			useClass: FavoriteArticlesRepository
		}
	],
	controllers: [FavoriteArticlesController]
})
export class FavoriteArticlesModule {}
