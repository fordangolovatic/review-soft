import {
  Autocomplete,
  CircularProgress,
  FormControl,
  Stack,
  TextField,
} from '@mui/material';
import React, { FC, SyntheticEvent } from 'react';
import { useSpecialitiesQuery } from '../../../../../../../../api/hooks/specialities/useSpecialitiesQuery';
import { textFieldMediumWithoutOuterLabel } from '../../../../../../../../utilities/outdated__styles/sx';
import { FormikProps, Speciality as SpecialityType } from '../../../../../../types';

type SpecialityProps = FormikProps;

export const Speciality: FC<SpecialityProps> = ({ setFieldValue, values }) => {
  const { data: specialities, isLoading: isLoadingSpecialities } =
    useSpecialitiesQuery();

  const handleChange = (e: SyntheticEvent, newValue: SpecialityType): void => {
    setFieldValue?.('speciality', newValue?.specialityId);
  };

  return (
    <FormControl fullWidth>
      <Stack width={'100%'} spacing={'10px'}>
        <Autocomplete
          id="speciality-list"
          value={values.speciality}
          onChange={handleChange}
          getOptionLabel={(option) => {
            return String(option.specialityName);
          }}
          options={specialities ?? []}
          renderInput={(params) => (
            <TextField
              sx={textFieldMediumWithoutOuterLabel}
              {...params}
              placeholder={'Select specialty'}
              InputProps={{
                ...params.InputProps,
                endAdornment: (
                  <React.Fragment>
                    {isLoadingSpecialities ? (
                      <CircularProgress
                        color="inherit"
                        size={20}
                        sx={{ mr: '60px' }}
                      />
                    ) : null}
                    {params.InputProps.endAdornment}
                  </React.Fragment>
                ),
              }}
            />
          )}
        />
      </Stack>
    </FormControl>
  );
};
