import { Box } from '@mui/material';
import { PickersDay, PickersDayProps } from '@mui/x-date-pickers';
import { Dayjs } from 'dayjs';
import { FormikValues } from 'formik';
import { FC, useState } from 'react';
import { EventProps } from '../../index';

interface EventListProps {
  day: Dayjs;
  pickerdData: PickersDayProps<Dayjs>;
  events?: EventProps[];
  values: FormikValues;
  setFieldValue: (field: string, value: any) => void;
}

export const EventList: FC<EventListProps> = ({
  day,
  pickerdData,
  events,
  values,
  setFieldValue,
}) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const event = values[day.format('YYYY-MM-DD')]?.slots.length > 0;

  const open = Boolean(anchorEl);

  const handleClick = (e: any) => {
    if (!open) {
      setAnchorEl(e.currentTarget);
    }
  };

  return (
    <Box
      onClick={handleClick}
      sx={{
        cursor: 'pointer',
      }}
      id={event ? 'available-slots-day' : 'picker-day'}
    >
      <PickersDay
        sx={{
          '&.Mui-selected, &[tabindex="0"], &.Mui-selected:focus': {
            backgroundColor: '#00534C',
            color: 'white',
          },
          ...(event && {
            background: '#00A04A',
            color: 'white',
          }),
        }}
        {...pickerdData}
        disableMargin
      />
    </Box>
  );
};
