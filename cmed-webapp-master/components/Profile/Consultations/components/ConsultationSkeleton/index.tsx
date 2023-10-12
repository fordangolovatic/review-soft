import { Box, Grid, Skeleton } from '@mui/material';

export const ConsultationsSkeleton = () => {
  return (
    <Box>
      {Array.from(Array(4)).map((article, index) => (
        <Box
          display="flex"
          flexDirection="row"
          justifyContent="space-between"
          alignItems="center"
          my={{ sm: '30px', xl: '40px' }}
          key={index}
        >
          <Skeleton animation="wave" variant="rectangular" width="10%" height={28} />
          <Skeleton animation="wave" variant="rectangular" width="12%" height={28} />
          <Skeleton animation="wave" variant="rectangular" width="8%" height={28} />

          <Skeleton animation="wave" variant="rectangular" width="15%" height={28} />

          <Skeleton animation="wave" variant="rectangular" width="15%" height={28} />

          <Skeleton animation="wave" variant="rectangular" width="15%" height={28} />
        </Box>
      ))}
    </Box>
  );
};
