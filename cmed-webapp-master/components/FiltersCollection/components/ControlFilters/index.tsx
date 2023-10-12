import { ImmutableObject } from '@hookstate/core';
import { Button, Stack } from '@mui/material';
import { useTranslation } from 'next-i18next';
import { FC, useCallback, useMemo } from 'react';
import { useGlobalState } from '../../../../utilities/global-state';
import { SetFilterOption } from '../CollapseMenu';

interface ControlFiltersProps {
  reset?: boolean;
  apply?: boolean;
}

const ControlFilters: FC<ControlFiltersProps> = ({ reset = true, apply = true }) => {
  const { t } = useTranslation();

  const { filters, setFilters, selectedFilters, setSelectedFilters } =
    useGlobalState();

  const hasSelectedFilters = useMemo(
    () =>
      Object.values(selectedFilters).some(
        (filter) => Array.isArray(filter) && filter.length > 0,
      ),
    [selectedFilters],
  );

  const hasFilters = useMemo(
    () =>
      Object.values(filters).some(
        (filter) => Array.isArray(filter) && filter.length > 0,
      ),
    [filters],
  );

  const resetFilterObject = (filters: ImmutableObject<SetFilterOption>) => {
    return Object.keys(filters).reduce(
      (filterObject: SetFilterOption, filter: string) => (
        (filterObject[filter] = []), filterObject
      ),
      {},
    );
  };

  const handleReset = () => {
    setSelectedFilters(resetFilterObject(selectedFilters));
    setFilters(resetFilterObject(filters));
  };

  const handleApply = useCallback(() => {
    setFilters(selectedFilters);
  }, [filters, selectedFilters]);

  return (
    <Stack width={'100%'} mt={2} direction={'row'} gap={1}>
      {reset && hasFilters && (
        <Button fullWidth variant={'outlined'} onClick={handleReset}>
          {t('b-reset')}
        </Button>
      )}

      {apply && hasSelectedFilters && (
        <Button
          fullWidth
          variant={'outlined'}
          color={'darkGreen'}
          onClick={handleApply}
        >
          {t('b-apply')}
        </Button>
      )}
    </Stack>
  );
};

export default ControlFilters;
