import { Box, Button, Grid, Stack } from '@mui/material';
import { Formik, FormikValues } from 'formik';
import { useTranslation } from 'next-i18next';
import { FC, useCallback } from 'react';
import {
  useDeleteProfessionalExperience,
  useProfessionalInformationCreateMutation,
  useProfessionalInformationQuery,
  useProfessionalInformationUpdateMutation,
} from '../../../api/hooks/professional-information';
import { Speciality } from '../../AskDoctor/types';
import { SkeletonCollection } from '../../SkeletonCollection';
import {
  Experience,
  IdentityCard,
  ProfessionalDocuments,
  ProfessionalExperiences,
  Specialities,
} from './components';
import { ProfessionalExperiencesSkeleton } from './ProfessionalExperiencesSkeleton';

// export interface ProfessionalInformationFormValues {
//   deletedExperienceId: number | undefined;
//   professionalInfoId: number | undefined;
//   experienceInYears: number | undefined;
//   specialities: number[];
//   professionalExperiences: ProfessionalExperience[];
// }

export const ProfessionalInformation: FC = () => {
  const { t } = useTranslation('common');
  const {
    mutate: updateProfessionalInfo,
    isLoading: isUpdatingProfessionalInformation,
  } = useProfessionalInformationUpdateMutation();

  const {
    mutate: createProfessionalInfo,
    isLoading: isCreatingProfessionalInformation,
  } = useProfessionalInformationCreateMutation();

  const {
    data: professionalInformation,
    isLoading: isLoadingProfessionalInformation,
  } = useProfessionalInformationQuery();

  const {
    mutate: deleteProfessionalExperience,
    isLoading: isDeletingProfessionalInformation,
  } = useDeleteProfessionalExperience();

  const handleSubmit = useCallback(
    (values: FormikValues) => {
      const {
        deletedExperienceId,
        professionalInfoId,
        experienceInYears,
        specialities,
        professionalExperiences,
      } = values;
      if (deletedExperienceId) {
        deleteProfessionalExperience(deletedExperienceId);
        return;
      }

      if (professionalInfoId) {
        updateProfessionalInfo({
          professionalInfoId,
          experienceInYears,
          specialities,
          professionalExperiences,
        });
        return;
      }

      createProfessionalInfo({
        experienceInYears,
        specialities,
        professionalExperiences,
      });
    },
    [createProfessionalInfo, updateProfessionalInfo, deleteProfessionalExperience],
  );

  const initialValues = {
    professionalExperiences: professionalInformation?.professionalExperiences ?? [],
    professionalInfoId: professionalInformation?.professionalInfoId,
    experienceInYears: professionalInformation?.experienceInYears,
    specialities:
      professionalInformation?.specialities?.map((s: Speciality) =>
        Number(s.specialityId),
      ) ?? [],
  };

  return (
    <Stack spacing={{ xl: '52px', sm: '32px' }}>
      <Formik
        initialValues={initialValues}
        onSubmit={handleSubmit}
        enableReinitialize
      >
        {({ dirty, ...formikProps }) => (
          <Box
            component={'form'}
            id="personal-info-form"
            onSubmit={(e) => {
              e.preventDefault();
              formikProps.handleSubmit(e);
            }}
          >
            <Stack spacing={'20px'}>
              <Grid container spacing={'20px'}>
                <Grid item xs={6}>
                  <Specialities {...formikProps} />
                </Grid>

                <Grid item xs={6}>
                  <Experience {...formikProps} />
                </Grid>

                <Grid
                  item
                  xs={6}
                  style={{
                    opacity: '0.5',
                    pointerEvents: 'none',
                  }}
                >
                  <IdentityCard />
                </Grid>

                <Grid
                  item
                  xs={6}
                  style={{
                    opacity: '0.5',
                    pointerEvents: 'none',
                  }}
                >
                  <ProfessionalDocuments />
                </Grid>
              </Grid>

              <SkeletonCollection
                isLoading={isLoadingProfessionalInformation}
                skeleton={<ProfessionalExperiencesSkeleton />}
              >
                <ProfessionalExperiences {...formikProps} />
              </SkeletonCollection>
            </Stack>

            <Stack alignItems={'flex-end'}>
              <Button
                type="submit"
                disabled={
                  !dirty ||
                  isCreatingProfessionalInformation ||
                  isUpdatingProfessionalInformation ||
                  isDeletingProfessionalInformation
                }
                sx={{
                  width: 'fit-content',
                  padding: { sm: '12px 20px', xl: '20px 36px' },
                }}
                variant={'contained'}
                color={'darkGreen'}
              >
                {t('b-saveInformation')}
              </Button>
            </Stack>
          </Box>
        )}
      </Formik>
    </Stack>
  );
};
