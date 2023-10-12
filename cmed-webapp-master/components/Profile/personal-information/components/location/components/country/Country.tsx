import { Autocomplete, Stack, Typography } from '@mui/material';
import { useTranslation } from 'next-i18next';
import { FC, SyntheticEvent } from 'react';
import { Country as CountryValues } from '../../../../../../../api/types/locations/location';
import { STextFieldInput } from '../../../../../styled';
import { FormikProps } from '../../../full-name/FullName';

type CountryProps = FormikProps;

export const Country: FC<CountryProps> = ({ values, setFieldValue }) => {
  const { t } = useTranslation('profile');

  return (
    <Stack width={'100%'} spacing={'10px'}>
      <Typography variant={'body2'} color={'secondary.dark'}>
        {t('pI-country')}
      </Typography>

      <Autocomplete
        id="list-countries"
        disableClearable
        options={values?.countries ?? []}
        value={values?.countryId}
        isOptionEqualToValue={(option, countryValue) => {
          if (countryValue) {
            return (
              option.countryId === countryValue?.countryId ||
              option.countryId === countryValue
            );
          }
          return false;
        }}
        onChange={(e: SyntheticEvent, newCountry: CountryValues | null) => {
          if (newCountry) {
            setFieldValue?.('countryId', newCountry.countryId);
          }
        }}
        getOptionLabel={(option) => {
          const foundCountry = values?.countries?.find(
            (country: CountryValues) =>
              country.countryId === option || country.countryId === option.countryId,
          );
          return foundCountry?.countryName || '';
        }}
        renderInput={(params) => (
          <STextFieldInput {...params} placeholder={'Choose Country'} />
        )}
      />
    </Stack>
  );
};
