import React from 'react';
import { useSpecialitiesQuery } from '../../../../../api/hooks/specialities/useSpecialitiesQuery';

export const useTranslatedSpecialities = (translateKey: string) => {
  const { data: specialities, isLoading } = useSpecialitiesQuery();

  const data = specialities?.map((sp) => {
    return {
      id: sp.specialityId,
      label: sp.specialityName,
      value: sp.specialityName,
      translateKey: translateKey,
    };
  });

  return {
    data,
    isLoading,
  };
};
