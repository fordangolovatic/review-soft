import { Box, Stack } from '@mui/material';
import { useTranslation } from 'next-i18next';
import { FC, ReactNode } from 'react';
import { Breadcrumb } from '../../Breadcrumb';
import { FiltersCollection } from '../../Departments';
import { LanguagesFilter } from '../../FiltersCollection/components/LanguagesFilter';
import { SpecialitiesFilter } from '../../FiltersCollection/components/SpecialitiesFilter';
import LatestNews from '../../LatestNews';
import { CustomContainer } from '../../MuiCustom';
import { PageWrapper } from '../../PageWrapper';

interface ArticlesLayoutProps {
  children: ReactNode;
}

export const ArticlesLayout: FC<ArticlesLayoutProps> = ({ children }) => {
  const { t } = useTranslation('articles');

  return (
    <PageWrapper>
      <CustomContainer>
        <Box my={'35px'}>
          <Breadcrumb />
        </Box>
        <Stack direction={'row'} spacing={'40px'}>
          <FiltersCollection
            title={t<string>('filterTitleOne')}
            subtitle={t<string>('filterTitleTwo')}
          >
            <>
              <SpecialitiesFilter />
              <LanguagesFilter />
            </>
          </FiltersCollection>
          <Box flex={1}>{children}</Box>
        </Stack>
        <LatestNews />
      </CustomContainer>
    </PageWrapper>
  );
};
