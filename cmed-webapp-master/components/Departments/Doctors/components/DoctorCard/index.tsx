import { FavoriteBorderOutlined, FavoriteRounded } from '@mui/icons-material';
import { Box, Button, Chip, Stack, Typography } from '@mui/material';
import dayjs from 'dayjs';
import { upperFirst } from 'lodash';
import { useTranslation } from 'next-i18next';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { FC, useCallback, useMemo, useState } from 'react';
import {
  useAddFavoriteDoctorMutation,
  useRemoveFavoriteDoctorMutation,
} from '../../../../../api/hooks/favorite-doctors';
import { getInitials } from '../../../../../utilities/functions';
import { useGlobalState } from '../../../../../utilities/global-state';
import { Doctor } from '../../types';
import { BookModal, DoctorRating, ProfessionalInfo } from './components';

interface DoctorCardProps {
  doctor: Doctor;
  isProfile?: boolean;
  favorite?: number;
}

const DoctorCard: FC<DoctorCardProps> = ({ doctor, isProfile, favorite }) => {
  const { isLoggedIn, setIsAuthMethod } = useGlobalState();
  const { asPath } = useRouter();
  const { t } = useTranslation('common');
  const [openModal, setOpenModal] = useState(false);
  const { mutate: addFavoriteDoctorMutation } = useAddFavoriteDoctorMutation();
  const { mutate: removeFavoriteDoctorMutation } = useRemoveFavoriteDoctorMutation();

  let isDoctorAvailable = false;

  isDoctorAvailable = useMemo(
    () =>
      doctor?.activityProgram.filter((dayProgram) => {
        const slots = dayProgram?.slots ?? [];
        return slots.length > 0 && dayjs().isBefore(dayProgram.date);
      }).length > 0,
    [doctor.activityProgram],
  );

  const lowestPrice = useMemo(() => {
    const prices = doctor?.activityProgram
      .map((dayProgram) => +dayProgram.price)
      .sort((first, second) => first - second);

    return prices?.[0];
  }, [doctor?.activityProgram]);

  const handleOpenModal = useCallback(() => {
    setOpenModal(true);
  }, []);

  const handleCloseModal = useCallback(() => {
    setOpenModal(false);
  }, []);

  const handleFavoriteDoctor = () => {
    if (favorite) return removeFavoriteDoctorMutation(favorite);

    addFavoriteDoctorMutation(parseInt(doctor.userId));
  };

  return (
    <>
      <Stack width={'100%'} direction={'row'} justifyContent={'space-between'}>
        <Stack width={'100%'} spacing={{ sm: '11px' }} direction={'row'}>
          <Box
            display={'flex'}
            justifyContent={'center'}
            alignItems={'center'}
            sx={{
              width: { sm: '158px', xl: '238px' },
              height: { sm: '158px', xl: '238px' },
              position: 'relative',
              background: '#EFEFEF',
              borderRadius: '8px',
              overflow: 'hidden',
            }}
          >
            {doctor.profileImage ? (
              <Image
                fill
                src={doctor.profileImage}
                alt="No image"
                style={{ objectFit: 'cover' }}
              />
            ) : (
              <Typography
                variant={'h2'}
                fontWeight={'700 !important'}
                sx={{ userSelect: 'none' }}
              >
                {getInitials(`${doctor.firstName} ${doctor.lastName}`)}
              </Typography>
            )}
          </Box>

          <Stack>
            <Stack spacing={{ sm: '4px' }} direction={'row'} alignItems={'center'}>
              <Typography sx={{ paddingLeft: '2px' }} variant={'subtitle1'}>
                {doctor.firstName} {doctor.lastName}
              </Typography>

              <Chip
                sx={{
                  fontSize: { sm: '7px' },
                  padding: { sm: '0px 7px' },
                  height: 'auto',
                }}
                size={'small'}
                label={upperFirst(doctor.accountType)}
                color={'darkGreen'}
              />
            </Stack>

            <Stack
              height={'100%'}
              justifyContent={!isProfile ? 'space-between' : 'space-around'}
            >
              <Box>
                <DoctorRating
                  rate={doctor.rating?.rate || 0}
                  consultations={doctor.rating?.consultations || 0}
                />
              </Box>

              <ProfessionalInfo
                specialities={doctor.specialities}
                languages={doctor.languages}
                country={doctor.country}
                yearsExperience={doctor?.professionalInfo?.experienceInYears || 0}
              />

              {!isProfile && (
                <Link href={`${asPath}/${doctor.userId}`}>
                  <Typography variant={'body1'} color={'secondary'}>
                    {t('viewProfile')}
                  </Typography>
                </Link>
              )}
            </Stack>
          </Stack>
        </Stack>

        <Stack alignItems={'flex-end'} justifyContent={'space-between'}>
          {isLoggedIn && (
            <Stack
              id={'favorite-doctor'}
              sx={{ cursor: 'pointer' }}
              spacing={'5px'}
              direction={'row'}
              alignItems={'center'}
              onClick={handleFavoriteDoctor}
            >
              <Typography variant={'body2'} color={'primary'}>
                {t('saveToFavorites')}
              </Typography>

              {favorite ? (
                <FavoriteRounded fontSize={'small'} color={'primary'} />
              ) : (
                <FavoriteBorderOutlined fontSize={'small'} color={'primary'} />
              )}
            </Stack>
          )}

          <Stack spacing={'8px'} alignItems={'flex-end'}>
            {lowestPrice && (
              <Typography variant={'subtitle1'} width={'max-content'}>
                {t('startingFrom')} {lowestPrice}$ / {t('session')}
              </Typography>
            )}

            <Typography variant={'body1'}>
              {t(isDoctorAvailable ? t('available') : t('unavailable'))}
            </Typography>

            <Button
              id={'book'}
              disabled={!isDoctorAvailable}
              onClick={
                isLoggedIn
                  ? handleOpenModal
                  : () =>
                      setIsAuthMethod({
                        open: true,
                        type: 'sign-in',
                        redirect: asPath,
                      })
              }
              sx={{ padding: { sm: '8px 66px' } }}
              variant={isProfile ? 'contained' : 'outlined'}
              color={isProfile ? 'secondary' : 'primary'}
            >
              {t('book')}
            </Button>
          </Stack>
        </Stack>
      </Stack>

      <BookModal doctor={doctor} opened={openModal} onClose={handleCloseModal} />
    </>
  );
};

export default DoctorCard;
