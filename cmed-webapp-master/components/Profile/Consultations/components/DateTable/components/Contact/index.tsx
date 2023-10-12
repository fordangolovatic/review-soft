import { ArrowDropDownOutlined, ArrowDropUpOutlined } from '@mui/icons-material';
import { Button, Stack } from '@mui/material';
import dayjs from 'dayjs';
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';
import { FC, useMemo, useState } from 'react';
import { useUpdateConsultationMutation } from '../../../../../../../api/hooks/consultations';
import { Metadata } from '../../../../../../../api/hooks/metadata/useMetadataQuery';
import {
  Consultation,
  ConsultationStatusEnum,
} from '../../../../../../../api/types/consultations/consultations';
import { useToast } from '../../../../../../../utilities/hooks/useToast';
import { useSendMessageMutation } from '../../../../../Message/hooks';
import ChatOptions from '../ChatOptions';
import { ConfirmedButtons, PatientButtons, PendingButtons } from '../ControlButtons';

interface ContactProps {
  consultation: Consultation;
  metadata?: Metadata;
}
export const Contact: FC<ContactProps> = ({ consultation, metadata }) => {
  const router = useRouter();

  const { t } = useTranslation('profile');
  const { notifySuccess } = useToast();
  const [showOptions, setShowOptions] = useState<boolean>(false);

  const { mutate: sendMessageMutation } = useSendMessageMutation({
    onSuccess: () => {
      notifySuccess('Chat conversation created');

      router.push('profile?tab=messages');
    },
  });
  const { mutate: updateConsultation } = useUpdateConsultationMutation();

  const doctorControlButtons = useMemo(() => {
    switch (consultation.consultationStatus.toLowerCase()) {
      case ConsultationStatusEnum.PENDING:
        return <PendingButtons consultation={consultation} />;

      case ConsultationStatusEnum.CONFIRMED:
        return <ConfirmedButtons consultation={consultation} />;
    }
  }, [consultation]);

  const patientControlButtons = useMemo(() => {
    const currentStatus = consultation.consultationStatus.toLowerCase();

    if (
      currentStatus === ConsultationStatusEnum.PENDING ||
      currentStatus === ConsultationStatusEnum.CONFIRMED
    )
      return <PatientButtons consultation={consultation} />;
  }, [consultation]);

  const chatHandler = () => {
    if (!metadata) return;

    updateConsultation({
      ...consultation,
      chatStartTime: dayjs().toISOString(),
      chatEndTime: dayjs().add(7, 'days').toISOString(),
    });

    sendMessageMutation({
      from: metadata.userId,
      to:
        metadata.accountType === 'doctor'
          ? Number(consultation.patientId)
          : Number(consultation.doctorId),
      content: 'Consultation contact',
      subject: `Consultation ${consultation.consultationSessionId}`,
      consultationId: consultation.consultationSessionId,
    });
  };

  return (
    <Stack spacing={'15px'} justifyContent={'space-between'}>
      <Stack spacing={'5px'}>
        <Button
          variant={'contained'}
          color={'secondary'}
          onClick={chatHandler}
          endIcon={
            consultation.chatStartTime &&
            metadata?.accountType === 'doctor' && (
              <Stack
                onClick={(e) => {
                  e.stopPropagation();
                  setShowOptions(!showOptions);
                }}
              >
                {!showOptions && <ArrowDropDownOutlined fontSize={'small'} />}
                {showOptions && <ArrowDropUpOutlined fontSize={'small'} />}
              </Stack>
            )
          }
        >
          {t('c-chat')}
        </Button>

        {showOptions && (
          <ChatOptions
            consultation={consultation}
            close={() => setShowOptions(false)}
          />
        )}

        <Button variant={'contained'} color={'darkGreen'}>
          {t('c-meeting')}
        </Button>
      </Stack>

      {metadata?.accountType === 'doctor' && doctorControlButtons}

      {metadata?.accountType === 'patient' && patientControlButtons}
    </Stack>
  );
};
