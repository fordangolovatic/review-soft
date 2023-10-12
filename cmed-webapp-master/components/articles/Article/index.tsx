import { Box, Stack } from '@mui/material';
import React, { FC, ReactNode } from 'react';
import { Article as ArticleType } from '../../../api/types/articles';
import { Breadcrumb } from '../../Breadcrumb';
import { InfoSidebar, PageWrapper } from '../../index';
import { CustomContainer } from '../../MuiCustom';
import RelatedTopics from '../../RelatedTopics';

interface ArticleProps {
  children: ReactNode;
  article?: ArticleType;
}

export const Article: FC<ArticleProps> = ({ children, article }) => {
  return (
    <PageWrapper>
      <CustomContainer>
        <Box m={'40px 0px 30px 0px'}>
          <Breadcrumb />
        </Box>
        <Stack direction={'row'} spacing={{ sm: '150px' }}>
          <InfoSidebar article={article} />
          <Box flex={1}>{children}</Box>
        </Stack>
        <RelatedTopics />
      </CustomContainer>
    </PageWrapper>
  );
};
