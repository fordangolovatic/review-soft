import { CalendarMonthOutlined } from '@mui/icons-material';
import { FC } from 'react';
import { useGlobalState } from '../../../../utilities/global-state';
import { CollapsedMenu } from '../CollapseMenu';

export const index = {
  id: 4,
  title: 'Period',
  Icon: CalendarMonthOutlined,
  items: [
    {
      id: 1,
      label: 'All times',
      value: 'all times',
      translateKey: 'pr-',
    },
    {
      id: 2,
      label: 'Tomorrow',
      value: new Date(new Date().getTime() + 24 * 60 * 60 * 1000).toUTCString(),
      translateKey: 'pr-',
    },
    {
      id: 3,
      label: 'This week',
      value: new Date(
        new Date().getTime() + (7 - new Date().getDay()) * 24 * 60 * 60 * 1000,
      ).toUTCString(),
      translateKey: 'pr-',
    },
    {
      id: 4,
      label: 'Next Week',
      value: new Date(
        new Date().getTime() + (14 - new Date().getDay()) * 24 * 60 * 60 * 1000,
      ).toUTCString(),
      translateKey: 'pr-',
    },
  ],
};

export const PeriodFilter: FC = () => {
  const { selectedFilters, setSelectedFilters } = useGlobalState();
  return (
    <CollapsedMenu
      {...index}
      onSelect={(updatedFilters) =>
        setSelectedFilters({ ...selectedFilters, periods: updatedFilters })
      }
    />
  );
};
