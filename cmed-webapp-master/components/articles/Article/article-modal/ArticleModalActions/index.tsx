import { Button, Stack } from '@mui/material';
import React, { FC } from 'react';
import { FormikProps } from '../../../../Profile/personal-information/components/full-name/FullName';

interface ActionButtonsProps extends FormikProps {
  dirty: boolean;
  onClose: () => void;
}

export const ActionButtons: FC<ActionButtonsProps> = ({ dirty, onClose }) => {
  return (
    <Stack>
      <Stack mt={'20px'} direction={'row'} justifyContent={'space-between'}>
        <Button
          onClick={onClose}
          sx={{ padding: '12px 30px' }}
          variant={'outlined'}
          color={'primary'}
        >
          Cancel
        </Button>
        <Button
          name={'modal-publish'}
          disabled={!dirty}
          type={'submit'}
          sx={{ padding: '12px 30px' }}
          variant={'contained'}
          color={'darkGreen'}
        >
          Publish
        </Button>
      </Stack>
    </Stack>
  );
};
