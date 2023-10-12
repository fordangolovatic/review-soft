import { Box, Button, Stack, Typography } from '@mui/material';
import Image from 'next/image';
import { FC } from 'react';

interface NotificationProps {
  title: string;
  description?: string;
  banner?: string;
  onAccept?: () => void;
  onReject?: () => void;
}

const Element: FC<NotificationProps> = ({
  title,
  description,
  banner,
  onAccept,
  onReject,
}: NotificationProps) => {
  return (
    <Stack gap={'20px'}>
      <Stack width={'100%'} gap={'16px'} direction={'row'} alignItems={'center'}>
        {banner && (
          <Box width={'65px'} height={'65px'} position={'relative'}>
            <Image src={banner} alt={title} fill style={{ objectFit: 'cover' }} />
          </Box>
        )}

        <Stack>
          <Typography variant={'body1'} color={'#000'}>
            {title}
          </Typography>
          <Typography variant={'body2'} color={'#00A04A'}>
            {description}
          </Typography>
        </Stack>
      </Stack>

      {(onAccept || onReject) && (
        <Stack direction={'row'} justifyContent={'flex-end'} gap={'12px'}>
          {onReject && (
            <Button variant={'contained'} onClick={onReject}>
              Reject
            </Button>
          )}
          {onAccept && (
            <Button variant={'contained'} color={'success'} onClick={onAccept}>
              Confirmed
            </Button>
          )}
        </Stack>
      )}
    </Stack>
  );
};

export default Element;
