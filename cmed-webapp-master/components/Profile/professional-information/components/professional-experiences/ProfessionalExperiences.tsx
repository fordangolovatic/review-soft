import { Box, Button, Divider, Stack, Typography } from '@mui/material';
import dayjs from 'dayjs';
import { useTranslation } from 'next-i18next';
import React, { FC, useCallback, useEffect } from 'react';
import { ProfessionalExperience } from '../../../../../api/types/account/account';
import { useToast } from '../../../../../utilities/hooks/useToast';
import { FormikProps } from '../../../personal-information/components/full-name/FullName';
import { ProfessionalExperienceModal } from './professional-experience';
import { defaultProfessionalExperience } from './professional-experience/ProfessionalExperience';

type ProfessionalExperiencesProps = FormikProps;

export const ProfessionalExperiences: FC<ProfessionalExperiencesProps> = ({
  values,
  setFieldValue,
  submitForm,
}) => {
  const { t } = useTranslation('profile');
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [selectedExperienceIndex, setSelectedExperienceIndex] =
    React.useState<number>(-1);
  const { notifyError } = useToast();

  const [experiences, setExperiences] = React.useState<ProfessionalExperience[]>(
    values?.professionalExperiences,
  );

  useEffect(() => {
    setExperiences(values?.professionalExperiences);
  }, [values?.professionalExperiences]);

  const hasExperiences = experiences?.length > 0;

  const handleCloseModal = (): void => setIsModalOpen(false);

  const onSaveHandler = (professionalExperience: ProfessionalExperience) => {
    const startDateValid = dayjs(professionalExperience.startDate).isValid();
    const isOngoing = professionalExperience.isOngoing;
    const endDateValid = dayjs(professionalExperience.endDate).isValid();

    if (!startDateValid || (!isOngoing && !endDateValid)) {
      return notifyError('Invalid dates');
    }

    if (selectedExperienceIndex > -1) {
      const updatedExperiences = [...experiences];
      updatedExperiences[selectedExperienceIndex] = {
        ...updatedExperiences[selectedExperienceIndex],
        ...professionalExperience,
      };
      setExperiences(updatedExperiences);
      setFieldValue?.('professionalExperiences', updatedExperiences);
    } else {
      const updatedExperiences = [...experiences, professionalExperience];
      setExperiences(updatedExperiences);
      setFieldValue?.('professionalExperiences', updatedExperiences);
    }
    setIsModalOpen(false);
    submitForm?.();
  };

  const onDeleteHandler = useCallback(
    (professionalExperienceId: number | null) => {
      setFieldValue?.('deletedExperienceId', professionalExperienceId);
      submitForm?.();
    },
    [setFieldValue, submitForm],
  );

  const onUpdateHandler = useCallback((index: number) => {
    setIsModalOpen(true);
    setSelectedExperienceIndex(index);
  }, []);

  return (
    <Stack>
      <Typography color={'secondary.dark'} variant={'subtitle1'}>
        {t('px-professionalExperience')}
      </Typography>

      {!hasExperiences ? (
        <Typography color={'#818181'} variant={'body1'}>
          {t('px_professionalExperience')}
        </Typography>
      ) : (
        <Box>
          {experiences.map((experience: ProfessionalExperience, index) => (
            <Stack key={experience.professionalExperienceId}>
              <Stack mt={'40px'} direction={'row'} justifyContent={'space-between'}>
                <Stack justifyContent={'space-between'}>
                  <Stack mb={'8px'} color={'#00534C'} fontWeight={400} fontSize={20}>
                    {experience.position}
                  </Stack>

                  <Typography
                    mb={'8px'}
                    variant={'body1'}
                    fontWeight={400}
                    fontSize={20}
                  >
                    {experience.location}
                  </Typography>

                  <Typography
                    variant={'body1'}
                    color={'#818181'}
                    fontWeight={400}
                    fontSize={20}
                  >
                    {experience.startDate
                      ? new Date(experience.startDate).toLocaleString('en', {
                          month: 'short',
                          year: 'numeric',
                        })
                      : '****'}
                    -
                    {experience.endDate
                      ? new Date(experience.endDate).toLocaleString('en', {
                          month: 'short',
                          year: 'numeric',
                        })
                      : 'Present'}
                  </Typography>
                </Stack>

                <Stack alignItems={'end'} spacing={'8px'} direction={'row'}>
                  <Button
                    name={'edit-professional-experience'}
                    onClick={() => onUpdateHandler(index)}
                    sx={{ padding: '8px 45px', height: 'fit-content' }}
                    color={'secondary'}
                    variant={'contained'}
                  >
                    {t('common:b-edit')}
                  </Button>

                  <Button
                    name={'delete-professional-experience'}
                    onClick={() =>
                      onDeleteHandler(experiences[index]?.professionalExperienceId)
                    }
                    sx={{ padding: '8px 45px', height: 'fit-content' }}
                    color={'error'}
                    variant={'contained'}
                  >
                    {t('common:b-delete')}
                  </Button>

                  <Divider sx={{ marginTop: '10px' }} />
                </Stack>
              </Stack>
            </Stack>
          ))}
        </Box>
      )}

      <ProfessionalExperienceModal
        open={isModalOpen}
        close={handleCloseModal}
        onSave={onSaveHandler}
        title={selectedExperienceIndex !== -1 ? 'Edit' : 'Add'}
        initialValue={
          experiences[selectedExperienceIndex] || defaultProfessionalExperience
        }
      />

      <Button
        name={'add-professional-experience'}
        onClick={() => {
          setIsModalOpen(true);
          setSelectedExperienceIndex(-1);
        }}
        sx={{
          width: 'fit-content',
          borderRadius: '5px',
          padding: '8px',
          marginTop: '20px',
        }}
        variant={'contained'}
        color={'secondary'}
      >
        {t('common:b-add')}
      </Button>
    </Stack>
  );
};
