import { FileCopyOutlined } from '@mui/icons-material';
import { Stack, Typography } from '@mui/material';
import { useTranslation } from 'next-i18next';
import { FC, useState } from 'react';
import { Consultation } from '../../../../../../../api/types/consultations/consultations';
import { DisabledWrapper } from '../../../../../../QuickActionsMenu/DisabledWrapper';
import ConsultationFilesModal from './components/ConsultationFilesModal';

interface TreatmentPlanProps {
  consultation: Consultation;
}

export const TreatmentPlan: FC<TreatmentPlanProps> = ({ consultation }) => {
  const { t } = useTranslation('profile');
  const [open, setOpen] = useState<boolean>(false);

  return (
    <Stack
      gap={1}
      px={'3px'}
      justifyContent={'space-between'}
      alignItems={'flex-end'}
      height={'170px'}
    >
      <ConsultationFilesModal
        open={open}
        close={() => setOpen(false)}
        consultation={consultation}
      />

      <DisabledWrapper
        isDisabled={!consultation.medicalRecordAgreement}
        sx={{ height: '100%' }}
      >
        <Stack
          onClick={() => setOpen(true)}
          justifyContent={'center'}
          alignItems={'center'}
          sx={{
            background: '#EFEFEF',
            height: '100%',
            padding: '4px 8px',
            borderRadius: '10px',
            border: '1px solid #818181',
            cursor: 'pointer',
          }}
        >
          <Typography textAlign={'center'}>
            <FileCopyOutlined fontSize={'medium'} sx={{ color: '#818181' }} />
          </Typography>

          <Typography color={'#818181'} textAlign={'center'} variant={'body2'}>
            {t('c-documents')}
          </Typography>
        </Stack>
      </DisabledWrapper>
    </Stack>
  );
};
