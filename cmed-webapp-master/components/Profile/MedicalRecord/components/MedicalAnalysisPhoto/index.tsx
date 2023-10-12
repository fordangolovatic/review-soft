import { Stack, Typography } from '@mui/material';
import { useTranslation } from 'next-i18next';
import { FC } from 'react';
import { SkeletonCollection } from '../../../../SkeletonCollection';
import UploadInput from '../../../UI/Input/UploadInput';
import { FormikProps } from '../../types';
import { MedicalSkeleton } from '../MedicalSkeleton';

type MedicalAnalysisPhotoProps = FormikProps;

const MedicalAnalysisPhoto: FC<MedicalAnalysisPhotoProps> = ({
  isLoading,
}: MedicalAnalysisPhotoProps) => {
  const { t } = useTranslation('profile');

  return (
    <SkeletonCollection isLoading={isLoading} skeleton={<MedicalSkeleton />}>
      <Stack>
        <Typography variant={'subtitle1'}>{t('md-medicalPhoto')}</Typography>
        <Typography
          mb={{ sm: '12px', xl: '20px' }}
          color={'#828282'}
          variant={'body1'}
        >
          {t('md_medicalPhoto')}
        </Typography>
        <UploadInput accept={'image/*'} />
      </Stack>
    </SkeletonCollection>
  );
};

export default MedicalAnalysisPhoto;
