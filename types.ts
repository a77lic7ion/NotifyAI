
export enum NotificationChannel {
  Telegram = 'Telegram',
  Email = 'Email',
  WebPush = 'WebPush',
}

export interface Reminder {
  id: string;
  message: string;
  dateTime: string;
  channels: NotificationChannel[];
  status: 'scheduled' | 'sent' | 'failed';
}
