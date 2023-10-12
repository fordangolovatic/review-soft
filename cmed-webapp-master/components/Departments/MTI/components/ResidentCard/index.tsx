import { FavoriteBorderOutlined, FavoriteOutlined } from '@mui/icons-material';
import { Box, Button, Chip, Stack, Typography } from '@mui/material';
import { upperFirst } from 'lodash';
import { useTranslation } from 'next-i18next';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { FC, useState } from 'react';
import {
  useAddFavoriteDoctorMutation,
  useRemoveFavoriteDoctorMutation,
} from '../../../../../api/hooks/favorite-doctors';
import { getInitials } from '../../../../../utilities/functions';
import { useGlobalState } from '../../../../../utilities/global-state';
import { IResidentCardProps } from '../../types';
import { BookModal, DoctorRating, ProfessionalInfo } from './components';

const ResidentCard: FC<IResidentCardProps> = ({ resident, profile, favorite }) => {
  const { isLoggedIn } = useGlobalState();
  const { asPath } = useRouter();
  const { t } = useTranslation('common');
  const { mutate: addFavoriteDoctorMutation } = useAddFavoriteDoctorMutation();
  const { mutate: removeFavoriteDoctorMutation } = useRemoveFavoriteDoctorMutation();

  const [openModal, setOpenModal] = useState(false);
  const handleOpenModal = (): void => {
    setOpenModal(true);
  };
  const handleCloseModal = (): void => {
    setOpenModal(false);
  };
  const handleFavoriteMTI = () => {
    if (favorite) return removeFavoriteDoctorMutation(favorite);

    addFavoriteDoctorMutation(parseInt(resident.userId));
  };

  return (
    <>
      <Stack height={'100%'} justifyContent={'space-between'}>
        <Stack spacing={{ sm: '11px' }}>
          <Box
            display={'flex'}
            justifyContent={'center'}
            alignItems={'center'}
            sx={{
              width: { sm: '100%', xl: '100%' },
              height: { sm: '236px', xl: '236px' },
              position: 'relative',
              background: '#EFEFEF',
              borderRadius: '8px',
              overflow: 'hidden',
              '& img': {
                position: 'relative !important',
              },
            }}
          >
            {resident.profileImage ? (
              <Image
                fill
                sizes={'100vw'}
                src={resident.profileImage}
                alt={'avatar'}
                style={{ objectFit: 'cover' }}
              />
            ) : (
              <Typography
                variant={'h2'}
                fontWeight={'700 !important'}
                sx={{ userSelect: 'none' }}
              >
                {getInitials(`${resident.firstName} ${resident.lastName}`)}
              </Typography>
            )}
            {isLoggedIn && (
              <Box
                id={'favorite-mti'}
                position={'absolute'}
                p={'2px'}
                top={'5px'}
                right={'5px'}
                display={'flex'}
                alignItems={'center'}
                bgcolor={'#FFFFFF4D'}
                borderRadius={'100%'}
                sx={{ cursor: 'pointer' }}
                onClick={handleFavoriteMTI}
              >
                {favorite ? (
                  <FavoriteOutlined color={'primary'} />
                ) : (
                  <FavoriteBorderOutlined color={'primary'} />
                )}
              </Box>
            )}
          </Box>
          <Stack>
            <Stack spacing={{ sm: '4px' }} direction={'row'} alignItems={'center'}>
              <Typography
                sx={{
                  paddingLeft: '2px',
                  whiteSpace: 'nowrap',
                  textOverflow: 'ellipsis',
                  overflow: 'hidden',
                }}
                variant={'subtitle1'}
              >
                {resident.firstName} {resident.lastName}
              </Typography>
              <Chip
                sx={{
                  fontSize: { sm: '10px' },
                  padding: { sm: '0px 7px' },
                  height: 'auto',
                }}
                size={'small'}
                label={upperFirst(resident.accountType)}
                color={'secondary'}
              />
            </Stack>
            <Stack
              height={'100%'}
              justifyContent={!profile ? 'space-between' : 'space-around'}
            >
              <Box>
                <DoctorRating
                  rate={resident.rating?.rate || 0}
                  consultations={resident.rating?.consultations || 0}
                />
              </Box>
              {!profile && (
                <Link href={`${asPath}/${resident.userId}`}>
                  <Typography
                    sx={{ textDecoration: 'underline' }}
                    variant={'body1'}
                    color={'secondary'}
                  >
                    {t('viewProfile')}
                  </Typography>
                </Link>
              )}
              <Box mt={'15px'}>
                <ProfessionalInfo {...resident} />
              </Box>
            </Stack>
          </Stack>
        </Stack>
        <Stack>
          <Stack
            mt={'20px'}
            alignItems={'center'}
            spacing={'8px'}
            style={{
              opacity: 0.25,
              pointerEvents: 'none',
            }}
          >
            <Typography variant={'subtitle1'}>
              {/* NOTE: We need to add this field on BE */}
              15$ / {t('session')}
            </Typography>
            <Typography color={'secondary'} variant={'body1'}>
              {t('available')}
            </Typography>
            <Button
              onClick={handleOpenModal}
              sx={{ padding: { sm: '8px 66px' }, width: '100%' }}
              variant={profile ? 'contained' : 'outlined'}
              color={profile ? 'secondary' : 'primary'}
            >
              {t('book')}
            </Button>
          </Stack>
        </Stack>
      </Stack>
      <BookModal resident={resident} opened={openModal} onClose={handleCloseModal} />
    </>
  );
};

export default ResidentCard;
