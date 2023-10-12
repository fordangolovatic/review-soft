import { Box, Button, Grid, Pagination, Stack } from '@mui/material';
import { useTranslation } from 'next-i18next';
import React, { FC, useMemo, useState } from 'react';
import { useMetadataQuery } from '../../../api/hooks/metadata';
import { ArticleType } from '../../../api/service/article/fetchArticles';
import { Article } from '../../../api/types/articles';
import { FavoriteArticle } from '../../../api/types/favorite-articles';
import { AccountTypeEnum } from '../../Auth/SignUp';
import SortBy from '../../Departments/Doctors/components/SortBy';
import { DisabledWrapper } from '../../QuickActionsMenu/DisabledWrapper';
import { ArticleModal } from '../Article/article-modal/ArticleModal';
import { ArticleCard } from '../Article/ArticleCard';

interface ArticlesProps {
  articles?: Article[];
  favorites?: FavoriteArticle[];
  pageType: ArticleType;
}

export const ArticlesList: FC<ArticlesProps> = ({
  articles,
  favorites,
  pageType,
}) => {
  const { t } = useTranslation('articles');
  const [openModal, setOpenModal] = useState<boolean>(false);
  const { data: metadata } = useMetadataQuery();
  const [page, setPage] = React.useState<number>(1);

  const handleChangePage = (
    event: React.ChangeEvent<unknown>,
    value: number,
  ): void => {
    setPage(value);
  };

  const startArticlesPerPage = page === 1 ? 0 : page * 4 - 3;
  const endArticlesPerPage = page === 1 ? 4 : startArticlesPerPage + 4;

  const filteredArticles = useMemo(
    () => articles?.slice(startArticlesPerPage, endArticlesPerPage) ?? [],
    [articles, startArticlesPerPage, endArticlesPerPage],
  );

  const hasArticles = filteredArticles.length > 0;

  return (
    <Stack>
      <Stack
        direction={'row'}
        justifyContent={'space-between'}
        alignItems={'center'}
      >
        {metadata?.accountType === AccountTypeEnum.DOCTOR &&
          pageType === 'medical' && (
            <Stack
              width={'100%'}
              alignItems={'flex-end'}
              justifyContent={'center'}
              pt={2}
            >
              <Button
                name={'add-article'}
                onClick={() => setOpenModal(true)}
                variant={'contained'}
                color={'darkGreen'}
              >
                {t('articles:addArticle')}
              </Button>
            </Stack>
          )}
      </Stack>

      <Box my={{ sm: '30px', xl: '40px' }}>
        <DisabledWrapper isDisabled>
          <SortBy />
        </DisabledWrapper>
      </Box>

      <Box height={1040}>
        <Grid spacing={{ sm: '20px', xl: '30px' }} container>
          {filteredArticles.map((article) => (
            <Grid item key={article?.articleId} xs={6}>
              <ArticleCard
                article={article}
                favorite={
                  favorites?.find((f) => f.article.articleId === article.articleId)
                    ?.favoriteArticleId
                }
              />
            </Grid>
          ))}
        </Grid>
      </Box>

      {hasArticles && (
        <Stack mt={{ sm: '30px', xl: '40px' }} alignItems={'center'}>
          <Pagination
            count={articles && Math.round(articles.length / 4)}
            onChange={handleChangePage}
            page={page}
            color={'secondary'}
          />
        </Stack>
      )}

      <ArticleModal
        articleType={pageType}
        open={openModal}
        close={() => setOpenModal(false)}
      />
    </Stack>
  );
};
