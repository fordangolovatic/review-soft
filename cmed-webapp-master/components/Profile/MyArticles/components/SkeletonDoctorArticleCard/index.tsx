import { Box, Divider, Skeleton } from '@mui/material';

const SkeletonDoctorArticleCard = () => {
  return (
    <Box className="skeleton_article">
      {Array.from(Array(10)).map((_, index) => (
        <Box className="skeleton_article__card" key={index} mt={{ sm: '20px' }}>
          <Box
            className="skeleton_article__card__content"
            display="flex"
            flexDirection="row"
            gap={1}
            width="100%"
          >
            {index % 2 === 0 && (
              <Skeleton
                className="skeleton_article__card__content__image"
                variant="rectangular"
                animation="wave"
                sx={{
                  minWidth: { sm: '128px', xl: '128px' },
                  height: { sm: '110px', xl: '110px' },
                  borderRadius: '8px',
                }}
              />
            )}

            <Box
              className="skeleton_article_card__content__container"
              display="flex"
              flexDirection="column"
              gap={1}
              width="100%"
              justifyContent="space-between"
            >
              <Box display="flex" flexDirection="column" gap={1} width="100%">
                <Skeleton
                  variant="rectangular"
                  animation="wave"
                  width="40%"
                  height={24}
                />

                <Skeleton
                  variant="rectangular"
                  animation="wave"
                  width="90%"
                  height={16}
                />

                <Skeleton
                  variant="rectangular"
                  animation="wave"
                  width="80%"
                  height={16}
                />

                <Skeleton
                  variant="rectangular"
                  animation="wave"
                  width="70%"
                  height={16}
                />
              </Box>

              <Skeleton
                variant="rectangular"
                animation="wave"
                width="25%"
                height={16}
              />
            </Box>

            <Box
              className="skeleton_article_card__content__controls"
              display="flex"
              flexDirection="column"
              gap="8px"
              width="20%"
              justifyContent="center"
            >
              <Skeleton
                variant="rectangular"
                animation="wave"
                width="100%"
                height={32}
                sx={{ borderRadius: '4px' }}
              />

              <Skeleton
                variant="rectangular"
                animation="wave"
                width="100%"
                height={32}
                sx={{ borderRadius: '4px' }}
              />

              <Skeleton
                variant="rectangular"
                animation="wave"
                width="100%"
                height={32}
                sx={{ borderRadius: '4px' }}
              />
            </Box>
          </Box>
          <Divider sx={{ marginTop: { sm: '20px' } }} flexItem />
        </Box>
      ))}
    </Box>
  );
};

export default SkeletonDoctorArticleCard;
