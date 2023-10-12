import { UserAccountEntity } from '../entities/user-account.entity';

const compareFavoriteArticles = (
	first: UserAccountEntity,
	second: UserAccountEntity
) => {
	let secondFavoriteArticles = 0;
	let firstFavoriteArticles = 0;

	second.article.map(
		article => (secondFavoriteArticles += article.favoriteArticle.length)
	);
	first.article.map(
		article => (firstFavoriteArticles += article.favoriteArticle.length)
	);

	return secondFavoriteArticles - firstFavoriteArticles;
};

const compareRating = (first: UserAccountEntity, second: UserAccountEntity) => {
	return second.rating.rate - first.rating.rate;
};

export { compareFavoriteArticles, compareRating };
