import { GridViewOutlined } from '@mui/icons-material';
import { FC, useMemo } from 'react';
import { useSpecialitiesQuery } from '../../../../api/hooks/specialities/useSpecialitiesQuery';
import { useGlobalState } from '../../../../utilities/global-state';
import { CollapsedMenu, FilterOption } from '../CollapseMenu';

export const SpecialitiesFilter: FC = () => {
  const { data: specialities, isLoading } = useSpecialitiesQuery();

  const { filters, selectedFilters, setSelectedFilters } = useGlobalState();
  const items = useMemo(() => {
    if (isLoading) return [];

    return specialities?.map((speciality) => ({
      id: speciality.specialityId,
      label: speciality.specialityName,
      value: speciality.specialityName,
      translateKey: 'sp-',
    }));
  }, [specialities, isLoading]);

  return (
    <CollapsedMenu
      title={'Specialities'}
      items={items}
      isLoading={isLoading}
      Icon={GridViewOutlined}
      initialValues={filters.specialities as FilterOption[]}
      onSelect={(updatedFilters) => {
        setSelectedFilters({ ...selectedFilters, specialities: updatedFilters });
      }}
    />
  );
};
