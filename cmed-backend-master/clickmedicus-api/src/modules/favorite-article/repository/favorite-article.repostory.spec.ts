import { FavoriteArticlesRepository } from './favorite-article.repostory';

describe('FavoriteArticleRepostory', () => {
	it('should be defined', () => {
		expect(new FavoriteArticlesRepository()).toBeDefined();
	});
});
