import { Autocomplete, Stack, Typography } from '@mui/material';
import { useTranslation } from 'next-i18next';
import { FC, SyntheticEvent } from 'react';
import { Language as LanguageType } from '../../../../../components/AskDoctor/types';
import { STextFieldInput } from '../../../styled';
import { FormikProps } from '../full-name/FullName';

type LanguageProps = FormikProps;

export const Language: FC<LanguageProps> = ({ values, setFieldValue }) => {
  const { t } = useTranslation('profile');
  const translations = {
    language: t('pI-language'),
    _language: t('pI-_language'),
  };

  const handleChange = (
    e: SyntheticEvent,
    selectedLanguage: LanguageType[],
  ): void => {
    setFieldValue?.('languages', selectedLanguage);
  };

  return (
    <Stack>
      <Typography variant={'subtitle1'}>{translations.language}</Typography>
      <Typography
        mb={{ sm: '12px', xl: '20px' }}
        color={'#828282'}
        variant={'body1'}
      >
        {translations._language}
      </Typography>

      <Stack width={'100%'} spacing={'10px'}>
        <Typography variant={'body2'} color={'secondary.dark'}>
          Language
        </Typography>

        <Autocomplete
          id="language-list"
          value={values?.languages ?? []}
          disableClearable
          onChange={handleChange}
          getOptionLabel={(option) => {
            return String(option.languageName);
          }}
          options={values?.languageOptions ?? []}
          renderInput={(params) => (
            <STextFieldInput
              {...params}
              placeholder={'Select languages'}
              InputProps={{
                ...params.InputProps,
                // endAdornment: (
                //   <React.Fragment>
                //     {isLoadingLanguages ? (
                //       <CircularProgress
                //         color="inherit"
                //         size={20}
                //         sx={{ mr: '60px' }}
                //       />
                //     ) : null}
                //     {params.InputProps.endAdornment}
                //   </React.Fragment>
                // ),
              }}
            />
          )}
          multiple
        />
      </Stack>
    </Stack>
  );
};
