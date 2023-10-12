import { Autocomplete, Stack, Typography } from '@mui/material';
import { useTranslation } from 'next-i18next';
import { FC, SyntheticEvent } from 'react';
import { State as StateType } from '../../../../../../../api/types/locations/location';
import { STextFieldInput } from '../../../../../styled';
import { FormikProps } from '../../../full-name/FullName';

type StateProps = FormikProps;

export const State: FC<StateProps> = ({ values, setFieldValue }) => {
  const { t } = useTranslation('profile');

  return (
    <Stack width={'100%'} spacing={'10px'}>
      <Typography variant={'body2'} color={'secondary.dark'}>
        {t('pI-state')}
      </Typography>

      <Autocomplete
        id="list-states"
        disableClearable
        options={values?.states || []}
        value={values?.stateId}
        isOptionEqualToValue={(option, stateValue) => {
          if (stateValue) {
            return (
              option.stateId === stateValue?.stateId || option.stateId === stateValue
            );
          }
          return false;
        }}
        onChange={(e: SyntheticEvent, newState: StateType | null) => {
          if (newState) {
            setFieldValue?.('stateId', newState?.stateId);
          }
        }}
        getOptionLabel={(option) => {
          const foundState = values?.states?.find(
            (state: StateType) =>
              state.stateId === option || state.stateId === option.stateId,
          );
          return foundState?.stateName || '';
        }}
        renderInput={(params) => (
          <STextFieldInput {...params} placeholder={'Choose state'} />
        )}
      />
    </Stack>
  );
};
