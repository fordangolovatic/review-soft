import { List, ListItemButton } from '@mui/material';
import React, { FC } from 'react';
import { useMetadataQuery } from '../../../../../api/hooks/metadata';
import { useMessages } from '../../hooks';
import { TabProps } from '../../index';
import { Message } from '../index';

export const Inbox: FC<TabProps> = ({ onChangeMessage }) => {
  const { data: messages, isLoading } = useMessages();
  const { data: metadata } = useMetadataQuery();

  return (
    <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
      {!isLoading &&
        messages?.map((message) => (
          <ListItemButton
            key={message.message_id}
            onClick={() =>
              onChangeMessage(
                metadata?.userId === Number(message.from)
                  ? message.to
                  : message.from,
              )
            }
          >
            <Message {...message} />
          </ListItemButton>
        ))}
    </List>
  );
};
