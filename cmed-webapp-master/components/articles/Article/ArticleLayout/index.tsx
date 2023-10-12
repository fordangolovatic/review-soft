import { Box, Stack } from '@mui/material';
import React, { FC, ReactNode } from 'react';
import { Article } from '../../../../api/types/articles';
import { Breadcrumb } from '../../../Breadcrumb';
import InfoSidebar from '../../../InfoSidebar';
import { CustomContainer } from '../../../MuiCustom';
import { PageWrapper } from '../../../PageWrapper';
import RelatedTopics from '../../../RelatedTopics';

interface ArticleLayoutProps {
  children: ReactNode;
  article?: Article;
}

const ArticleLayout: FC<ArticleLayoutProps> = ({ children, article }) => {
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

export default ArticleLayout;
