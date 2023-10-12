import { Grid, Stack, Typography } from '@mui/material';
import React, { FC } from 'react';
import { useArticlesQuery } from '../../api/hooks/articles';
import { Card } from './components';

const RelatedTopics: FC = () => {
  const { data: articles } = useArticlesQuery();

  return (
    <Stack spacing={{ sm: '30px', xl: '45px' }}>
      <Typography variant={'h4'}>Related Topics</Typography>

      <Stack>
        <Grid spacing={'30px'} container>
          {articles &&
            articles.slice(0, 3).map((article) => (
              <Grid item xs={4} key={article.articleId}>
                <Card article={article} />
              </Grid>
            ))}
        </Grid>
      </Stack>
    </Stack>
  );
};

export default RelatedTopics;
