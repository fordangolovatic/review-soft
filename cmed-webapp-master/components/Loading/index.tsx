import { Box, CircularProgress, Stack, Typography } from '@mui/material';
import React from 'react';

const Loading = ({
  suppressHydrationWarning,
}: {
  suppressHydrationWarning: boolean;
}) => {
  return (
    <Box
      suppressHydrationWarning={suppressHydrationWarning}
      height="100%"
      display="flex"
      flexDirection="column"
    >
      <Stack
        height="100%"
        flexGrow={1}
        suppressHydrationWarning={suppressHydrationWarning}
        alignItems={'center'}
        justifyContent={'center'}
      >
        <Typography suppressHydrationWarning={suppressHydrationWarning}>
          <CircularProgress />
        </Typography>
      </Stack>
    </Box>
  );
};

export default Loading;
