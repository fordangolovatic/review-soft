import { Box, Button, Stack } from '@mui/material';
import { useQueryClient } from '@tanstack/react-query';
import { Formik, FormikValues } from 'formik';
import { useTranslation } from 'next-i18next';
import { FC, useCallback, useEffect, useMemo, useState } from 'react';
import {
  useAccountQuery,
  useAccountUpdateMutation,
} from '../../../api/hooks/account';
import { ACCOUNT_QUERY_KEY } from '../../../api/hooks/account/useAccountQuery';
import { useLanguagesQuery } from '../../../api/hooks/languages/useLanguagesQuery';
import { useCitiesQuery, useStatesQuery } from '../../../api/hooks/locations';
import { useCountriesQuery } from '../../../api/hooks/locations/useCountriesQuery';
import { City, Country, State } from '../../../api/types/locations/location';
import { Language as LanguageType } from '../../../components/AskDoctor/types';
import { useToast } from '../../../utilities/hooks/useToast';
import {
  Birthday,
  FullName,
  Language,
  Location,
  ProfilePicture,
} from './components';
import ShortCV from './components/short-cv/ShortCV';

export interface PersonalInformationFormState {
  userId: number | null;
  firstName: string | null;
  lastName: string | null;
  description: string | null;
  dateOfBirth: Date | null;

  cityId: number | null;
  cities: City[] | null;

  countryId: number | null;
  countries: Country[] | null;

  languages: LanguageType[] | null;
  languageOptions: LanguageType[] | null;

  stateId: number | null;
  states: State[] | null;
  address: string | null;
  profileImage?: string | null;
}

export const PersonalInformation: FC = () => {
  const { t } = useTranslation('common');
  const queryClient = useQueryClient();
  const { data: account, isLoading: isLoadingAccount } = useAccountQuery();
  const { data: countries, isLoading: isLoadingCountries } = useCountriesQuery();
  const { data: cities, isLoading: isLoadingCities } = useCitiesQuery();
  const { data: languageOptions, isLoading: isLoadingLanguages } =
    useLanguagesQuery();
  const { data: states, isLoading: isLoadingStates } = useStatesQuery();

  const [loaded, setIsLoaded] = useState(!!account?.userId);
  const isDoctor = useMemo(
    () => account?.accountType === 'doctor' || account?.accountType === 'resident',
    [account?.accountType],
  );

  // const [initialValues, setInitialValues] = useState<Partial<Account>>({
  const [initialValues, setInitialValues] = useState<any>(null);

  useEffect(() => {
    if (
      !isLoadingAccount &&
      !isLoadingCountries &&
      !isLoadingCities &&
      !isLoadingLanguages &&
      !isLoadingStates
    ) {
      setInitialValues({
        ...account,
        countries: countries,
        cities: cities,
        languageOptions: languageOptions,
        states: states,
      });
      setIsLoaded(true);
    }
  }, [
    account,
    isLoadingAccount,
    countries,
    isLoadingCountries,
    cities,
    isLoadingCities,
    languageOptions,
    isLoadingLanguages,
    states,
    isLoadingStates,
  ]);

  const { notifySuccess, notifyError } = useToast();

  const { mutate: updateUserMutation } = useAccountUpdateMutation({
    onSuccess: () => {
      queryClient.invalidateQueries(ACCOUNT_QUERY_KEY);
      notifySuccess('Your personal information has been successfully updated.');
    },
    onError: () => {
      notifyError("Couldn't update your personal information. Please try again.");
    },
  });

  const handleSubmit = useCallback(
    (values: FormikValues) => {
      const {
        firstName,
        lastName,
        description,
        dateOfBirth,
        cityId,
        countryId,
        stateId,
        address,
        profileImage,
        languages,
      } = values;

      updateUserMutation({
        userId: initialValues?.userId,
        firstName,
        lastName,
        description,
        dateOfBirth,
        cityId,
        countryId,
        stateId,
        address,
        profileImage,
        languages,
      });
    },
    [updateUserMutation, initialValues],
  );

  return (
    <>
      {loaded && (
        <Formik
          initialValues={initialValues}
          onSubmit={handleSubmit}
          enableReinitialize
        >
          {({ dirty, ...personalForm }) => (
            <Box
              component={'form'}
              id="personal-info-form"
              onSubmit={(e) => {
                e.preventDefault();
                personalForm.handleSubmit(e);
              }}
            >
              <Stack direction={'row'} spacing={{ xl: '52px', sm: '32px' }}>
                {!isLoadingAccount && <ProfilePicture {...personalForm} />}

                <Stack flex={'1'} spacing={'26px'}>
                  {!isLoadingAccount && <FullName {...personalForm} />}

                  {isDoctor && !isLoadingAccount && <ShortCV {...personalForm} />}

                  {!isLoadingAccount && <Birthday {...personalForm} />}

                  {!isLoadingAccount && <Location {...personalForm} />}

                  {!isLoadingLanguages && <Language {...personalForm} />}
                  {/*<Divider sx={{ margin: '40px 0 0 0' }} />*/}
                  {/*<Credentials />*/}

                  <Stack
                    justifyContent={'flex-end'}
                    direction={'row'}
                    spacing={'10px'}
                    pt={4}
                  >
                    <Button
                      disabled={!dirty || !personalForm.isValid}
                      form="personal-info-form"
                      type="submit"
                      sx={{
                        width: 'fit-content',
                        padding: { sm: '12px 20px', xl: '20px 36px' },
                      }}
                      variant={'contained'}
                      color={'darkGreen'}
                    >
                      {t('b-saveInformation')}
                    </Button>
                  </Stack>
                </Stack>
              </Stack>
            </Box>
          )}
        </Formik>
      )}
    </>
  );
};
