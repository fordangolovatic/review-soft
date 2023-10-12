import { Box, Stack, Typography } from '@mui/material';
import { useTranslation } from 'next-i18next';
import { FC, useCallback } from 'react';
import { useMedicalRecordQuery } from '../../../../../api/hooks/medical-record';
import { SkeletonCollection } from '../../../../SkeletonCollection';
import { STextFieldInput } from '../../../styled';
import { FormikProps } from '../../types';
import { MedicalSkeleton } from '../MedicalSkeleton';

type BodyParamsProps = FormikProps;

const BodyParams: FC<BodyParamsProps> = ({
  values,
  setFieldValue,
}: BodyParamsProps) => {
  const { t } = useTranslation('profile');
  const { isLoading: isLoadingMedicalRecord } = useMedicalRecordQuery();

  const handleWeightChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const newWeight = Math.max(0, Number(e.target.value));
      setFieldValue?.('weight', newWeight);
    },
    [setFieldValue],
  );

  const handleHeightChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const newHeight = Math.max(0, Number(e.target.value));
      setFieldValue?.('height', newHeight);
    },
    [setFieldValue],
  );

  return (
    <SkeletonCollection
      isLoading={isLoadingMedicalRecord}
      skeleton={<MedicalSkeleton />}
    >
      <Box>
        <Typography variant={'subtitle1'}>{t('md-bodyParams')}</Typography>
        <Typography
          mb={{ sm: '12px', xl: '20px' }}
          color={'#828282'}
          variant={'body1'}
        >
          {t('md_bodyParams')}
        </Typography>
        <Stack direction={'row'} spacing={{ sm: '15px', xl: '20px' }}>
          <Stack spacing={'10px'} width={'100%'}>
            <Typography variant={'body2'} color={'secondary.dark'}>
              Weight
            </Typography>
            <STextFieldInput
              name="weight"
              placeholder={'Weight'}
              value={Number(values.weight)}
              onChange={handleWeightChange}
              onWheel={(e) => (e.target as HTMLElement).blur()}
              type={'number'}
            />
          </Stack>
          <Stack spacing={'10px'} width={'100%'}>
            <Typography variant={'body2'} color={'secondary.dark'}>
              Height
            </Typography>
            <STextFieldInput
              name="height"
              placeholder={'Height'}
              value={Number(values.height)}
              onChange={handleHeightChange}
              onWheel={(e) => (e.target as HTMLElement).blur()}
              type={'number'}
            />
          </Stack>
        </Stack>
      </Box>
    </SkeletonCollection>
  );
};

export default BodyParams;
