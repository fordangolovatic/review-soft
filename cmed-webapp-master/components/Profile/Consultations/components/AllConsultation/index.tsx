import { Divider, Stack } from '@mui/material';
import React, { FC } from 'react';
import { useConsultationsQuery } from '../../../../../api/hooks/consultations';
import { ConsultationsSkeleton } from '../ConsultationSkeleton';
import { DateTable, DateTableHeader } from '../index';

interface AllConsultationProps {
  filter?: string;
}

export const AllConsultation: FC<AllConsultationProps> = ({ filter }) => {
  const { data: consultations, isLoading: isConsultationLoading } =
    useConsultationsQuery();

  return (
    <Stack>
      <DateTableHeader />

      {isConsultationLoading && <ConsultationsSkeleton />}
      {!isConsultationLoading &&
        consultations
          ?.filter((cconsultation) =>
            filter
              ? cconsultation.consultationStatus.toLowerCase() ===
                filter.toLowerCase()
              : true,
          )
          .map((el, index) => {
            return <DateTable key={index} consultations={el} />;
          })}

      <Divider />
      {/* <DateTable /> */}
    </Stack>
  );
};
