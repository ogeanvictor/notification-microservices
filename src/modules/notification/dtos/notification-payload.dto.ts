import { NotificationChannel } from '../entities/notification-channel.enum';

export class NotificationPayloadDto {
  channel: NotificationChannel;
  userId: string;
  notification: any;
}
