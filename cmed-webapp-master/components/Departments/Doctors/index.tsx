import { Box, Divider, Pagination, Stack, Typography } from '@mui/material';
import { useTranslation } from 'next-i18next';
import { ChangeEvent, FC, useMemo, useState } from 'react';
import { useDoctorsQuery } from '../../../api/hooks/doctors';
import { useFavoriteDoctorsQuery } from '../../../api/hooks/favorite-doctors';
import { useGlobalState } from '../../../utilities/global-state';
import { SkeletonCollection } from '../../SkeletonCollection';
import { DoctorCard } from './components';
import DoctorSkeleton from './components/DoctorCard/components/DoctorSkeleton';
import SortBy from './components/SortBy';

export const Doctors: FC = () => {
  const { isLoggedIn } = useGlobalState();
  const [page, setPage] = useState<number>(1);
  const { t } = useTranslation('departments');
  const { data: doctors, isLoading: isDoctorsLoading } = useDoctorsQuery();
  const { data: favorites } = useFavoriteDoctorsQuery({ enabled: isLoggedIn });

  const handleChangePage = (event: ChangeEvent<unknown>, value: number): void => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setPage(value);
  };

  const startDoctorsPerPage = (page - 1) * 10;
  const endDoctorsPerPage = startDoctorsPerPage + 10;

  const filteredDoctors = useMemo(
    () => doctors?.slice(startDoctorsPerPage, endDoctorsPerPage) ?? [],
    [doctors, startDoctorsPerPage, endDoctorsPerPage],
  );
  const hasDoctors = filteredDoctors.length > 0;

  return (
    <Stack sx={{ marginLeft: '20px', width: '100%' }}>
      <Typography variant={'h4'} color={'error'}>
        {t('contentTitle')}
      </Typography>

      <Typography variant={'subtitle1'}>{t('contentBody')}</Typography>

      <Box mt={'20px'}>
        <SortBy />
      </Box>

      <Stack minWidth={'100%'} minHeight={'108rem'} height={'100%'}>
        <SkeletonCollection
          id={'doctor-container'}
          isLoading={isDoctorsLoading}
          skeleton={<DoctorSkeleton />}
        >
          {hasDoctors ? (
            filteredDoctors.map((doctor) => (
              <Stack width={'100%'} key={doctor.userId} mt={{ sm: '20px' }}>
                <DoctorCard
                  doctor={doctor}
                  favorite={
                    favorites?.find((f) => f.doctor.userId === doctor.userId)
                      ?.favoriteDoctorId
                  }
                />

                <Divider sx={{ marginTop: { sm: '20px' } }} flexItem />
              </Stack>
            ))
          ) : (
            <Stack
              width={'100%'}
              height={'100%'}
              justifyContent={'center'}
              alignItems={'center'}
            >
              <Typography variant={'body2'}>
                Sorry, there are no results that match your selected filters. Please
                try again with different filters.
              </Typography>
            </Stack>
          )}
        </SkeletonCollection>
      </Stack>

      <Stack mt={'40px'} direction={'row'} justifyContent={'center'}>
        <Pagination
          count={doctors && Math.ceil(doctors.length / 10)}
          onChange={handleChangePage}
          page={page}
          color={'secondary'}
          hidePrevButton
          hideNextButton
        />
      </Stack>
    </Stack>
  );
};
