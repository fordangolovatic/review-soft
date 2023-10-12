import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Button, Stack } from '@mui/material';
import { useQueryClient } from '@tanstack/react-query';
import dayjs from 'dayjs';
import { FC } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { useUpdateConsultationMutation } from '../../../../../../../api/hooks/consultations';
import { Consultation } from '../../../../../../../api/types/consultations/consultations';
import { useToast } from '../../../../../../../utilities/hooks/useToast';
import { chatOptionsSchema } from '../../../../../../../utilities/schemas/chat-options';
import Expiration from './components/Expiration';

export type ChatOptionsFormData = yup.InferType<typeof chatOptionsSchema>;

interface ChatOptionProps {
  consultation: Consultation;
  close?: () => void;
}

const ChatOptions: FC<ChatOptionProps> = ({ consultation, close }) => {
  const queryClient = useQueryClient();
  const { notifySuccess } = useToast();
  const { mutate: updateConsultation } = useUpdateConsultationMutation({
    onSuccess: () => {
      queryClient.invalidateQueries(['consultation']);
      notifySuccess('Updated chat options.');
      close?.();
    },
  });

  const initialValues = {
    expire: dayjs(consultation.chatEndTime).diff(consultation.chatStartTime, 'days'),
  };

  const onSubmit = (values: ChatOptionsFormData) => {
    updateConsultation({
      ...consultation,
      chatEndTime: dayjs(consultation.chatStartTime)
        .add(values.expire, 'days')
        .toISOString(),
    });
  };

  const optionFrom = useForm<ChatOptionsFormData>({
    resolver: yupResolver(chatOptionsSchema),
    defaultValues: initialValues,
  });

  return (
    <form id={'chat-options-form'} onSubmit={optionFrom.handleSubmit(onSubmit)}>
      <Stack alignItems={'center'}>
        <Box
          position={'absolute'}
          width={'20px'}
          height={'20px'}
          zIndex={'99'}
          sx={{ background: '#FFF', transform: 'rotate(45deg)' }}
        />

        <Stack
          mt={'5px'}
          minWidth={'10rem'}
          padding={'20px'}
          gap={'20px'}
          position={'absolute'}
          bgcolor={'#FFF'}
          borderRadius={'10px'}
          zIndex={'98'}
          boxShadow={'0px 10px 50px rgba(0, 0, 0, 0.2)'}
        >
          <Expiration {...optionFrom} />

          <Button
            disabled={!optionFrom.formState.isDirty || !optionFrom.formState.isValid}
            type={'submit'}
            variant={'contained'}
            color={'darkGreen'}
          >
            Save
          </Button>
        </Stack>
      </Stack>
    </form>
  );
};

export default ChatOptions;
