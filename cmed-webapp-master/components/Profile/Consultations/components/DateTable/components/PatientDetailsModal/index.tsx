import { Box, Button, Modal, Stack, Typography } from '@mui/material';
import { grey } from '@mui/material/colors';
import { FC, ReactNode } from 'react';

// TODO - Radu, once again 2 entities for same thing, remove user, or better account and pass data to user
import { Account } from '../../../../../../../api/types/account/account';
import { MedicalRecord } from '../../../../../MedicalRecord/types';
import { MedicalRecordDetailBox, MedicalRecordDetailListBox } from '../../styled';

interface PatientDetailsModelProps {
  patient: Account;
  medicalRecord?: MedicalRecord;
  opened: boolean;
  closeModal: () => void;
}

const PatientDetailsModal: FC<PatientDetailsModelProps> = ({
  patient,
  medicalRecord,
  opened,
  closeModal,
}) => {
  const createDetailList = (entries: string[]): ReactNode => {
    if (entries.length === 0) {
      <Typography sx={{ color: grey[600] }} variant={'body1'}>
        None
      </Typography>;
    }

    if (entries.length === 1) {
      return (
        <Typography sx={{ color: grey[600] }} variant={'body1'}>
          {entries}
        </Typography>
      );
    }

    return (
      <MedicalRecordDetailListBox>
        {entries.map((entry) => {
          return (
            <Typography key={entry} sx={{ color: grey[600] }} variant={'body1'}>
              {entry}
            </Typography>
          );
        })}
      </MedicalRecordDetailListBox>
    );
  };

  return (
    <Modal
      id="patient-details-modal"
      sx={{ zIndex: '9999' }}
      open={opened}
      onClose={closeModal}
    >
      <Stack
        id="patient-details-modal__container"
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translateX(-50%) translateY(-50%)',
        }}
        spacing={2}
        bgcolor={'background.paper'}
        borderRadius={'1rem'}
        alignItems={'center'}
        justifyContent={'center'}
      >
        <Box
          id="patient-details-modal__details-container"
          borderRadius={'30px'}
          bgcolor={'background.paper'}
          padding={6}
          display={'grid'}
          gridTemplateColumns={'repeat(auto-fill, minmax(calc(50% - 3rem), 10rem))'}
          rowGap={'1rem'}
          overflow={'auto'}
          columnGap={'2rem'}
          minHeight={'40vh'}
          minWidth={'40vw'}
          maxWidth={'80vw'}
          maxHeight={'80vh'}
        >
          <MedicalRecordDetailBox id="details-container__name">
            <Typography>Patient:</Typography>
            <Typography sx={{ color: grey[600] }} variant={'body1'}>
              {patient.firstName} {patient.lastName}
            </Typography>
          </MedicalRecordDetailBox>

          <MedicalRecordDetailBox id="details-container__gender">
            <Typography>Gender:</Typography>
            <Typography sx={{ color: grey[600] }} variant={'body1'}>
              {medicalRecord?.gender}
            </Typography>
          </MedicalRecordDetailBox>

          <MedicalRecordDetailBox>
            <Typography id="details-container__height">Height:</Typography>
            <Typography sx={{ color: grey[600] }} variant={'body1'}>
              {medicalRecord?.height}
            </Typography>
          </MedicalRecordDetailBox>

          <MedicalRecordDetailBox>
            <Typography id="details-container__weight">Weight:</Typography>
            <Typography sx={{ color: grey[600] }} variant={'body1'}>
              {medicalRecord?.weight}
            </Typography>
          </MedicalRecordDetailBox>

          <MedicalRecordDetailBox>
            <Typography id="details-container__operations">Operations:</Typography>
            {createDetailList(medicalRecord?.operations || [])}
          </MedicalRecordDetailBox>

          <MedicalRecordDetailBox>
            <Typography id="details-container__breaks">Breaks:</Typography>
            {createDetailList(medicalRecord?.breaks || [])}
          </MedicalRecordDetailBox>

          <MedicalRecordDetailBox>
            <Typography id="details-container__allergies">Allergies:</Typography>
            {createDetailList(medicalRecord?.allergies || [])}
          </MedicalRecordDetailBox>

          <MedicalRecordDetailBox id="details-container__name">
            <Typography>Diseases:</Typography>
            {createDetailList(medicalRecord?.diseases || [])}
          </MedicalRecordDetailBox>

          <MedicalRecordDetailBox id="details-container__medicaments">
            <Typography>Medicaments:</Typography>
            {createDetailList(medicalRecord?.medicaments || [])}
          </MedicalRecordDetailBox>

          <MedicalRecordDetailBox id="details-container__smoking">
            <Typography>Is Smoking:</Typography>
            <Typography sx={{ color: grey[600] }} variant={'body1'}>
              {medicalRecord?.isSmoking ? 'YES' : 'NO'}
            </Typography>
          </MedicalRecordDetailBox>

          <MedicalRecordDetailBox id="details-container__packs-per-day">
            <Typography>Packs Per Day:</Typography>
            <Typography sx={{ color: grey[600] }} variant={'body1'}>
              {medicalRecord?.packsPerDay}
            </Typography>
          </MedicalRecordDetailBox>

          <MedicalRecordDetailBox id="details-container__years-of-smoking">
            <Typography>Years Of Smoking:</Typography>
            <Typography sx={{ color: grey[600] }} variant={'body1'}>
              {medicalRecord?.yearsOfSmoking}
            </Typography>
          </MedicalRecordDetailBox>

          <MedicalRecordDetailBox id="details-container__is-drinking">
            <Typography>Is Drinking:</Typography>
            <Typography sx={{ color: grey[600] }} variant={'body1'}>
              {medicalRecord?.isDrinking ? 'YES' : 'NO'}
            </Typography>
          </MedicalRecordDetailBox>

          <MedicalRecordDetailBox id="details-container__drinking-status">
            <Typography>Drinking Status:</Typography>
            <Typography sx={{ color: grey[600] }} variant={'body1'}>
              {medicalRecord?.drinkingStatus}
            </Typography>
          </MedicalRecordDetailBox>
        </Box>

        {/* <Divider sx={{ margin: '25px 0' }} /> */}

        <Box
          id="patient-details-modal__actions"
          padding={2}
          maxHeight={'20%'}
          justifyContent={'space-between'}
        >
          <Button
            sx={{ width: { tablet: '150px' }, padding: '10px 0' }}
            variant={'outlined'}
            color={'primary'}
            onClick={closeModal}
          >
            Close
          </Button>
        </Box>
      </Stack>
    </Modal>
  );
};

export default PatientDetailsModal;
