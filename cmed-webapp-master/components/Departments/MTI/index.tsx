import { Box, Grid, Pagination, Stack, Typography } from '@mui/material';
import { useTranslation } from 'next-i18next';
import { FC, useMemo, useState } from 'react';
import { useDoctorsQuery } from '../../../api/hooks/doctors';
import { useFavoriteDoctorsQuery } from '../../../api/hooks/favorite-doctors';
import { useGlobalState } from '../../../utilities/global-state';
import { DisabledWrapper } from '../../QuickActionsMenu/DisabledWrapper';
import SortBy from '../Doctors/components/SortBy';
import { ResidentCard } from './components';
import MtiSkeleton from './components/MtiSkeleton';

export const Mti: FC = () => {
  const { isLoggedIn } = useGlobalState();
  const [page, setPage] = useState<number>(1);
  const { data: mti, isLoading: isMtiLoading } = useDoctorsQuery();
  const { data: favorite } = useFavoriteDoctorsQuery({ enabled: isLoggedIn });
  const { t } = useTranslation('departments');

  const handleChangePage = (
    event: React.ChangeEvent<unknown>,
    value: number,
  ): void => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setPage(value);
  };

  const startMTIPerPage = (page - 1) * 9;
  const endMTIPerPage = startMTIPerPage + 9;
  const filteredMTI = useMemo(
    () => mti?.slice(startMTIPerPage, endMTIPerPage) ?? [],
    [mti, startMTIPerPage, endMTIPerPage],
  );
  const hasMTI = filteredMTI.length > 0;

  return (
    <Stack sx={{ marginLeft: '20px', width: '100%' }}>
      <Typography variant={'h4'} color={'error'}>
        {t('mtiTitle')}
      </Typography>
      <Typography variant={'subtitle1'}>{t('mtiBody')}</Typography>
      <DisabledWrapper isDisabled>
        <Box mt={'20px'}>
          <SortBy />
        </Box>
      </DisabledWrapper>
      <Grid height={'100%'} spacing={{ sm: '20px', xl: '35px' }} container>
        {isMtiLoading ? (
          Array.from(Array(20)).map((_, index) => (
            <Grid justifyContent={'space-between'} item xs={4} key={index}>
              <MtiSkeleton />
            </Grid>
          ))
        ) : hasMTI ? (
          filteredMTI.map((resident) => (
            <Grid justifyContent={'space-between'} item xs={4} key={resident.userId}>
              <ResidentCard
                resident={resident}
                favorite={
                  favorite?.find((f) => f.doctor.userId === resident.userId)
                    ?.favoriteDoctorId
                }
              />
            </Grid>
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
      </Grid>
      <Stack mt={'40px'} direction={'row'} justifyContent={'center'}>
        <Pagination
          count={mti && Math.ceil(mti.length / 9)}
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
