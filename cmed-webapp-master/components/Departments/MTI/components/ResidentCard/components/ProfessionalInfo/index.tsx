import {
  BusinessCenterOutlined,
  GridViewOutlined,
  PlaceOutlined,
  TextsmsOutlined,
} from '@mui/icons-material';
import { Stack, Typography } from '@mui/material';
import { isNil } from 'lodash';
import { useTranslation } from 'next-i18next';
import { FC, useMemo } from 'react';
import { IProfessionalInfoProps } from '../../../../types';

const ProfessionalInfo: FC<IProfessionalInfoProps> = ({
  specialities,
  languages,
  country,
  professionalInfo,
}) => {
  const { t } = useTranslation('departments');
  const professionalSpecialities = useMemo<string>(
    () => specialities?.map((s) => s.specialityName)?.join(', '),
    [specialities],
  );
  const professionalLanguages = useMemo<string>(
    () => languages?.map((language) => language.languageName)?.join(', '),
    [languages],
  );

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
      {professionalInfo?.experienceInYears && (
        <Stack alignItems={'center'} spacing={{ sm: '8px' }} direction={'row'}>
          <BusinessCenterOutlined
            sx={{ width: { sm: '15px' }, height: { sm: '15px' } }}
            color={'darkGreen'}
          />
          <Typography variant={'body1'}>
            {professionalInfo.experienceInYears} {t('yearsExperience')}
          </Typography>
        </Stack>
      )}
      {!isNil(country) && (
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
