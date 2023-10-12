import { Button, Stack, Typography } from '@mui/material';
import { FC, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  useAddFavoriteArticleMutation,
  useFavoriteArticlesQuery,
  useRemoveFavoriteArticleMutation,
} from '../../../../api/hooks/favorite-articles';
import { useGlobalState } from '../../../../utilities/global-state';
import { Articles } from '../../Doctors/types';
import DoctorArticle from './components/DoctorArticle';

interface ArticleProps {
  name: string;
  articles: Articles[];
}

const DEFAULT_ARTICLE_LIMIT = 5;

const Articles: FC<ArticleProps> = ({ name, articles }) => {
  const { t } = useTranslation();
  const { isLoggedIn } = useGlobalState();

  const { data: favorite } = useFavoriteArticlesQuery({ enabled: isLoggedIn });
  const { mutate: addFavoriteArticle } = useAddFavoriteArticleMutation();
  const { mutate: removeFavoriteArticle } = useRemoveFavoriteArticleMutation();

  const [showLimit, setShowLimit] = useState<number>(DEFAULT_ARTICLE_LIMIT);
  const showMore = useMemo(
    () => articles && articles.length - showLimit > DEFAULT_ARTICLE_LIMIT,
    [showLimit, articles],
  );

  const onMoreHandler = (): void => {
    const newLimit = showLimit + DEFAULT_ARTICLE_LIMIT;
    setShowLimit(
      articles.length - newLimit < DEFAULT_ARTICLE_LIMIT
        ? articles.length
        : newLimit,
    );
  };

  const favoriteHandler = (articleId: number) => {
    const alreadyFavorite = favorite?.find(
      (favoriteArticle) => favoriteArticle.article.articleId === articleId,
    );

    alreadyFavorite
      ? removeFavoriteArticle(alreadyFavorite.favoriteArticleId)
      : addFavoriteArticle(parseInt(articleId.toString()));
  };

  return (
    <Stack flex={1} spacing={{ sm: '15px', xl: '20px' }}>
      <Typography variant={'h4'} color={'secondary.dark'}>
        {name} Articles
      </Typography>

      {articles.length > 0 ? (
        <Stack>
          <Stack spacing={'15px'}>
            {articles.slice(0, showLimit).map((article, i) => (
              <DoctorArticle
                key={i}
                article={article}
                favoriteArticles={favorite}
                favoriteHandler={favoriteHandler}
              />
            ))}
          </Stack>

          {showMore && (
            <Button
              sx={{
                width: 'fit-content',
                padding: '15px 50px',
                marginTop: '30px !important',
              }}
              variant={'outlined'}
              color={'primary'}
              onClick={onMoreHandler}
            >
              {t('b-showMore')}
            </Button>
          )}
        </Stack>
      ) : (
        <Typography variant={'body2'} color={'#818181'}>
          {t('b-noArticles')}
        </Typography>
      )}
    </Stack>
  );
};

export default Articles;
