import { SendOutlined } from '@mui/icons-material';
import {
  Avatar,
  Divider,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Stack,
  Typography,
} from '@mui/material';
import { useQueryClient } from '@tanstack/react-query';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { useTranslation } from 'next-i18next';
import { FC, useEffect, useMemo, useState } from 'react';
import { useMetadataQuery } from '../../../../../api/hooks/metadata';
import { getInitials } from '../../../../../utilities/functions';
import { useToast } from '../../../../../utilities/hooks/useToast';
import { DisabledWrapper } from '../../../../QuickActionsMenu/DisabledWrapper';
import { SkeletonCollection } from '../../../../SkeletonCollection';
import { useSendMessageMutation, useUserMessages } from '../../hooks';
import { USER_MESSAGES_QUERY_KEY } from '../../hooks/useUserMessages';
import { Message } from './components';
import { MessageInput } from './components/styled';
import { OpenedMessageSkeleton } from './OpenedMessageSkeleton';

dayjs.extend(relativeTime);

interface OpenedMessageProps {
  id: number;
  close: () => void;
}

export const OpenedMessage: FC<OpenedMessageProps> = ({ id, close }) => {
  const { t } = useTranslation('profile');
  const queryClient = useQueryClient();
  const [messageArea, setMessageArea] = useState<string>('');
  const { notifySuccess } = useToast();

  const scrollToLastMsg = () => {
    const messageContainer = document.querySelectorAll('#messages > *');
    if (!messageContainer) return;

    messageContainer[messageContainer.length - 1]?.scrollIntoView({
      behavior: 'smooth',
      block: 'nearest',
      inline: 'start',
    });
  };

  const { data: metadata } = useMetadataQuery();
  const { data: messages, isLoading: isLoadingMessages } = useUserMessages(id, {
    refetchInterval: 1000,
    onSuccess: (newMessages) => {
      if (newMessages.length === messages?.length) return;
      setTimeout(() => {
        scrollToLastMsg();
      }, 250);
    },
  });

  const { mutate: sendMessageMutation, isLoading: isSendingMessage } =
    useSendMessageMutation({
      onSuccess: () => {
        notifySuccess('Message sent');
        setMessageArea('');
        queryClient.invalidateQueries([...USER_MESSAGES_QUERY_KEY, id]);

        scrollToLastMsg();
      },
    });

  const [mainMessage, ...otherMessages] = useMemo(() => {
    return (
      messages?.sort(
        (a, b) => Number(new Date(a.createdAt)) - Number(new Date(b.createdAt)),
      ) ?? []
    );
  }, [messages]);

  const senderUser = useMemo(() => {
    if (!mainMessage || !metadata) return;

    return Number(mainMessage.from.userId) === metadata.userId
      ? mainMessage.to
      : mainMessage.from;
  }, [mainMessage]);

  const canWriteMessage = useMemo(() => {
    if (!mainMessage) return;

    return !(
      mainMessage.consultation?.chatEndTime &&
      dayjs().isAfter(mainMessage.consultation.chatEndTime)
    );
  }, [mainMessage]);

  const handleSendMessage = () => {
    if (mainMessage && metadata?.userId) {
      const recipientId =
        metadata.userId === Number(mainMessage.from.userId)
          ? mainMessage.to.userId
          : mainMessage.from.userId;

      const message = {
        from: metadata.userId,
        to: Number(recipientId),
        content: messageArea,
        subject: mainMessage.subject,
        consultationId: mainMessage?.consultation?.consultationSessionId,
      };

      recipientId && sendMessageMutation(message);
    }
  };

  useEffect(() => {
    if (isLoadingMessages || !otherMessages) return;

    scrollToLastMsg();
  }, [isLoadingMessages]);

  return (
    <SkeletonCollection
      skeleton={<OpenedMessageSkeleton />}
      isLoading={isLoadingMessages}
      sx={{ height: '100%' }}
    >
      <Stack
        flex={'1 1 auto'}
        height={'100%'}
        mt={'5px'}
        justifyContent={'space-between'}
        sx={{ overflowY: 'auto', minHeight: '0px', flexShrink: 0, flexBasis: 0 }}
      >
        <Stack>
          <ListItem sx={{ p: '10px 0px' }} alignItems="center">
            <ListItemAvatar>
              <Avatar
                alt={getInitials(`${senderUser?.firstName} ${senderUser?.lastName}`)}
                src={senderUser?.profileImage?.toString()}
              />
            </ListItemAvatar>

            <ListItemText
              sx={{ flex: '0 0 auto', mr: '10px' }}
              secondary={getInitials(
                `${senderUser?.firstName} ${senderUser?.lastName}`,
              )}
            />

            <ListItemText
              secondary={
                <Typography variant={'body2'} textAlign={'start'}>
                  {dayjs(mainMessage?.createdAt).fromNow()}
                </Typography>
              }
            />
          </ListItem>

          <Divider />
        </Stack>

        <Stack height={'100%'} spacing={'20px'}>
          <Typography variant={'body1'}>{mainMessage?.content}</Typography>

          <List
            id={'messages'}
            sx={{
              width: '100%',
              minHeight: '0px',
              flex: '1 1 auto',
              overflowY: 'auto',
              flexShrink: 0,
              flexBasis: 0,
            }}
          >
            {otherMessages.map((message) => (
              <Message
                key={message.messageId}
                self={Number(message.from.userId) === metadata?.userId}
                {...message}
              />
            ))}
          </List>
        </Stack>

        <Stack width={'100%'} direction={'column'} pt={2}>
          <MessageInput
            disabled={!canWriteMessage}
            name={'write-message-area'}
            value={messageArea}
            onChange={(e) => setMessageArea(e.target.value)}
            color={'secondary'}
            fullWidth
            placeholder={'Write a message'}
            InputProps={{
              disableUnderline: true,
              endAdornment: (
                <DisabledWrapper
                  isDisabled={
                    isSendingMessage || messageArea.length === 0 || !canWriteMessage
                  }
                >
                  <Stack
                    onClick={handleSendMessage}
                    color={messageArea.length === 0 ? 'initial' : '#00A04A'}
                    sx={{ cursor: 'pointer' }}
                  >
                    <SendOutlined style={{ color: 'inherit' }} />
                  </Stack>
                </DisabledWrapper>
              ),
            }}
          />

          {!canWriteMessage && (
            <Typography pt={1} px={1} variant={'body2'} color={'#818181'}>
              {t('msg-expired')}
            </Typography>
          )}
        </Stack>
      </Stack>
    </SkeletonCollection>
  );
};
