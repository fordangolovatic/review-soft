import { Box, SxProps, Theme, Typography } from '@mui/material';
import React, { ReactNode } from 'react';

type SkeletonCollectionProps = {
  id?: string;
  isLoading?: boolean;
  skeleton?: ReactNode;
  children?: ReactNode;
  errorMessage?: string | ReactNode;
  sx?: SxProps<Theme>;
};
export const SkeletonCollection: React.FC<SkeletonCollectionProps> = ({
  id,
  isLoading = false,
  skeleton,
  errorMessage,
  sx,
  children,
}) => {
  if (isLoading) {
    return <Box sx={sx}>{skeleton}</Box>;
  }

  if (errorMessage)
    return (
      <Box display="flex" height="100%" justifyContent="center">
        <Typography component="div" variant="body1">
          {errorMessage}
        </Typography>
      </Box>
    );

  return (
    <Box id={id} sx={sx}>
      {children}
    </Box>
  );
};
