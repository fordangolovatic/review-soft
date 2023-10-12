enum NotificationType {
  MESSAGE_RECEIVED = 'message received',
}

export interface Notification {
  notificationId: number;
  user: string;
  redirectId: string;
  title: string;
  type: NotificationType;
  createdAt: Date;
  isRead?: boolean;
  createdBy: string;
}
