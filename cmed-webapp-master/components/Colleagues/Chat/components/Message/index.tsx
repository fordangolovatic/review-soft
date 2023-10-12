import { Stack, Typography } from '@mui/material';
import dayjs from 'dayjs';
import { FC } from 'react';

interface MessageProps {
  content: string;
  createdAt: string;
  isSender?: boolean;
}

const Message: FC<MessageProps> = ({
  content,
  createdAt,
  isSender,
}: MessageProps) => {
  return (
    <Stack
      width={'100%'}
      padding={'10px'}
      alignItems={isSender ? 'flex-end' : 'flex-start'}
    >
      <Stack
        width={'fit-content'}
        maxWidth={'150px'}
        gap={'4px'}
        padding={'10px'}
        borderRadius={'10px'}
        alignItems={'flex-end'}
        bgcolor={isSender ? '#F9F9F9' : '#ECF5F4'}
      >
        <Typography variant={'body1'}>{content}</Typography>

        <Typography variant={'body2'} color={'#818181'}>
          {dayjs(createdAt).format('hh:mm')}
        </Typography>
      </Stack>
    </Stack>
  );
};

export default Message;
