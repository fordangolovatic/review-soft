import { Button, Link, Stack, Typography } from '@mui/material';
import { useTranslation } from 'next-i18next';
import { FC, useState } from 'react';
import { useMedicalRecordByUserIdQuery } from '../../../../../../../api/hooks/medical-record';
import { useMetadataQuery } from '../../../../../../../api/hooks/metadata';
import { Account } from '../../../../../../../api/types/account/account';
import { DisabledWrapper } from '../../../../../../QuickActionsMenu/DisabledWrapper';
import PatientDetailsModal from '../PatientDetailsModal';

interface PatientProps {
  patient: Account;
  medicalRecordAgreement: boolean;
}

// TODO - Radu, rename this  as sometimes is used for doctor.. should be user or something else as name
export const Pacient: FC<PatientProps> = ({ patient, medicalRecordAgreement }) => {
  const { t } = useTranslation('profile');
  const [detailsModalOpened, setIsDetailsModalOpened] = useState(false);
  const { data: metadata } = useMetadataQuery();
  const { data: medicalRecord, isLoading: isMedicalRecordLoading } =
    useMedicalRecordByUserIdQuery(patient.userId, {
      enabled: medicalRecordAgreement,
    });

  const onShowDetails = () => {
    if (detailsModalOpened) {
      return;
    }
    setIsDetailsModalOpened(true);
  };

  const onCloseModal = () => {
    setIsDetailsModalOpened(false);
  };

  return (
    <Stack spacing={'10px'}>
      <Stack spacing={'10px'} paddingLeft={'10px'}>
        <Typography variant={'body2'}>{patient.lastName}</Typography>

        <Typography color={'secondary.dark'} variant={'body2'}>
          {patient.firstName}
        </Typography>
      </Stack>

      {metadata?.accountType === 'doctor' && (
        <DisabledWrapper isDisabled={!medicalRecordAgreement}>
          <Button color="secondary">
            <Link
              color={'secondary'}
              onClick={() => onShowDetails()}
              underline={'none'}
            >
              {t('common:b-seeDetails')}
            </Link>
          </Button>
        </DisabledWrapper>
      )}

      {!isMedicalRecordLoading && !!medicalRecordAgreement && (
        <PatientDetailsModal
          patient={patient}
          opened={detailsModalOpened}
          closeModal={() => onCloseModal()}
          medicalRecord={medicalRecord}
        />
      )}
    </Stack>
  );
};
