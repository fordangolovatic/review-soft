import { AttachFileOutlined, Send } from '@mui/icons-material';
import { Avatar, Card, InputAdornment, Stack, Typography } from '@mui/material';
import { FC } from 'react';
import { messages } from '../data';
import { Input } from '../styled';
import Message from './components/Message';

interface ChatProps {
  name: string;
  avatar: string;
  online?: boolean;
}

const Chat: FC<ChatProps> = ({ name, avatar, online }: ChatProps) => {
  return (
    <Card
      variant={'outlined'}
      sx={{ width: '100%', height: '100%', padding: '40px 32px' }}
    >
      <Stack width={'100%'} height={'100%'}>
        <Stack
          direction={'row'}
          justifyContent={'space-between'}
          alignItems={'center'}
          paddingBottom={'20px'}
          borderBottom={'1px solid #EFEFEF'}
        >
          <Stack direction={'row'} gap={'20px'}>
            <Typography variant={'subtitle2'}>{name}</Typography>
            {online && (
              <Typography variant={'subtitle2'} color={'#00A04A'}>
                Online
              </Typography>
            )}
          </Stack>

          <Avatar
            srcSet={avatar}
            sx={{ width: { sm: '50px', xl: '75px' }, height: 'auto' }}
          />
        </Stack>

        <Stack
          width={'100%'}
          height={'100%'}
          gap={'8px'}
          justifyContent={'flex-end'}
        >
          {messages.map((message) => (
            <Message
              key={message.id}
              content={message.content}
              createdAt={message.createdAt}
              isSender={message.isSender}
            />
          ))}
        </Stack>

        <Input
          placeholder="Message"
          variant={'standard'}
          sx={{ py: '6px', px: '10px' }}
          InputProps={{
            disableUnderline: true,
            startAdornment: (
              <InputAdornment
                position={'start'}
                sx={{ paddingLeft: '10px', color: '#818181' }}
              >
                <AttachFileOutlined
                  color={'inherit'}
                  sx={{ rotate: '45deg' }}
                  fontSize={'small'}
                />
              </InputAdornment>
            ),
            endAdornment: (
              <InputAdornment
                position={'end'}
                sx={{ paddingRight: '10px', color: '#00A04A' }}
              >
                <Send
                  color={'inherit'}
                  sx={{ rotate: '-45deg' }}
                  fontSize={'small'}
                />
              </InputAdornment>
            ),
          }}
        />
      </Stack>
    </Card>
  );
};

export default Chat;
