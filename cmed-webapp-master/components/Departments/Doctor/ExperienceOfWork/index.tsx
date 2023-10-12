import { Button, Divider, Stack, Typography } from '@mui/material';
import dayjs from 'dayjs';
import { FC, useState } from 'react';
import { ProfessionalExperience } from '../../Doctors/types';

interface ExperienceOfWorkProps {
  experience: ProfessionalExperience[];
}

const ExperienceOfWork: FC<ExperienceOfWorkProps> = ({ experience }) => {
  const [defaultRows, setDefaultRows] = useState(5);
  const onMoreHandler = (): void => {
    setDefaultRows((prevState) => prevState + 5);
  };

  return (
    <Stack spacing={{ sm: '15px', xl: '20px' }}>
      <Typography variant={'h4'} color={'secondary.dark'}>
        Experience of Work
      </Typography>

      <Stack width={'70%'}>
        <Stack mb={'10px'} direction={'row'}>
          <Typography variant={'body1'} color={'secondary'} width={'calc(100% /3)'}>
            Specialities
          </Typography>

          <Typography variant={'body1'} color={'secondary'} width={'calc(100% /3)'}>
            Place
          </Typography>

          <Typography variant={'body1'} color={'secondary'} width={'calc(100% /3)'}>
            Date
          </Typography>
        </Stack>
        <Divider />
        <Stack spacing={{ sm: '15px', xl: '20px' }} mt={{ sm: '15px', xl: '20px' }}>
          {experience.slice(0, defaultRows).map((row) => (
            <Stack key={row.professionalExperienceId} direction={'row'}>
              <Typography
                variant={'body1'}
                color={'secondary.dark'}
                width={'calc(100% /3)'}
              >
                {row.speciality}
              </Typography>

              <Typography variant={'body1'} width={'calc(100% /3)'}>
                {row.location}
              </Typography>

              <Typography
                variant={'body1'}
                color={'#818181'}
                width={'calc(100% /3)'}
              >
                {dayjs(row.startDate).format('MMM YYYY')}
                {' - '}
                {row.isOngoing
                  ? 'Present'
                  : row.endDate && dayjs(row.endDate).format('MMM YYYY')}
              </Typography>
            </Stack>
          ))}
        </Stack>
      </Stack>

      {defaultRows !== experience.length && (
        <Button
          sx={{ width: 'fit-content', padding: '15px 50px' }}
          variant={'outlined'}
          color={'primary'}
          onClick={onMoreHandler}
        >
          Show more
        </Button>
      )}
    </Stack>
  );
};

export default ExperienceOfWork;
