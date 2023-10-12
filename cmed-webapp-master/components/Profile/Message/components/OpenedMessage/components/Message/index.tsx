import { DeleteOutline } from '@mui/icons-material';
import {
  Avatar,
  Box,
  IconButton,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
} from '@mui/material';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { FC, useState } from 'react';
import { Message as MessageType } from '../../../../../../../api/types/account/messages/messages';
import { getInitials } from '../../../../../../../utilities/functions';
import { useDeleteMessageMutation } from '../../../../hooks';

dayjs.extend(relativeTime);

interface MessageProps extends MessageType {
  self?: boolean;
}

export const Message: FC<MessageProps> = ({
  messageId,
  from,
  content,
  createdAt,
  self,
}) => {
  const [isHover, setHover] = useState<boolean>(false);
  const fullName = `${from.firstName} ${from.lastName}`;

  const { mutate: deleteMessageMutation } = useDeleteMessageMutation();

  const deleteHandler = () => {
    deleteMessageMutation(messageId);
  };

  return (
    <ListItem
      alignItems={'flex-start'}
      disableGutters
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <ListItemAvatar sx={{ minWidth: '0', pr: '15px' }}>
        <Avatar
          sx={{
            width: '32px',
            height: '32px',
            fontSize: '14px',
          }}
          alt={fullName}
          src={from?.profileImage?.toString()}
        >
          {getInitials(fullName)}
        </Avatar>
      </ListItemAvatar>
      <ListItemText
        primary={<Typography variant={'body1'}>{fullName}</Typography>}
        secondary={
          <Typography variant={'body2'} pt={'5px'} fontSize={'14px !important'}>
            {content}
          </Typography>
        }
      />
      <ListItemText
        sx={{ minWidth: '100px' }}
        primary={
          <Typography
            textAlign={'end'}
            fontSize={'12px !important'}
            color={'#818181'}
          >
            {dayjs(createdAt).fromNow()}
          </Typography>
        }
        secondary={
          isHover && self ? (
            <Box position={'absolute'} right={0}>
              <IconButton
                aria-label="Delete message"
                size={'small'}
                onClick={deleteHandler}
              >
                <DeleteOutline />
              </IconButton>
            </Box>
          ) : (
            <></>
          )
        }
      />
    </ListItem>
  );
};
