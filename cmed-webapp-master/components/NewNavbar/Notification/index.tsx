import { NotificationsOutlined } from '@mui/icons-material';
import { Badge, IconButton } from '@mui/material';
import { useMemo } from 'react';
import { useNotificationsQuery } from '../../../api/hooks/notifications';

const Notification = () => {
  const { data: notificationsData } = useNotificationsQuery();
  const newNotifications = useMemo(
    () => notificationsData && notificationsData.length > 0,
    [notificationsData],
  );

  return (
    <IconButton
      size="small"
      aria-label={
        notificationsData && newNotifications
          ? `Show ${notificationsData.length} new notifications`
          : 'No new notifications'
      }
      color="inherit"
    >
      <Badge
        variant="dot"
        overlap={'circular'}
        color="error"
        invisible={!newNotifications}
      >
        <NotificationsOutlined />
      </Badge>
    </IconButton>
  );
};

export default Notification;
