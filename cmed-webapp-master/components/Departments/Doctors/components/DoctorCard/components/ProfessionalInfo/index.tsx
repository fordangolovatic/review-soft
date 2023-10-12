import {
  BusinessCenterOutlined,
  GridViewOutlined,
  PlaceOutlined,
  TextsmsOutlined,
} from '@mui/icons-material';
import { Stack, Typography } from '@mui/material';
import { useTranslation } from 'next-i18next';
import { FC, useMemo } from 'react';
import { Speciality } from '../../../../../../../api/types/categories';
import { Country } from '../../../../../../../api/types/locations/location';
import { Language } from '../../../../../../AskDoctor/types';

export interface ProfessionalInfoProps {
  specialities: Speciality[];
  languages: Language[];
  country: Country;
  yearsExperience: number;
}

const ProfessionalInfo: FC<ProfessionalInfoProps> = ({
  specialities,
  languages,
  country,
  yearsExperience,
}) => {
  const professionalSpecialities = useMemo<string>(
    () => specialities?.map((s) => s.specialityName)?.join(', '),
    [specialities],
  );
  const professionalLanguages = useMemo<string>(
    () => languages?.map((l) => l.languageName)?.join(', '),
    [languages],
  );

  const { t } = useTranslation('departments');

  return (
    <Stack spacing={'2px'}>
      {professionalSpecialities && (
        <Stack alignItems={'center'} spacing={{ sm: '8px' }} direction={'row'}>
          <GridViewOutlined
            sx={{ width: { sm: '15px' }, height: { sm: '15px' } }}
            color={'darkGreen'}
          />
          <Typography variant={'body1'}>{professionalSpecialities}</Typography>
        </Stack>
      )}
      {yearsExperience > 0 && (
        <Stack alignItems={'center'} spacing={{ sm: '8px' }} direction={'row'}>
          <BusinessCenterOutlined
            sx={{ width: { sm: '15px' }, height: { sm: '15px' } }}
            color={'darkGreen'}
          />
          <Typography variant={'body1'}>
            {yearsExperience} {t('yearsExperience')}
          </Typography>
        </Stack>
      )}
      {country && (
        <Stack alignItems={'center'} spacing={{ sm: '8px' }} direction={'row'}>
          <PlaceOutlined
            sx={{ width: { sm: '15px' }, height: { sm: '15px' } }}
            color={'darkGreen'}
          />
          <Typography variant={'body1'}>{country.countryName}</Typography>
        </Stack>
      )}
      {professionalLanguages && (
        <Stack alignItems={'center'} spacing={{ sm: '8px' }} direction={'row'}>
          <TextsmsOutlined
            sx={{ width: { sm: '15px' }, height: { sm: '15px' } }}
            color={'darkGreen'}
          />
          <Typography variant={'body1'}>{professionalLanguages}</Typography>
        </Stack>
      )}
    </Stack>
  );
};

export default ProfessionalInfo;
