import { Button, Stack } from '@mui/material';
import { useTranslation } from 'next-i18next';
import React, { FC } from 'react';
import useCustomTheme from '../../../../utilities/hooks/useTheme';

interface CategoryProps {
  onClick: (id: number) => void;
  selected: number;
}
const Category: FC<CategoryProps> = ({ onClick, selected }) => {
  const { t } = useTranslation('homePage');
  const { theme } = useCustomTheme();
  return (
    <Stack
      direction={'row'}
      sx={{
        [theme.breakpoints.down('sm')]: {
          marginBottom: '50px',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '20px',
          '& .MuiButton-root': {
            padding: '10px 20px',
            flex: 'initial',
            borderRadius: '30px',
          },
        },
        maxWidth: { sm: '550px', xl: '656px' },
        width: '100%',
        mt: { sm: '15px', xl: '36px' },
        mb: { sm: '36px', xl: '63px' },
      }}
    >
      <Button
        onClick={() => onClick(1)}
        variant={selected === 1 ? 'contained' : 'outlined'}
        sx={{
          padding: { sm: '13px 0px' },
          flex: '1',
          borderRadius: '5px',
          borderBottomRightRadius: '0px',
          borderTopRightRadius: '0px',
        }}
      >
        {t('consultationsTitle')}
      </Button>
      <Button
        onClick={() => onClick(2)}
        variant={selected === 2 ? 'contained' : 'outlined'}
        sx={{ padding: { sm: '13px 0px' }, flex: '1', borderRadius: '0' }}
      >
        {t('freequestion')}
      </Button>
      <Button
        onClick={() => onClick(3)}
        variant={selected === 3 ? 'contained' : 'outlined'}
        sx={{
          padding: { sm: '13px 0px' },
          flex: '1',
          borderRadius: '5px',
          borderBottomLeftRadius: '0px',
          borderTopLeftRadius: '0px',
        }}
      >
        {t('analyses')}
      </Button>
    </Stack>
  );
};

export default Category;
