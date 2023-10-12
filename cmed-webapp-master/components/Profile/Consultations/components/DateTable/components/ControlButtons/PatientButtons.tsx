import { Button, Stack } from '@mui/material';
import { useQueryClient } from '@tanstack/react-query';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { useUpdateConsultationMutation } from '../../../../../../../api/hooks/consultations';
import { useMetadataQuery } from '../../../../../../../api/hooks/metadata';
import {
  Consultation,
  ConsultationStatusEnum,
} from '../../../../../../../api/types/consultations/consultations';
import { useToast } from '../../../../../../../utilities/hooks/useToast';

interface PatientButtonsProps {
  consultation: Consultation;
}

export const PatientButtons: FC<PatientButtonsProps> = ({ consultation }) => {
  const queryClient = useQueryClient();
  const { t } = useTranslation('profile');
  const { data: metadata } = useMetadataQuery();
  const { notifySuccess, notifyError } = useToast();

  const { mutate: updateConsultationStatus } = useUpdateConsultationMutation({
    onSuccess: () => {
      notifySuccess('Changed the consultation status');
      queryClient.invalidateQueries(['consultation']);
    },
    onError: () => {
      notifyError('Failed to change the consultation status');
      queryClient.invalidateQueries(['consultation']);
    },
  });

  const handleStatusChange = () => {
    updateConsultationStatus({
      ...consultation,
      consultationStatus: ConsultationStatusEnum.CANCELLED,
      cancelledBy: metadata?.userId,
    });
  };

  return (
    <Stack spacing={'5px'}>
      <Button
        variant={'outlined'}
        color={'primary'}
        onClick={() => handleStatusChange()}
      >
        {t('common:b-cancel')}
      </Button>
    </Stack>
  );
};
