import { Box, Stack } from '@mui/material';
import { FC, useMemo } from 'react';
import { useMetadataQuery } from '../../../../../api/hooks/metadata';
import { Consultation } from '../../../../../api/types/consultations/consultations';
import {
  Comments,
  Contact,
  Date,
  Pacient,
  Price,
  TreatmentPlan,
} from './components';

interface DateTableProps {
  consultations: Consultation;
}

export const DateTable: FC<DateTableProps> = ({ consultations }) => {
  const { data: metadata } = useMetadataQuery(); // TODO - Radu, why we need this ?

  const isDoctor = useMemo(
    () => metadata?.accountType === 'doctor',
    [metadata?.accountType],
  );

  return (
    <Stack
      my={'20px'}
      direction={'row'}
      justifyContent={'space-between'}
      id="consultations-date-table__container"
    >
      <Stack direction={'row'} justifyContent={'space-between'} width={'40%'}>
        <Stack pr={0.5} pl={0.5} flex={1.2}>
          <Date id={1} consultation={consultations} metadata={metadata} />
        </Stack>

        <Stack pr={0.5} pl={0.5} flex={1}>
          <Pacient
            patient={isDoctor ? consultations.patient : consultations.doctor}
            medicalRecordAgreement={!!consultations?.medicalRecordAgreement}
          />
        </Stack>

        <Stack pr={0.5} pl={0.5} flex={0.5}>
          <Price consultationPrice={consultations.consultationPrice} />
        </Stack>
      </Stack>

      <Stack pr={0.5} pl={0.5} flex={1}>
        <TreatmentPlan consultation={consultations} />
      </Stack>

      <Stack pr={0.5} pl={0.5} flex={1}>
        <Comments consultation={consultations} metadata={metadata} />
      </Stack>

      <Box pr={0.5} pl={0.5} flex={1}>
        <Contact consultation={consultations} metadata={metadata} />
      </Box>
    </Stack>
  );
};
