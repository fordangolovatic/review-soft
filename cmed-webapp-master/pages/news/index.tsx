import { Typography } from '@mui/material';
import { GetStaticProps, NextPage } from 'next';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import React, { useMemo } from 'react';
import { useArticlesQuery } from '../../api/hooks/articles';
import { useFavoriteArticlesQuery } from '../../api/hooks/favorite-articles';
import { ArticlesLayout } from '../../components/articles/ArticlesLayout';
import { ArticlesList } from '../../components/articles/ArticlesList';
import { ArticlesSkeleton } from '../../components/articles/ArticlesSkeleton';
import { SkeletonCollection } from '../../components/SkeletonCollection';
import { useGlobalState } from '../../utilities/global-state';

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(
        locale || '',
        ['common', 'homePage', 'articles'],
        null,
        ['en'],
      )),
    },
  };
};

const News: NextPage = () => {
  const { isLoggedIn } = useGlobalState();
  const { data: articles, isLoading: isLoadingArticles } = useArticlesQuery('news');
  const { data: favoriteArticle } = useFavoriteArticlesQuery({
    enabled: isLoggedIn,
  });
  const { t } = useTranslation('articles');

  const errorMessage = useMemo(() => {
    return !isLoadingArticles && articles?.length
      ? ''
      : ' Sorry, there are no results that match your selected filters. Please try\n' +
          '            again with different filters.';
  }, [articles?.length, isLoadingArticles]);

  const reversedArticles = useMemo(() => {
    if (articles?.length) {
      return articles.reverse();
    }

    return [];
  }, [articles]);

  return (
    <ArticlesLayout>
      <SkeletonCollection
        isLoading={isLoadingArticles}
        skeleton={<ArticlesSkeleton />}
        errorMessage={errorMessage}
      >
        <Typography color="primary" variant={'h4'}>
          {t('newsTitle')}
        </Typography>

        <Typography color="secondary.black" variant={'subtitle1'}>
          {t('newsSubtitle')}
        </Typography>

        <ArticlesList
          articles={reversedArticles}
          favorites={favoriteArticle}
          pageType="news"
        />
      </SkeletonCollection>
    </ArticlesLayout>
  );
};

export default News;
