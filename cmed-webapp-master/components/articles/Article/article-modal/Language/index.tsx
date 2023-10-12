import {
  Autocomplete,
  CircularProgress,
  FormControl,
  Stack,
  TextField,
} from '@mui/material';
import React, { FC, SyntheticEvent } from 'react';
import { useLanguagesQuery } from '../../../../../api/hooks/languages/useLanguagesQuery';
import { textFieldMediumWithoutOuterLabel } from '../../../../../utilities/outdated__styles/sx';
import { FormikProps, Language as LanguageType } from '../../../../AskDoctor/types';

type LanguageProps = FormikProps;

export const Language: FC<LanguageProps> = ({ values, setFieldValue }) => {
  const { data: languages, isLoading: isLoadingLanguage } = useLanguagesQuery();

  const handleChange = (e: SyntheticEvent, newValue: LanguageType): void => {
    setFieldValue?.('language', newValue);
  };

  return (
    <FormControl fullWidth>
      <Stack width={'100%'} spacing={'10px'}>
        <Autocomplete
          id="language-list"
          value={values.language}
          onChange={handleChange}
          getOptionLabel={(option) => {
            return String(option.languageName);
          }}
          options={languages ?? []}
          renderInput={(params) => (
            <TextField
              sx={textFieldMediumWithoutOuterLabel}
              {...params}
              placeholder={'Select language'}
              InputProps={{
                ...params.InputProps,
                endAdornment: (
                  <React.Fragment>
                    {isLoadingLanguage ? (
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
