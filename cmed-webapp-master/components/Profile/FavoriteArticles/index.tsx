import { Divider, Stack, Typography } from '@mui/material';
import { useFavoriteArticlesQuery } from '../../../api/hooks/favorite-articles';
import { useGlobalState } from '../../../utilities/global-state';
import FavoriteArticleCard from '../../articles/Article/FavoriteArticleCard';
import { SkeletonCollection } from '../../SkeletonCollection';
import FavoriteArticleCardSkeleton from './components/FavoriteArticleCardSkeleton';

const FavoriteArticles = () => {
  const { isLoggedIn } = useGlobalState();
  const { data: favoriteArticles, isLoading: isFavoriteArticleLoading } =
    useFavoriteArticlesQuery({ enabled: isLoggedIn });
  const hasArticles = favoriteArticles && favoriteArticles.length > 0;

  return (
    <Stack minWidth={'100%'} minHeight={1040} height={'100%'}>
      <SkeletonCollection
        isLoading={isFavoriteArticleLoading}
        skeleton={<FavoriteArticleCardSkeleton />}
      >
        {hasArticles ? (
          favoriteArticles.map((fArticle) => (
            <Stack
              width={'100%'}
              key={fArticle.favoriteArticleId}
              mt={{ sm: '20px' }}
            >
              <FavoriteArticleCard
                key={fArticle.favoriteArticleId}
                article={fArticle.article}
                favorite={fArticle.favoriteArticleId}
              />
              <Divider sx={{ marginTop: { sm: '20px' } }} flexItem />
            </Stack>
          ))
        ) : (
          <Stack
            width={'100%'}
            height={'100%'}
            justifyContent={'center'}
            alignItems={'center'}
            mt={2}
          >
            <Typography variant={'body2'}>
              Sorry, there are no results for favorite articles.
            </Typography>
          </Stack>
        )}
      </SkeletonCollection>
    </Stack>
  );
};

export default FavoriteArticles;
