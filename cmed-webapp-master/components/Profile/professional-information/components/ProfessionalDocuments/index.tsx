import { Stack } from '@mui/material';
import { useTranslation } from 'next-i18next';
import React, { FC } from 'react';
import { useProfessionalInformationQuery } from '../../../../../api/hooks/professional-information';
import { SkeletonCollection } from '../../../../SkeletonCollection';
import UploadInput from '../../../UI/Input/UploadInput';
import { TextFieldSkeleton } from '../Specialities/TextFieldSkeleton';

const ProfessionalDocuments: FC = () => {
  const { t } = useTranslation('profile');
  const { isLoading: isLoadingProfessionalInformation } =
    useProfessionalInformationQuery();

  return (
    <SkeletonCollection
      skeleton={<TextFieldSkeleton />}
      isLoading={isLoadingProfessionalInformation}
    >
      <Stack>
        <UploadInput
          limit={2}
          accept={'image/*'}
          label={t('px-professionalDocuments') as string}
        />
      </Stack>
    </SkeletonCollection>
  );
};

export default ProfessionalDocuments;
