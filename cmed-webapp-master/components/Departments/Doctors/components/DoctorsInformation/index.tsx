import { Box, Stack } from '@mui/material';
import { FC } from 'react';
import LatestNews from '../../../../LatestNews';
import { Card, Doctors, Find } from './components';
import { data } from './data';

const DoctorsInformation: FC = () => {
  return (
    <>
      <Stack spacing={{ sm: '30px', xl: '40px' }}>
        <Doctors data={data.doctors} />
        <Find data={data.find} />
        <Stack spacing={{ sm: '15px', xl: '20px' }} direction={'row'}>
          {data.cards.map((card) => (
            <Card key={card.id} data={card} />
          ))}
        </Stack>
      </Stack>
      <Box mt={{ sm: '50px', xl: '70px' }}>
        <LatestNews />
      </Box>
    </>
  );
};

export default DoctorsInformation;
