import {
  Avatar,
  Badge,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Stack,
  Typography,
} from '@mui/material';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import React, { FC, useCallback, useMemo } from 'react';
import { useMetadataQuery } from '../../../../../api/hooks/metadata';
import { SummaryMessage as MessageProps } from '../../../../../api/types/account/messages/messages';

dayjs.extend(relativeTime);

export const Message: FC<MessageProps> = ({
  content,
  is_read,
  createdAt,
  from,
  to,
  to_firstName,
  to_lastName,
  to_profileImage,
  from_firstName,
  from_lastName,
  from_profileImage,
  subject,
}) => {
  const { data: metadata } = useMetadataQuery();

  const senderUser = useMemo(() => {
    if (!metadata) return from;

    return Number(from) === metadata.userId ? to : from;
  }, [from, to]);

  const getAuthor = useCallback(
    (userId: number) => {
      if (metadata?.userId === userId) {
        return 'You';
      }

      return Number(to) === userId
        ? `${to_firstName} ${to_lastName}`
        : `${from_firstName} ${from_lastName}`;
    },
    [from_firstName, from_lastName, metadata?.userId, to, to_firstName, to_lastName],
  );

  const getAvatar = useCallback(
    (userId: number) => {
      return to === userId ? to_profileImage : from_profileImage;
    },
    [from_profileImage, to_profileImage],
  );

  return (
    <ListItem disablePadding alignItems="center">
      <ListItemAvatar>
        <Badge
          variant={'dot'}
          invisible={!!is_read || Number(from) === metadata?.userId}
          color={'primary'}
          overlap={'circular'}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'left',
          }}
        >
          <Avatar alt={getAuthor(senderUser)} src={getAvatar(senderUser)} />
        </Badge>
      </ListItemAvatar>
      <ListItemText
        primary={subject ?? 'No subject'}
        secondary={
          <Stack spacing={'10px'} direction={'row'} alignItems={'center'}>
            <Stack
              width={'100%'}
              maxWidth={'200px'}
              spacing={'10px'}
              direction={'row'}
              alignItems={'center'}
              fontSize={'14px !important'}
            >
              <Typography
                sx={{ display: 'inline', whiteSpace: 'nowrap' }}
                component="span"
                variant="body2"
                color="text.primary"
              >
                {getAuthor(Number(from))}
              </Typography>
              <Typography
                sx={{ display: 'inline', whiteSpace: 'nowrap' }}
                component="span"
                variant="body2"
                color="text.primary"
              >
                {'>'}
              </Typography>
              <Typography
                sx={{ display: 'inline', whiteSpace: 'nowrap' }}
                component="span"
                variant="body2"
                color="text.primary"
              >
                {getAuthor(Number(to))}
              </Typography>
            </Stack>
          </Stack>
        }
        sx={{ width: '100%' }}
      />
      <ListItemText
        sx={{
          maxWidth: '300px',
          width: '100%',
        }}
        secondary={
          <Typography
            sx={{
              maxWidth: '300px',
              whiteSpace: 'nowrap',
              textOverflow: 'ellipsis',
              overflow: 'hidden',
            }}
            textAlign={'start'}
            variant={'body2'}
            px={4}
          >
            {content}
          </Typography>
        }
      />
      <ListItemText
        sx={{ width: '100%' }}
        secondary={
          <Typography
            textAlign={'end'}
            fontSize={'12px !important'}
            color={'#818181'}
            whiteSpace={'nowrap'}
          >
            {dayjs(createdAt).fromNow()}
          </Typography>
        }
      />
    </ListItem>
  );
};
