import { Box, Stack } from '@mui/material';
import { FC } from 'react';
import LatestNews from '../../../../LatestNews';
import { Card, Doctors, Find } from './components';
import { mtiDepartmentInfo } from './data';

const MtiInformation: FC = () => {
  return (
    <>
      <Stack spacing={{ sm: '30px', xl: '40px' }}>
        <Doctors data={mtiDepartmentInfo.doctors} />
        <Find data={mtiDepartmentInfo.find} />
        <Stack spacing={{ sm: '15px', xl: '20px' }} direction={'row'}>
          {mtiDepartmentInfo.cards.map((card) => (
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

export default MtiInformation;
