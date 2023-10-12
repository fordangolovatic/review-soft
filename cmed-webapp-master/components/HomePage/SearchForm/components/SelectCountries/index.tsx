import { Autocomplete, CircularProgress } from '@mui/material';
import { useTranslation } from 'next-i18next';
import React, { FC, useCallback, useState } from 'react';
import { useGlobalState } from '../../../../../utilities/global-state';
import { STextFieldInput } from '../../../../Profile/styled';
import { useTranslatedCountries } from '../../hooks';

const defaultValues = {
  id: 3,
  title: 'Country',
  key: 'countries',
  translateKey: 'cy-',
};

export const SelectCountries: FC = () => {
  const { t } = useTranslation('homePage');
  const [open, setOpen] = useState<boolean>(false);
  const { data: options, isLoading } = useTranslatedCountries(
    defaultValues.translateKey,
  );
  const { filters, setFilters } = useGlobalState();

  const memoizedTranslateLabel = useCallback(
    (value: string) => {
      return t(
        `common:${defaultValues.translateKey}${value
          .toLowerCase()
          .replaceAll(' ', '')}`,
      );
    },
    [t],
  );
  return (
    <Autocomplete
      id={`asynchronous-${defaultValues.key}`}
      sx={{
        width: '100%',
        bgcolor: 'white',
        color: '#818181',
        borderTopLeftRadius: defaultValues.id === 1 ? '10px' : '0',
        borderBottomLeftRadius: defaultValues.id === 1 ? '10px' : '0',
        borderTopRightRadius: defaultValues.id === 3 ? '10px' : '0',
        borderBottomRightRadius: defaultValues.id === 3 ? '10px' : '0',

        '& .MuiFormControl-root .MuiInputBase-root .MuiInputBase-input': {
          padding: { sm: '11.5px 14px', xl: '20px' },
        },
      }}
      open={open}
      onOpen={() => {
        setOpen(true);
      }}
      onClose={() => {
        setOpen(false);
      }}
      onChange={(e, newValue) => {
        if (!newValue) return;
        setFilters({
          ...filters,
          countries: [newValue],
        });
      }}
      getOptionLabel={(option) => memoizedTranslateLabel(option.value)}
      options={options ?? []}
      loading={isLoading}
      renderInput={(params) => (
        <STextFieldInput
          {...params}
          placeholder={String(t(`search${defaultValues.title}Placeholder`))}
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <React.Fragment>
                {isLoading ? (
                  <CircularProgress color="inherit" size={20} sx={{ mr: '50px' }} />
                ) : null}
                {params.InputProps.endAdornment}
              </React.Fragment>
            ),
          }}
        />
      )}
    />
  );
};
