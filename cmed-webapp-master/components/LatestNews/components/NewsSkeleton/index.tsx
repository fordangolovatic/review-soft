import { Box, Skeleton } from '@mui/material';
import { FC } from 'react';

const NewsSkeleton: FC = () => {
  return (
    <Box display="flex" flexDirection="column">
      <Skeleton animation="wave" variant="rectangular" width="30%" height={36} />
      <Box
        display="flex"
        flexDirection="column"
        sx={{
          mt: '30px',
          borderRadius: '10px',
          filter: 'drop-shadow(0px 0px 50px rgba(0, 0, 0, 0.07))',
        }}
        flex={1}
        overflow="hidden"
      >
        <Skeleton
          animation="wave"
          variant="rectangular"
          width="100%"
          sx={{ height: { sm: '182px', xl: '278px' }, position: 'relative' }}
        />

        <Box display="flex" padding={{ sm: '20px' }}>
          <Box width="100%" display="flex" flexDirection="column" gap="8px">
            <Box display="flex" flexDirection="row" gap="8px" alignItems="center">
              <Skeleton
                animation="wave"
                variant="rectangular"
                width="5%"
                height="24px"
              />
              <Skeleton
                animation="wave"
                variant="rectangular"
                width="10%"
                height="24px"
              />
            </Box>

            <Box display="flex" flexDirection="column" gap="6px">
              <Skeleton
                animation="wave"
                variant="rectangular"
                width="15%"
                height="16px"
              />
              <Skeleton
                animation="wave"
                variant="rectangular"
                width="10%"
                height="13px"
              />
            </Box>

            <Box
              mt={2}
              display="flex"
              flexDirection="row"
              justifyContent="space-between"
              alignItems="center"
            >
              <Skeleton animation="wave" variant="rectangular" width="30%" />
              <Skeleton
                animation="wave"
                variant="rectangular"
                width="10%"
                height="34px"
              />
            </Box>
          </Box>
        </Box>
      </Box>

      <Box
        display="flex"
        flexDirection="row"
        justifyContent="center"
        gap="3px"
        mt={'30px'}
      >
        <Skeleton animation="wave" variant="circular" width={10} height={10} />
      </Box>
    </Box>
  );
};

export default NewsSkeleton;
