import { Box, Modal, Stack, Typography } from '@mui/material';
import { useQueryClient } from '@tanstack/react-query';
import { Formik, FormikValues } from 'formik';
import React, { FC, useCallback } from 'react';
import {
  QUESTION_QUERY_KEY,
  useQuestionCreateMutation,
} from '../../../../api/hooks/questions/useQuestionCreateMutation';
import { useToast } from '../../../../utilities/hooks/useToast';
import {
  ActionButtons,
  NecessaryParams,
  PersonalInformation,
  StartQuestion,
  Title,
} from './components';

interface AddQuestionModalProps {
  open: boolean;
  close?: () => void;
}
export const AddQuestionModal: FC<AddQuestionModalProps> = ({ open, close }) => {
  const { notifySuccess } = useToast();
  const queryClient = useQueryClient();

  const { mutate: createQuestionMutation, isLoading: isLoadingCreateQuestion } =
    useQuestionCreateMutation({
      onSuccess: () => {
        close?.();
        notifySuccess('Your question has been successfully created.');
        return queryClient.invalidateQueries(QUESTION_QUERY_KEY);
      },
    });

  const handleSubmit = useCallback(
    (values: FormikValues) => {
      const {
        isAnonymous = false,
        content,
        title,
        image,
        language,
        speciality,
      } = values;

      createQuestionMutation({
        isAnonymous,
        content,
        title,
        image,
        language,
        speciality,
      });
    },
    [createQuestionMutation],
  );

  const initialValues = {
    isAnonymous: false,
  };

  return (
    <Modal open={open} onClose={close}>
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translateX(-50%) translateY(-50%)',
          width: '700px',
        }}
      >
        <Formik initialValues={initialValues} onSubmit={handleSubmit}>
          {({ ...formikProps }) => (
            <form
              id="article-addArticle-form"
              onSubmit={(e) => {
                e.preventDefault();
                formikProps.handleSubmit(e);
              }}
            >
              <Stack alignItems={'center'} justifyContent={'center'}>
                <Box
                  maxWidth={'700px'}
                  width={'100%'}
                  bgcolor={'background.paper'}
                  borderRadius={'10px'}
                  padding={'30px 40px'}
                >
                  <Stack>
                    <Typography
                      mb={{ sm: '30px', xl: '40px' }}
                      color={'primary'}
                      variant={'h4'}
                    >
                      Ask a Doctor
                    </Typography>
                    <Stack spacing={'20px'}>
                      <NecessaryParams {...formikProps} />
                      <Title {...formikProps} />
                      <StartQuestion {...formikProps} />
                      <PersonalInformation {...formikProps} />
                      <ActionButtons
                        isLoading={isLoadingCreateQuestion}
                        close={close}
                        {...formikProps}
                      />
                    </Stack>
                    <Typography mt={'20px'} variant={'body1'} color={'secondary'}>
                      Adding personal information is not necessary, but it will help
                      the doctor to make a more accurate diagnosis
                    </Typography>
                  </Stack>
                </Box>
              </Stack>
            </form>
          )}
        </Formik>
      </Box>
    </Modal>
  );
};
