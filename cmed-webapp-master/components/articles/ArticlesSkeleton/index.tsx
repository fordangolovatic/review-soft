import { Box, Grid, Skeleton } from '@mui/material';

export const ArticlesSkeleton = () => {
  return (
    <Box>
      <Box
        display="flex"
        flexDirection="row"
        justifyContent="space-between"
        alignItems="center"
      >
        <Skeleton animation="wave" variant="rectangular" width="40%" height={28} />
        <Skeleton animation="wave" variant="rectangular" width="15%" height={28} />
      </Box>

      <Box my={{ sm: '30px', xl: '40px' }}>
        <Skeleton animation="wave" variant="rectangular" width="10%" height={32} />
      </Box>

      <Grid spacing={{ sm: '20px', xl: '30px' }} container>
        {Array.from(Array(4)).map((article, index) => (
          <Grid item key={index} xs={6}>
            <Box
              boxShadow={'0px 0px 50px rgb(0 0 0 / 7%)'}
              borderRadius={'10px'}
              width={'100%'}
              bgcolor={'background.paper'}
            >
              <Box display="flex" flexDirection="column">
                <Skeleton
                  animation="wave"
                  variant="rectangular"
                  width={'100%'}
                  sx={{
                    position: 'relative',
                    overflow: 'hidden',
                    height: { sm: '200px', xl: '275px' },
                    borderRadius: '10px 10px 0px 0',
                  }}
                />

                <Box
                  display="flex"
                  flexDirection="column"
                  sx={{
                    gap: { sm: '10px', xl: '16px' },
                    padding: { sm: '10px 15px', xl: '20px 25px' },
                  }}
                >
                  <Box
                    display="flex"
                    flexDirection="row"
                    justifyContent="space-between"
                    alignItems="center"
                  >
                    <Skeleton animation="wave" variant="rectangular" width="10%" />
                    <Skeleton animation="wave" variant="rectangular" width="20%" />
                  </Box>

                  <Box display="flex" flexDirection="column" gap="2px">
                    <Skeleton animation="wave" variant="rectangular" width="20%" />
                    <Skeleton animation="wave" variant="rectangular" width="20%" />
                  </Box>

                  <Box
                    display="flex"
                    flexDirection="column"
                    gap="2px"
                    sx={{ height: { sm: '130px', xl: '175px' } }}
                  >
                    <Skeleton animation="wave" variant="rectangular" width="100%" />
                    <Skeleton animation="wave" variant="rectangular" width="100%" />
                    <Skeleton animation="wave" variant="rectangular" width="40%" />
                  </Box>

                  <Box
                    width="100%"
                    display="flex"
                    flexDirection="row"
                    rowGap="10px"
                    alignItems="center"
                    justifyContent="space-between"
                    flexWrap={{ sm: 'wrap' }}
                  >
                    <Skeleton animation="wave" variant="rectangular" width="30%" />
                    <Skeleton animation="wave" variant="rectangular" width="30%" />
                    <Skeleton animation="wave" variant="rectangular" width="30%" />
                  </Box>

                  <Skeleton
                    animation="wave"
                    variant="rectangular"
                    width="100%"
                    height={25}
                  />
                </Box>
              </Box>
            </Box>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};
