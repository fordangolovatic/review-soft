import { Button, Divider, Grid, Stack } from '@mui/material';
import { Formik, FormikValues } from 'formik';
import { useTranslation } from 'next-i18next';
import { FC, useCallback } from 'react';
import {
  useCreateMedicalRecordMutation,
  useMedicalRecordQuery,
  useUpdateMedicalRecordMutation,
} from '../../../api/hooks/medical-record';
import { DisabledWrapper } from '../../QuickActionsMenu/DisabledWrapper';
import {
  Alcohol,
  Allergies,
  BodyParams,
  Breaks,
  Disease,
  Gender,
  MedicalAnalysisPhoto,
  Medicaments,
  Operations,
  Smoker,
} from './components';
import { MedicalRecord } from './types';

const MedicalRecord: FC = () => {
  const { t } = useTranslation('common');
  const { data: medicalRecord } = useMedicalRecordQuery();

  const { mutate: createMedicalRecord, isLoading: isCreatingMedicalRecord } =
    useCreateMedicalRecordMutation();
  const { mutate: updateMedicalRecord, isLoading: isUpdatingMedicalRecord } =
    useUpdateMedicalRecordMutation();

  const handleSubmit = useCallback(
    (values: FormikValues) => {
      if (medicalRecord?.medicalRecordId) {
        updateMedicalRecord(values as MedicalRecord);
        return;
      }

      createMedicalRecord(values as MedicalRecord);
    },
    [medicalRecord?.medicalRecordId, createMedicalRecord, updateMedicalRecord],
  );

  return (
    <Stack>
      <Formik
        initialValues={medicalRecord || {}}
        onSubmit={handleSubmit}
        enableReinitialize
      >
        {({ dirty, ...formikProps }) => (
          <form
            id="medical-record-form"
            onSubmit={(e) => {
              e.preventDefault();
              formikProps.handleSubmit(e);
            }}
          >
            <Grid container spacing={'26px'}>
              <Grid item xs={6}>
                <Gender {...formikProps} />
              </Grid>
              <Grid item xs={12}>
                <DisabledWrapper isDisabled>
                  <MedicalAnalysisPhoto {...formikProps} />
                </DisabledWrapper>
              </Grid>

              <Grid item xs={12}>
                <BodyParams {...formikProps} />
              </Grid>
              <Grid item xs={12}>
                <Operations {...formikProps} />
              </Grid>
              <Grid item xs={12}>
                <Breaks {...formikProps} />
              </Grid>
              <Grid item xs={12}>
                <Allergies {...formikProps} />
              </Grid>
              <Grid item xs={12}>
                <Disease {...formikProps} />
              </Grid>
              <Grid item xs={12}>
                <Medicaments {...formikProps} />
              </Grid>
              <Grid item xs={12}>
                <Smoker {...formikProps} />
              </Grid>
              <Grid item xs={12}>
                <Alcohol {...formikProps} />
              </Grid>
              <Grid item xs={12}>
                <Divider
                  sx={{
                    margin: {
                      sm: '10px 0 18px 0 !important',
                      xl: '14px 0 14px 0 !important',
                    },
                  }}
                />
              </Grid>
              <Grid item xs={12} alignItems={'flex-end'}>
                <Stack alignItems={'flex-end'}>
                  <Button
                    disabled={
                      !dirty || isCreatingMedicalRecord || isUpdatingMedicalRecord
                    }
                    form="medical-record-form"
                    type="submit"
                    sx={{
                      width: 'fit-content',
                      padding: { sm: '12px 20px ', xl: '20px 36px ' },
                    }}
                    variant={'contained'}
                    color={'darkGreen'}
                  >
                    {t('b-saveInformation')}
                  </Button>
                </Stack>
              </Grid>
            </Grid>
          </form>
        )}
      </Formik>
    </Stack>
  );
};

export default MedicalRecord;
