import { Box, Divider, Skeleton } from '@mui/material';
import { FC } from 'react';

const FavoriteArticleCardSkeleton: FC = () => {
  return (
    <Box>
      {Array.from(Array(10)).map((_, index) => (
        <Box key={index} mt={{ sm: '20px' }}>
          <Box display="flex" flexDirection="row" gap={1} width="100%">
            <Skeleton
              variant="rectangular"
              animation="wave"
              sx={{
                minWidth: { sm: '200px', xl: '265px' },
                minHeight: { sm: '200px', xl: '265px' },
              }}
            />
            <Box
              display="flex"
              flexDirection="column"
              gap={1}
              width="100%"
              justifyContent={'space-between'}
            >
              <Box display="flex" flexDirection="column" gap={1} width="100%">
                <Skeleton
                  variant="rectangular"
                  animation="wave"
                  width="40%"
                  height={20}
                />
                <Skeleton
                  variant="rectangular"
                  animation="wave"
                  width="70%"
                  height={20}
                />
              </Box>

              <Box display="flex" flexDirection="column" gap={1} width="100%">
                <Skeleton
                  variant="rectangular"
                  animation="wave"
                  width="100%"
                  height={20}
                />
                <Skeleton
                  variant="rectangular"
                  animation="wave"
                  width="100%"
                  height={20}
                />
                <Skeleton
                  variant="rectangular"
                  animation="wave"
                  width="100%"
                  height={20}
                />
              </Box>

              <Box
                display="flex"
                flexDirection="row"
                justifyContent="space-between"
                alignItems="center"
              >
                <Box width="100%" display="flex" flexDirection="row" gap={'30px'}>
                  <Skeleton
                    variant="rectangular"
                    animation="wave"
                    width="20%"
                    height={20}
                  />
                  <Skeleton
                    variant="rectangular"
                    animation="wave"
                    width="20%"
                    height={20}
                  />
                  <Skeleton
                    variant="rectangular"
                    animation="wave"
                    width="20%"
                    height={20}
                  />
                </Box>

                <Skeleton
                  variant="rectangular"
                  animation="wave"
                  width="35%"
                  height={32}
                />
              </Box>
            </Box>
          </Box>
          <Divider sx={{ marginTop: { sm: '20px' } }} flexItem />
        </Box>
      ))}
    </Box>
  );
};

export default FavoriteArticleCardSkeleton;
