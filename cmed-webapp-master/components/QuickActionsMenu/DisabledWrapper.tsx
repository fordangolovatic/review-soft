import { Box, SxProps, Theme } from '@mui/material';
import { FC, ReactNode } from 'react';

type DisabledWrapperProps = {
  children: ReactNode;
  isDisabled?: boolean;
  sx?: SxProps<Theme>;
};

export const DisabledWrapper: FC<DisabledWrapperProps> = ({
  children,
  isDisabled,
  sx,
}) => {
  if (!isDisabled) {
    return <>{children}</>;
  }

  return (
    <Box sx={{ cursor: 'not-allowed', ...sx }}>
      <Box sx={{ opacity: 0.4, pointerEvents: 'none', ...sx }}>{children}</Box>
    </Box>
  );
};
