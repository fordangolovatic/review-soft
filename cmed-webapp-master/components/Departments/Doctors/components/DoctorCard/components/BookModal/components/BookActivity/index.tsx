import { Box } from '@mui/material';
import { PickersDay, PickersDayProps } from '@mui/x-date-pickers';
import { Dayjs } from 'dayjs';
import { FormikValues } from 'formik';
import { FC, useState } from 'react';

interface BookActivityProps {
  day: Dayjs;
  pickerdData: PickersDayProps<Dayjs>;
  values: FormikValues;
}

export const BookActivity: FC<BookActivityProps> = ({
  day,
  pickerdData,
  values,
}) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const event = values[day.format('YYYY-MM-DD')]?.availableSlots?.length > 0;

  const open = Boolean(anchorEl);

  const handleClick = (e: any) => {
    if (!open) {
      setAnchorEl(e.currentTarget);
    }
  };
  return (
    <Box
      id={event ? 'available-slots-day' : 'picker-day'}
      onClick={handleClick}
      sx={{
        cursor: 'pointer',
      }}
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
