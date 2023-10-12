import { TextsmsOutlined } from '@mui/icons-material';
import { FC, useMemo } from 'react';
import { useLanguagesQuery } from '../../../../api/hooks/languages/useLanguagesQuery';
import { useGlobalState } from '../../../../utilities/global-state';
import { CollapsedMenu, FilterOption } from '../CollapseMenu';

export const LanguagesFilter: FC = () => {
  const { data: languages, isLoading } = useLanguagesQuery();

  const { filters, selectedFilters, setSelectedFilters } = useGlobalState();

  const items = useMemo(() => {
    if (isLoading) return [];

    return languages?.map((language) => ({
      id: language.languageId,
      label: language.languageName,
      value: language.languageName,
      translateKey: 'lg-',
    }));
  }, [languages, isLoading]);

  return (
    <CollapsedMenu
      title={'Languages'}
      items={items}
      isLoading={isLoading}
      initialValues={filters.languages as FilterOption[]}
      Icon={TextsmsOutlined}
      onSelect={(updatedFilters) => {
        setSelectedFilters({
          ...selectedFilters,
          languages: updatedFilters,
        });
      }}
    />
  );
};
