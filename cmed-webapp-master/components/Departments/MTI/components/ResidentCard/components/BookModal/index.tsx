import { Box, Button, Divider, Modal, Stack, Typography } from '@mui/material';
import React, { FC, ReactElement, useState } from 'react';
import { IBookModalProps } from '../../../../types';
import LastComponent from './LastComponent';
import MainComponent from './MainComponent';

const BookModal: FC<IBookModalProps> = ({ opened, onClose, resident }) => {
  const [pickedDate, setPickedDate] = useState<number[]>([]);
  interface IFormType {
    type: string;
    component: ReactElement;
  }
  const steps: IFormType[] = [
    {
      type: 'Main',
      component: (
        <MainComponent
          getValue={(value: number[]) => setPickedDate(value)}
          resident={resident}
        />
      ),
    },
    { type: 'Main', component: <LastComponent pickedDate={pickedDate} /> },
  ];
  const [step, setStep] = useState(0);
  const onChangeStep = (id?: number) => {
    !id ? setStep(step + 1) : setStep(id);
  };
  return (
    <Modal sx={{ zIndex: '9999' }} open={opened} onClose={onClose}>
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translateX(-50%) translateY(-50%)',
        }}
      >
        <Stack alignItems={'center'} justifyContent={'center'}>
          <Box
            borderRadius={'30px'}
            bgcolor={'background.paper'}
            padding={{ sm: '40px' }}
          >
            <Stack
              sx={{
                height: '100%',
                overflow: 'scroll',
              }}
            >
              <Stack>
                <Box mb={{ sm: '30px', xl: '40px' }}>
                  <Typography variant={'subtitle1'} color={'secondary.dark'}>
                    Booking MTI
                  </Typography>
                </Box>
              </Stack>
              {steps[step].component}
              <Divider sx={{ margin: '25px 0' }} />
              <Stack mt={'10px'} justifyContent={'space-between'} direction={'row'}>
                <Button
                  sx={{ width: { sm: '150px' }, padding: '10px 0' }}
                  variant={'outlined'}
                  color={'primary'}
                  onClick={onClose}
                >
                  Cancel
                </Button>
                <Button
                  sx={{ width: { sm: '150px' }, padding: '10px 0' }}
                  variant={'contained'}
                  color={'secondary'}
                  onClick={
                    steps.length - 1 === step ? () => onClose : () => onChangeStep()
                  }
                >
                  {steps.length - 1 === step ? 'Book' : 'Next'}
                </Button>
              </Stack>
            </Stack>
          </Box>
        </Stack>
      </Box>
    </Modal>
  );
};

export default BookModal;
