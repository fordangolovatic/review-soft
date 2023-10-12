import { Divider, Stack, Typography } from '@mui/material';
import { useFavoriteDoctorsQuery } from '../../../api/hooks/favorite-doctors';
import { useGlobalState } from '../../../utilities/global-state';
import { DoctorCard } from '../../Departments/Doctors/components';
import DoctorSkeleton from '../../Departments/Doctors/components/DoctorCard/components/DoctorSkeleton';
import { SkeletonCollection } from '../../SkeletonCollection';

const FavoriteDoctors = () => {
  const { isLoggedIn } = useGlobalState();
  const { data: favoriteDoctors, isLoading: isFavoriteDoctorsLoading } =
    useFavoriteDoctorsQuery({ enabled: isLoggedIn });
  const hasDoctors = favoriteDoctors && favoriteDoctors.length > 0;

  return (
    <Stack minWidth={'100%'} minHeight={'108rem'} height={'100%'}>
      <SkeletonCollection
        isLoading={isFavoriteDoctorsLoading}
        skeleton={<DoctorSkeleton />}
      >
        {hasDoctors ? (
          favoriteDoctors.map((doctor) => (
            <Stack width={'100%'} key={doctor.doctor.userId} mt={{ sm: '20px' }}>
              <DoctorCard
                doctor={doctor.doctor}
                favorite={doctor.favoriteDoctorId}
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
            mt={2}
          >
            <Typography variant={'body2'}>
              Sorry, there are no results for favorite doctors.
            </Typography>
          </Stack>
        )}
      </SkeletonCollection>
    </Stack>
  );
};

export default FavoriteDoctors;
