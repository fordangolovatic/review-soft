import { Skeleton, Stack } from '@mui/material';

export const DepartmentsSkeleton = () => {
  return (
    <Stack
      direction={'row'}
      flexWrap={'wrap'}
      justifyContent={'space-between'}
      rowGap={{ xs: '4px', sm: '2px', xl: '4px' }}
    >
      <Skeleton variant={'rectangular'} width={'49.9%'} height={'300px'} />
      <Skeleton variant={'rectangular'} width={'49.9%'} height={'300px'} />
      <Skeleton variant={'rectangular'} width={'49.9%'} height={'300px'} />
      <Skeleton variant={'rectangular'} width={'49.9%'} height={'300px'} />
    </Stack>
  );
};
