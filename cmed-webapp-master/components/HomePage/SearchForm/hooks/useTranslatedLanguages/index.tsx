import React from 'react';
import { useLanguagesQuery } from '../../../../../api/hooks/languages/useLanguagesQuery';

export const useTranslatedLanguages = (translateKey: string) => {
  const { data: languages, isLoading } = useLanguagesQuery();

  const data = languages?.map((lang) => {
    return {
      id: lang.languageId,
      label: lang.languageName,
      value: lang.languageName,
      translateKey: translateKey,
    };
  });

  return { data, isLoading };
};
