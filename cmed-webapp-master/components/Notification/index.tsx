import { Box, Button, Divider, Stack, Typography } from '@mui/material';
import { FC, ReactNode, useEffect, useMemo, useRef, useState } from 'react';
import {
  useNotificationsQuery,
  useReadNotificationsMutation,
} from '../../api/hooks/notifications';
import useOutsideClick from '../../utilities/hooks/useOutsideClick';
import { SkeletonCollection } from '../SkeletonCollection';
import Element from './components/Element';
import NotificationSkeleton from './components/NotificationSkeleton';

interface NotificationProps {
  children: ReactNode;
}

const Notification: FC<NotificationProps> = ({ children }: NotificationProps) => {
  const { data: notifications, isLoading: isNotificationLoading } =
    useNotificationsQuery();
  const { mutate: readAllNotifications } = useReadNotificationsMutation();
  const [show, setShow] = useState<boolean>(false);
  const [resultsLimit, setResultsLimit] = useState<number>(5);
  const containerRef = useRef<HTMLDivElement>(null);
  const notificationsRef = useRef<HTMLDivElement>(null);
  const enableActions = useMemo(
    () => !isNotificationLoading && notifications && notifications.length > 0,
    [isNotificationLoading, notifications],
  );
  const canShowMore = useMemo(
    () => notifications && notifications.length > resultsLimit,
    [isNotificationLoading, notifications, resultsLimit],
  );

  const showMoreHandler = () => {
    if (!canShowMore) return;

    setResultsLimit(resultsLimit + 5);
  };

  useEffect(() => {
    if (!notificationsRef.current) return;

    notificationsRef.current.scrollTo({
      top: notificationsRef.current.scrollHeight,
      behavior: 'smooth',
    });
  }, [resultsLimit]);

  useOutsideClick(containerRef, () => setShow(false));

  return (
    <Stack position={'static'} ref={containerRef}>
      <Stack height={'100%'}>
        <Box
          position={'relative'}
          onClick={() => setShow(!show)}
          sx={{ height: '100%', cursor: 'pointer' }}
        >
          {children}
        </Box>

        {show && (
          <Stack alignItems={'center'}>
            <Box
              position={'absolute'}
              width={'20px'}
              height={'20px'}
              zIndex={'99'}
              sx={{ background: '#FFF', transform: 'rotate(45deg)' }}
            />
            <Stack
              width={'20rem'}
              mt={'5px'}
              padding={'20px'}
              gap={'20px'}
              position={'absolute'}
              bgcolor={'#FFF'}
              borderRadius={'10px'}
              zIndex={'98'}
              boxShadow={'0px 10px 50px rgba(0, 0, 0, 0.2)'}
            >
              <SkeletonCollection
                isLoading={isNotificationLoading}
                skeleton={<NotificationSkeleton />}
              >
                <Stack
                  gap={'20px'}
                  divider={<Divider orientation={'horizontal'} color={'#EFEFEF'} />}
                  maxHeight={'22rem'}
                  overflow={'scroll'}
                  ref={notificationsRef}
                >
                  {notifications?.length === 0 ? (
                    <Typography
                      variant={'body2'}
                      color={'GrayText'}
                      textAlign={'center'}
                    >
                      No new notifications
                    </Typography>
                  ) : (
                    notifications &&
                    notifications
                      .slice(0, resultsLimit)
                      .map((notif) => (
                        <Element key={notif.notificationId} title={notif.title} />
                      ))
                  )}
                </Stack>
              </SkeletonCollection>

              <Divider orientation={'horizontal'} color={'#EFEFEF'} />

              <Stack
                width={'100%'}
                direction={'row'}
                justifyContent={'flex-end'}
                gap={'5px'}
              >
                <Button
                  variant={'text'}
                  size={'small'}
                  disabled={!canShowMore}
                  onClick={showMoreHandler}
                >
                  Show more
                </Button>
                <Button
                  variant={'text'}
                  size={'small'}
                  onClick={readAllNotifications}
                  disabled={!enableActions}
                >
                  Mark all as read
                </Button>
              </Stack>
            </Stack>
          </Stack>
        )}
      </Stack>
    </Stack>
  );
};

export default Notification;
