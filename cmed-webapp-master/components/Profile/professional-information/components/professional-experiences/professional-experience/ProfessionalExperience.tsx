import { Box, Button, Modal, Stack, Typography } from '@mui/material';
import { useTranslation } from 'next-i18next';
import React, { FC, useCallback, useEffect, useState } from 'react';
import { ProfessionalExperience } from '../../../../../../api/types/account/account';
import { BeginWork, EndWork, Organisation, Position } from './components';

const style = {
  position: 'absolute' as const,
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  bgcolor: 'background.paper',
  boxShadow: 24,
  borderRadius: '20px',
  p: '50px 40px',
};

export interface ProfessionalExperienceModalProps {
  open: boolean;
  close: () => void;
  onSave: (work: any) => void;
  title: string;
  initialValue: ProfessionalExperience;
}

export const defaultProfessionalExperience: ProfessionalExperience = {
  professionalExperienceId: null,
  speciality: '',
  position: '',
  location: '',
  startDate: '',
  endDate: '',
  isOngoing: false,
};

export const ProfessionalExperienceModal: FC<ProfessionalExperienceModalProps> = ({
  open,
  close,
  onSave,
  title,
  initialValue,
}) => {
  const { t } = useTranslation('profile');
  const [professionalExperience, setProfessionalExperience] = useState(initialValue);
  const [disabled, setDisabled] = useState(false);
  const [closed, setClosed] = useState(false);

  useEffect(() => {
    if (initialValue) {
      setProfessionalExperience(initialValue);
    }
  }, [initialValue]);

  useEffect(() => {
    if (closed) {
      setProfessionalExperience(initialValue);
      setClosed(false);
      close();
    }
  }, [closed, initialValue, close]);

  const onCancel = () => {
    setClosed(true);
  };

  const onSetStartWork = (value: string): void => {
    setProfessionalExperience({
      ...professionalExperience,
      startDate: value,
    });
  };

  const onFormError = (hasError: boolean): void => {
    setDisabled(hasError);
  };

  const onSetEndWork = (value: string | null): void => {
    setProfessionalExperience({
      ...professionalExperience,
      endDate: value,
    });
  };

  const onSetOutgoing = (value: boolean): void => {
    setProfessionalExperience({
      ...professionalExperience,
      isOngoing: value,
    });
  };

  const onSetOrganisation = (value: string): void => {
    setProfessionalExperience({
      ...professionalExperience,
      location: value,
    });
  };

  const onSetPosition = (value: string): void => {
    setProfessionalExperience({
      ...professionalExperience,
      position: value,
    });
  };

  const onSaveModalHandler = useCallback(() => {
    setProfessionalExperience(defaultProfessionalExperience);
    onSave(professionalExperience);
    close();
  }, [close, onSave, professionalExperience]);

  return (
    <Modal
      open={open}
      onClose={() => onCancel()}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Stack width={'400px'} alignItems={'center'}>
          <Typography
            mb={'40px'}
            variant={'h4'}
            color={'primary'}
            textAlign={'center'}
          >
            {t(`common:b-${title.toLowerCase()}`)}
          </Typography>

          <Stack width={'100%'} spacing={'10px'}>
            <BeginWork
              onChange={onSetStartWork}
              initialValue={initialValue?.startDate}
              values={professionalExperience}
              onError={onFormError}
            />

            <EndWork
              onChange={onSetEndWork}
              onChangeOngoing={onSetOutgoing}
              isOngoing={professionalExperience?.isOngoing}
              initialValue={professionalExperience?.endDate || null}
              values={professionalExperience}
              onError={onFormError}
            />

            <Organisation
              onChange={onSetOrganisation}
              initialValue={initialValue?.location}
            />

            {/*<Country />*/}
            <Position
              onChange={onSetPosition}
              initialValue={initialValue?.position}
            />
          </Stack>

          <Box display="flex" gap={2}>
            <Button
              name={'modal-close-professional-experience'}
              onClick={() => onCancel()}
              variant={'contained'}
              color={'primary'}
              sx={{
                padding: '12px 16px',
                marginTop: '30px',
              }}
            >
              Close
            </Button>

            <Button
              name={'modal-add-professional-experience'}
              onClick={() => {
                onSaveModalHandler();
              }}
              disabled={disabled}
              variant={'contained'}
              color={'secondary'}
              sx={{
                padding: '12px 16px',
                marginTop: '30px',
              }}
            >
              {title}
            </Button>
          </Box>
        </Stack>
      </Box>
    </Modal>
  );
};
