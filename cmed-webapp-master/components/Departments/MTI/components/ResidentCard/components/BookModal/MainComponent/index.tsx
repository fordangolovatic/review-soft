import { Box, Stack } from '@mui/material';
import { Dayjs } from 'dayjs';
import React, { FC, useEffect, useState } from 'react';
import { Resident } from '../../../../../types';
import { Calendar, ConsultationTimePicker, DoctorInfo } from '../components';

interface IMainComponent {
  resident: Resident;
  getValue: (value: number[]) => void;
}

const MainComponent: FC<IMainComponent> = ({ resident, getValue }) => {
  const [calendarDate, setCalendarDay] = React.useState<Dayjs | null>(null);
  const [pickedDate, setPickedDate] = useState<number[]>([]);
  useEffect(() => {
    getValue(pickedDate);
  }, [pickedDate]);
  const onPickedHandle = (id: number): void => {
    pickedDate.includes(id)
      ? setPickedDate(pickedDate.filter((pick) => pick !== id))
      : setPickedDate([...pickedDate, id]);
  };
  return (
    <Stack spacing={{ sm: '20px', xl: '30px' }} direction={'row'}>
      <Box>
        <DoctorInfo resident={resident} />
      </Box>
      <Box>
        <Calendar value={calendarDate} onChange={setCalendarDay} />
      </Box>
      <ConsultationTimePicker
        onPick={onPickedHandle}
        picked={pickedDate}
        date={calendarDate}
      />
    </Stack>
  );
};

export default MainComponent;
