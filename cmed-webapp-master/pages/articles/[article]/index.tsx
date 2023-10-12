import { Typography } from '@mui/material';
import { GetServerSideProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useRouter } from 'next/router';
import React from 'react';
import { useArticlesGetByIdQuery } from '../../../api/hooks/articles';
import ArticleLayout from '../../../components/articles/Article/ArticleLayout';
import { ArticlePage } from '../../../components/articles/Article/ArticlePage';

export const getServerSideProps: GetServerSideProps = async ({ locale }) => {
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

const Article = () => {
  const router = useRouter();
  const { query } = router;
  const { article } = query as { article: string };

  const { data: articleData, isLoading } = useArticlesGetByIdQuery(
    parseInt(article),
  );

  return (
    <ArticleLayout article={articleData}>
      {isLoading && <Typography>Loading...</Typography>}
      {articleData && <ArticlePage {...articleData} />}
    </ArticleLayout>
  );
};

export default Article;
