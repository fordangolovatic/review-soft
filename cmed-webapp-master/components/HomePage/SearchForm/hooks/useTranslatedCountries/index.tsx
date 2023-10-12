import React from 'react';
import { useCountriesQuery } from '../../../../../api/hooks/locations';

export const useTranslatedCountries = (translateKey: string) => {
  const { data: countries, isLoading } = useCountriesQuery();

  const data = countries?.map((cy) => {
    return {
      id: cy.countryId,
      label: cy.countryName,
      value: cy.countryName,
      translateKey: translateKey,
    };
  });

  return { data, isLoading };
};
