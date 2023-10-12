import { Button, Stack } from '@mui/material';
import { useQueryClient } from '@tanstack/react-query';
import { useTranslation } from 'next-i18next';
import { FC } from 'react';
import { useUpdateConsultationMutation } from '../../../../../../../api/hooks/consultations';
import { useMetadataQuery } from '../../../../../../../api/hooks/metadata';
import { ConsultationStatusEnum } from '../../../../../../../api/types/consultations/consultations';
import { useToast } from '../../../../../../../utilities/hooks/useToast';
import { ControlButtonProps } from '.';

export const PendingButtons: FC<ControlButtonProps> = ({ consultation }) => {
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

  const handleStatusChange = (status: ConsultationStatusEnum) => {
    updateConsultationStatus({
      ...consultation,
      consultationStatus: status,
      ...(status === ConsultationStatusEnum.CANCELLED &&
        metadata && { cancelledBy: metadata.userId }),
    });
  };

  return (
    <Stack spacing={'5px'}>
      <Button
        variant={'outlined'}
        color={'primary'}
        onClick={() => handleStatusChange(ConsultationStatusEnum.CANCELLED)}
      >
        {t('common:b-cancel')}
      </Button>
      <Button
        variant={'outlined'}
        color={'secondary'}
        onClick={() => handleStatusChange(ConsultationStatusEnum.CONFIRMED)}
      >
        {t('common:b-confirm')}
      </Button>
    </Stack>
  );
};
