import { PlaceOutlined } from '@mui/icons-material';
import { FC, useMemo } from 'react';
import { useCountriesQuery } from '../../../../api/hooks/locations';
import { useGlobalState } from '../../../../utilities/global-state';
import { CollapsedMenu, FilterOption } from '../CollapseMenu';

export const CountriesFilter: FC = () => {
  const { data: countries, isLoading } = useCountriesQuery();

  const { filters, selectedFilters, setSelectedFilters } = useGlobalState();

  const items = useMemo(() => {
    if (isLoading) return [];

    return countries?.map((country) => ({
      id: country.countryId,
      label: country.countryName,
      value: country.countryName,
      translateKey: 'cy-',
    }));
  }, [countries, isLoading]);

  return (
    <CollapsedMenu
      title={'Countries'}
      items={items}
      isLoading={isLoading}
      Icon={PlaceOutlined}
      initialValues={filters.countries as FilterOption[]}
      onSelect={(updatedFilters) => {
        setSelectedFilters({
          ...selectedFilters,
          countries: updatedFilters,
        });
      }}
    />
  );
};
