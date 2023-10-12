import { List, Stack, Typography } from '@mui/material';
import { useTranslation } from 'next-i18next';
import { FC, ReactNode } from 'react';

interface FiltersCollectionProps {
  children?: ReactNode;
  title?: string;
  subtitle?: string;
}

export const FiltersCollection: FC<FiltersCollectionProps> = ({
  children,
  title,
  subtitle,
}) => {
  // const { t } = useTranslation('articles');

  return (
    <Stack id={'filter-collection'} direction={'row'} spacing={'15px'}>
      <Stack sx={{ width: '204px' }}>
        <Typography mb={'20px'} variant={'subtitle1'}>
          {title} <br />
          <Typography variant={'subtitle1'} component={'span'} color={'error'}>
            {subtitle}
          </Typography>
        </Typography>
        <List component="nav" sx={{ paddingBottom: '0' }}>
          {children}
        </List>
      </Stack>
    </Stack>
  );
};
