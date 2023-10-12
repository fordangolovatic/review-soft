import { AddLocationOutlined, MedicalServicesOutlined } from '@mui/icons-material';
import { Avatar, Box, Card, Link as MLink, Stack, Typography } from '@mui/material';
import { capitalize } from 'lodash';
import { Metadata } from '../../../api/hooks/metadata/useMetadataQuery';
import { getInitials } from '../../../utilities/functions';
import { SkeletonCollection } from '../../SkeletonCollection';
import ProfileSkeleton from './components/ProfileSkeleton';

interface ISocialProfile {
  profileData?: Metadata;
  isLoading?: boolean;
  isLogged?: boolean;
}

const SocialProfile = ({ profileData, isLoading }: ISocialProfile) => {
  return (
    <SkeletonCollection isLoading={isLoading} skeleton={<ProfileSkeleton />}>
      <Card
        variant={'outlined'}
        sx={{
          padding: '20px',
          height: 'max-content',
          display: { xs: 'none', md: 'block' },
        }}
      >
        <Stack gap={'20px'}>
          <Stack direction={'row'} gap={'12px'} alignItems={'center'}>
            {profileData?.profileImage ? (
              <Avatar
                srcSet={profileData.profileImage}
                sx={{ width: { sm: '40px', xl: '60px' }, height: 'auto' }}
              />
            ) : (
              <Box
                bgcolor={'#EFEFEF'}
                display={'flex'}
                justifyContent={'center'}
                alignItems={'center'}
                sx={{
                  width: { sm: '40px', xl: '60px' },
                  height: { sm: '40px', xl: '60px' },
                  borderRadius: '50%',
                }}
              >
                <Typography sx={{ userSelect: 'none' }}>
                  {getInitials(`${profileData?.firstName} ${profileData?.lastName}`)}
                </Typography>
              </Box>
            )}

            <Stack>
              <Typography variant={'body1'}>
                {profileData?.firstName} {profileData?.lastName}
              </Typography>
              <Typography variant={'body2'} color={'#818181'}>
                {capitalize(profileData?.accountType)}
              </Typography>
            </Stack>
          </Stack>

          <Stack direction={'row'} alignItems={'center'} gap={'10px'}>
            <AddLocationOutlined sx={{ color: '#00A04A' }} />
            <Typography variant={'body1'}>United Kingdom</Typography>
          </Stack>
          <Stack direction={'row'} alignItems={'center'} gap={'10px'}>
            <MedicalServicesOutlined sx={{ color: '#00A04A' }} />
            <Typography variant={'body1'}>Gastrolog, Pediatry</Typography>
          </Stack>
          <Stack textAlign={'end'}>
            <MLink color={'#00534C'} href={'profile?tab=personal-information'}>
              Edit
            </MLink>
          </Stack>
        </Stack>
      </Card>
    </SkeletonCollection>
  );
};

export default SocialProfile;
