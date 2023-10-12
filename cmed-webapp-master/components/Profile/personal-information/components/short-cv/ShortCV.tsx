import { Box, Stack, Typography } from '@mui/material';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { useAccountQuery } from '../../../../../api/hooks/account';
import { SkeletonCollection } from '../../../../SkeletonCollection';
import TextFieldInput from '../../../UI/Input/TextFieldInput';
import { FormikProps } from '../full-name/FullName';
import ShortCVSkeleton from './ShortCVSkeleton';

type ShortCVProps = FormikProps;

const ShortCV: FC<ShortCVProps> = ({ values, handleChange, handleBlur }) => {
  const { t } = useTranslation('profile');
  const translations = {
    shortCV: t('pI-shortCV'),
    _shortCV: t('pI-_shortCV'),
  };

  const { isLoading: isLoadingAccount } = useAccountQuery();

  return (
    <SkeletonCollection isLoading={isLoadingAccount} skeleton={<ShortCVSkeleton />}>
      <Box pb={1}>
        <Typography variant={'subtitle1'}>{translations.shortCV}</Typography>
        <Typography
          mb={{ sm: '12px', xl: '20px' }}
          color={'#828282'}
          variant={'body1'}
        >
          {translations._shortCV}
        </Typography>
        <Stack direction={'row'} spacing={{ sm: '15px', xl: '20px' }}>
          <TextFieldInput
            name="description"
            label={'Description'}
            multiline
            value={values?.description}
            onChange={handleChange}
            onBlur={handleBlur}
          />
        </Stack>
      </Box>
    </SkeletonCollection>
  );
};

export default ShortCV;
