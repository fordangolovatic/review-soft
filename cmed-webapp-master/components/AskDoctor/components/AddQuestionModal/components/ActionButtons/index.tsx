import { Button, Stack } from '@mui/material';
import React, { FC } from 'react';
import { FormikProps } from '../../../../types';

interface ActionButtonsProps extends FormikProps {
  close?: () => void;
  isLoading?: boolean;
}
export const ActionButtons: FC<ActionButtonsProps> = ({ close, isLoading }) => {
  return (
    <Stack mt={'20px'} direction={'row'} justifyContent={'space-between'}>
      <Button
        onClick={close}
        sx={{ padding: '12px 30px' }}
        variant={'outlined'}
        color={'primary'}
      >
        Cancel
      </Button>
      <Button
        name={'modal-publish'}
        disabled={isLoading}
        type={'submit'}
        sx={{ padding: '12px 30px' }}
        variant={'contained'}
        color={'darkGreen'}
      >
        Publish
      </Button>
    </Stack>
  );
};
