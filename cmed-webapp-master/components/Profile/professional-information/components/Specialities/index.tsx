import {
  FormControl,
  MenuItem,
  Select,
  SelectChangeEvent,
  Stack,
  Typography,
  useTheme,
} from '@mui/material';
import { useTranslation } from 'next-i18next';
import React, { FC, useCallback } from 'react';
import { useProfessionalInformationQuery } from '../../../../../api/hooks/professional-information';
import { Specialities as SpecialitiesData } from '../../../../../utilities/data';
import { SkeletonCollection } from '../../../../SkeletonCollection';
import { FormikProps } from '../../../personal-information/components/full-name/FullName';
import { TextFieldSkeleton } from './TextFieldSkeleton';

type SpecialitiesProps = FormikProps;

export const Specialities: FC<SpecialitiesProps> = ({ values, setFieldValue }) => {
  const { t } = useTranslation('common');
  const theme = useTheme();

  const { isLoading: isLoadingProfessionalInformation } =
    useProfessionalInformationQuery();

  const onChangeHandler = useCallback(
    (event: SelectChangeEvent) => {
      const specialities = event.target.value;
      setFieldValue?.('specialities', specialities);
    },
    [setFieldValue],
  );

  return (
    <SkeletonCollection
      skeleton={<TextFieldSkeleton />}
      isLoading={isLoadingProfessionalInformation}
    >
      <FormControl fullWidth>
        <Stack
          width={'100%'}
          spacing={'10px'}
          sx={{
            '& .MuiOutlinedInput-notchedOutline': {
              border: 'none',
            },
            '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline':
              {
                border: 'none',
              },
            [theme.breakpoints.up('sm')]: {
              '& #grouped-demo': {
                padding: '12px 14px',
              },
            },
            [theme.breakpoints.up('xl')]: {
              '& #grouped-demo': {
                padding: '20px',
              },
            },
          }}
        >
          <Typography variant={'body1'} color={'secondary.dark'}>
            {t('specialities')}
          </Typography>
          <Select
            multiple
            value={values.specialities}
            onChange={onChangeHandler}
            sx={{
              '& .MuiInputBase-input': {
                padding: '13px',
              },
              '& .MuiSelect-select': {
                height: '1.5vw',
                borderRadius: '5px',
                minHeight: 'auto',
                backgroundColor: '#EFEFEF',
              },
              '& .MuiAutocomplete-inputRoot': {
                padding: '0 !important',
              },
            }}
          >
            {SpecialitiesData.items.map((item) => (
              <MenuItem key={item.id} value={item.id}>
                {item.label}
              </MenuItem>
            ))}
          </Select>
        </Stack>
      </FormControl>
    </SkeletonCollection>
  );
};
