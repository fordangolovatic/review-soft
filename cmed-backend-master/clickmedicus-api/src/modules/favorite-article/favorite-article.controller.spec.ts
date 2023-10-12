import { Test, TestingModule } from '@nestjs/testing';
import { FavoriteArticlesController } from './favorite-article.controller';

describe('FavoriteArticleControllerController', () => {
	let controller: FavoriteArticlesController;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			controllers: [FavoriteArticlesController]
		}).compile();

		controller = module.get<FavoriteArticlesController>(
			FavoriteArticlesController
		);
	});

	it('should be defined', () => {
		expect(controller).toBeDefined();
	});
});
