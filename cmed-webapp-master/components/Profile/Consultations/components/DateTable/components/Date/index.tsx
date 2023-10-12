import {
  Box,
  Chip,
  MenuItem,
  Select,
  SelectChangeEvent,
  Stack,
  Typography,
} from '@mui/material';
import { grey } from '@mui/material/colors';
import { useQueryClient } from '@tanstack/react-query';
import { capitalize } from 'lodash';
import moment from 'moment';
import { FC, useEffect, useState } from 'react';
import { useUpdateConsultationMutation } from '../../../../../../../api/hooks/consultations';
import { Metadata } from '../../../../../../../api/hooks/metadata/useMetadataQuery';
import {
  Consultation,
  ConsultationStatusEnum,
} from '../../../../../../../api/types/consultations/consultations';
import { useToast } from '../../../../../../../utilities/hooks/useToast';

// TODO - Radu, extract this untyped hardcoded array from here
const status = [
  { id: 1, status: 'CONFIRMED', color: 'secondary' },
  { id: 2, status: 'PENDING', color: 'primary' },
  { id: 3, status: 'CANCELLED', color: grey[600] },
  { id: 4, status: 'COMPLETED', color: 'secondary.dark' },
];

interface DateProps {
  id: number;
  consultation: Consultation;
  metadata?: Metadata;
}

export const Date: FC<DateProps> = ({ consultation, metadata }) => {
  const queryClient = useQueryClient();
  const { notifySuccess, notifyError } = useToast();
  const { mutate: updateConsultationMutation } = useUpdateConsultationMutation({
    onSuccess: (newConsultation) => {
      notifySuccess(
        `Consultation status changed to ${capitalize(
          newConsultation.consultationStatus,
        )}`,
      );
      queryClient.invalidateQueries(['consultation']);
    },
    onError: () => {
      notifyError('Failed to update the consultation status');
      queryClient.invalidateQueries(['consultation']);
    },
  });

  const defaultValue = status.find(
    (stat) =>
      stat.status.toLowerCase() === consultation.consultationStatus.toLowerCase(),
  )?.status;
  const [consultationStatus, setConsultationStatus] = useState<string>(
    defaultValue || '',
  );

  useEffect(
    () => setConsultationStatus(consultation.consultationStatus.toUpperCase()),
    [consultation.consultationStatus],
  );

  const handleChange = (event: SelectChangeEvent) => {
    const newConsultationStatus =
      event.target.value.toLowerCase() as ConsultationStatusEnum;
    setConsultationStatus(newConsultationStatus);
    updateConsultationMutation({
      ...consultation,
      consultationStatus: newConsultationStatus,
    });
  };

  return (
    <Stack spacing={'10px'}>
      <Typography variant={'body2'}>
        {moment(consultation.activity.date).format('YYYY-MM-DD')}{' '}
        {consultation.startTime}
      </Typography>

      {metadata?.accountType === 'doctor' ? (
        <Box>
          <Select
            disabled // NOTE: Temporary to take control from consultation buttons
            variant={'standard'}
            value={consultationStatus}
            onChange={handleChange}
          >
            {status.map((statusItem) => (
              <MenuItem key={statusItem.id} value={statusItem.status}>
                <Typography variant={'body1'} color={statusItem.color}>
                  {statusItem.status}
                </Typography>
              </MenuItem>
            ))}
          </Select>
        </Box>
      ) : (
        <Box>
          <Chip label={capitalize(consultationStatus)} color={'darkGreen'} />
        </Box>
      )}
    </Stack>
  );
};
