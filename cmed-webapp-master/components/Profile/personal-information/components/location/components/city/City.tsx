import { Autocomplete, Stack, Typography } from '@mui/material';
import { useTranslation } from 'next-i18next';
import { FC } from 'react';
import { City as CityValues } from '../../../../../../../api/types/locations/location';
import { STextFieldInput } from '../../../../../styled';
import { FormikProps } from '../../../full-name/FullName';

type CityProps = FormikProps;

export const City: FC<CityProps> = ({ values, setFieldValue }) => {
  const { t } = useTranslation('profile');

  return (
    <Stack width={'100%'} spacing={'10px'}>
      <Typography variant={'body2'} color={'secondary.dark'}>
        {t('pI-city')}
      </Typography>

      <Autocomplete
        id="list-cities"
        clearOnBlur={true}
        disableClearable
        options={values?.cities || []}
        value={values?.cityId}
        isOptionEqualToValue={(option, cityValue) => {
          if (cityValue) {
            return (
              option.cityId === cityValue?.cityId || option.cityId === cityValue
            );
          }
          return false;
        }}
        onChange={(e, newCity: CityValues | null) => {
          if (newCity) {
            setFieldValue?.('cityId', newCity.cityId);
          }
        }}
        getOptionLabel={(option) => {
          const foundCity = values?.cities?.find(
            (city: CityValues) =>
              city.cityId === option || city.cityId === option.cityId,
          );
          return foundCity?.cityName || '';
        }}
        renderInput={(params) => (
          <STextFieldInput {...params} placeholder={'Choose City'} />
        )}
      />
    </Stack>
  );
};
