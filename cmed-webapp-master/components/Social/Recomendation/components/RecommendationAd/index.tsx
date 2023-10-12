import { Box, Typography } from '@mui/material';
import Image from 'next/image';

export const RecommendationAd = () => {
  return (
    <Box
      position={'relative'}
      width={'100%'}
      height={'116px'}
      sx={{ cursor: 'pointer', userSelect: 'none' }}
    >
      <Image
        src={'/images/recommendation-image.png'}
        alt={'recommendation-ad'}
        fill
        style={{ objectFit: 'cover' }}
      />
      <Box
        width={'100%'}
        height={'100%'}
        position={'absolute'}
        sx={{
          background:
            'linear-gradient(360deg, #2E52B2 0%, rgba(46, 82, 178, 0) 50%)',
        }}
      />

      <Typography
        position={'absolute'}
        color={'#FFF'}
        maxWidth={'8rem'}
        left={'15px'}
        bottom={'15px'}
        variant={'h5'}
      >
        Best medical consultation
      </Typography>
    </Box>
  );
};
