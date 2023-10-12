import { Box, styled, SxProps, Theme } from '@mui/material';
import React, { FC, ReactNode } from 'react';

interface IPaper {
  children?: ReactNode;
  padding?: string;
  bg?: string;
  margin?: string;
  br?: string;
  sx?: SxProps<Theme>;
}

const PaperWrapper: FC<IPaper> = ({ children, padding, bg, margin, br, sx }) => {
  const Paper = styled(Box)(() => ({
    padding: padding,
    margin: margin,
    borderRadius: br ? br : '100px',
  }));
  return (
    <Paper sx={sx} bgcolor={bg}>
      {children}
    </Paper>
  );
};

export default PaperWrapper;
