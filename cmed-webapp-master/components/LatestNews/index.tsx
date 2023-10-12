import { Box, Stack, Typography } from '@mui/material';
import { useTranslation } from 'next-i18next';
import { FC, useMemo, useState } from 'react';
import { useArticlesQuery } from '../../api/hooks/articles';
import { SkeletonCollection } from '../SkeletonCollection';
import { NewsCard } from './components';
import NewsSkeleton from './components/NewsSkeleton';

const LatestNews: FC = () => {
  const { t } = useTranslation('common');
  const { data: articles, isLoading: isArticlesLoading } = useArticlesQuery();
  const [articleSlide, setArticleSlide] = useState<number>(0);
  const articleShow = useMemo(
    () =>
      articles && articles.length
        ? articles.slice(articleSlide, articleSlide + 3)
        : [],
    [articles, articleSlide],
  );

  const hasArticles = (articleShow?.length ?? 0) > 0;

  const articleSlideHandler = (bubbleId: number) => {
    if (bubbleId === 0) return setArticleSlide(0);

    setArticleSlide(bubbleId * 3);
  };

  return (
    <SkeletonCollection isLoading={isArticlesLoading} skeleton={<NewsSkeleton />}>
      <Stack spacing={'30px'}>
        <Typography color={'primary'} variant={'h4'}>
          {t('o-latestNews')}
        </Typography>
        <Stack spacing={'30px'} direction={'row'}>
          {hasArticles ? (
            articleShow.map((article) => (
              <NewsCard key={article.articleId} article={article} />
            ))
          ) : (
            <Typography variant={'body2'} color={'#818181'}>
              {t('o-noLatestNews')}
            </Typography>
          )}
        </Stack>

        <Stack direction={'row'} justifyContent={'center'} spacing={'3px'}>
          {hasArticles &&
            articleShow.map((_, i) => (
              <Box
                key={i}
                component={'span'}
                sx={{
                  backgroundColor: articleSlide / 3 === i ? '#21524C' : '#00A04A',
                  width: '10px',
                  height: '10px',
                  borderRadius: '50px',
                  cursor: 'pointer',
                }}
                onClick={() => articleSlideHandler(i)}
              />
            ))}
        </Stack>
      </Stack>
    </SkeletonCollection>
  );
};

export default LatestNews;
