import { Box, Button, Modal, Stack, Typography } from '@mui/material';
import { useQueryClient } from '@tanstack/react-query';
import { Formik, FormikValues } from 'formik';
import { useTranslation } from 'next-i18next';
import { FC, useCallback } from 'react';
import { useMetadataQuery } from '../../../../../api/hooks/metadata/useMetadataQuery';
import { useToast } from '../../../../../utilities/hooks/useToast';
import { STextFieldInput } from '../../../styled';
import { useSendMessageMutation } from '../../hooks';
import { MESSAGES_QUERY_KEY } from '../../hooks/useMessages';
import { UserList } from './components';

interface WriteMessageProps {
  open: boolean;
  onClose: () => void;
}
export const WriteMessageModal: FC<WriteMessageProps> = ({ open, onClose }) => {
  const { t } = useTranslation('profile');
  const queryClient = useQueryClient();
  const { notifySuccess } = useToast();

  const { mutate: sendMessageMutation } = useSendMessageMutation({
    onSuccess: () => {
      queryClient.invalidateQueries(MESSAGES_QUERY_KEY);
      onClose();
      notifySuccess('Message sent');
    },
  });
  const { data: metadata } = useMetadataQuery();

  const handleSubmit = useCallback(
    (values: FormikValues) => {
      const { to, content, subject } = values;
      if (metadata?.userId) {
        sendMessageMutation({
          from: metadata?.userId,
          to: Number(to),
          content,
          subject,
        });
      }
    },
    [sendMessageMutation],
  );

  const initialValues = {
    from: metadata?.userId,
    to: null,
    content: null,
    subject: null,
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          width: 'fit-content',
          position: 'relative',
          top: '50%',
          left: '50%',
          transform: 'translateY(-50%) translateX(-50%)',
        }}
      >
        <Formik
          initialValues={initialValues}
          onSubmit={handleSubmit}
          enableReinitialize
        >
          {({ dirty, ...formikProps }) => (
            <form
              id="message-send-form"
              onSubmit={(e) => {
                e.preventDefault();
                formikProps.handleSubmit(e);
              }}
            >
              <Stack
                width={'100%'}
                maxWidth={'500px'}
                bgcolor={'background.paper'}
                padding={'40px 30px'}
                borderRadius={'10px'}
              >
                <Stack alignItems={'center'} spacing={'20px'}>
                  <Typography mb={'15px'} color={'primary'} variant={'h4'}>
                    {t('msg-message')}
                  </Typography>

                  <Stack
                    width={'100%'}
                    spacing={'10px'}
                    direction={'row'}
                    alignItems={'center'}
                  >
                    <Typography
                      color={'secondary.dark'}
                      width={'130px'}
                      variant={'body2'}
                    >
                      {t('msg-messageTo')}
                    </Typography>

                    <UserList filter={'doctor'} {...formikProps} />
                  </Stack>

                  <Stack
                    width={'100%'}
                    spacing={'10px'}
                    direction={'row'}
                    alignItems={'center'}
                  >
                    <Typography
                      color={'secondary.dark'}
                      width={'130px'}
                      variant={'body2'}
                    >
                      {t('msg-subject')}
                    </Typography>

                    <STextFieldInput
                      name="subject"
                      placeholder={'Subject'}
                      value={formikProps.values.subject}
                      onChange={formikProps.handleChange}
                      onBlur={formikProps.handleBlur}
                      fullWidth
                    />
                  </Stack>

                  <STextFieldInput
                    name="content"
                    placeholder={'Content'}
                    value={formikProps.values.content}
                    onChange={formikProps.handleChange}
                    onBlur={formikProps.handleBlur}
                    fullWidth
                    multiline
                    rows={4}
                  />

                  <Stack direction={'row'} spacing={'10px'}>
                    <Box>
                      <Button
                        onClick={onClose}
                        size={'large'}
                        color={'primary'}
                        variant={'contained'}
                      >
                        {t('common:b-close')}
                      </Button>
                    </Box>

                    <Box>
                      <Button
                        disabled={!dirty}
                        type="submit"
                        form={'message-send-form'}
                        size={'large'}
                        color={'secondary'}
                        variant={'contained'}
                      >
                        {t('common:b-send')}
                      </Button>
                    </Box>
                  </Stack>
                </Stack>
              </Stack>
            </form>
          )}
        </Formik>
      </Box>
    </Modal>
  );
};
