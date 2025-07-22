import { NotificationChannel } from '../entities/notification-channel.enum';

export class NotificationPayloadDto {
  channelType: NotificationChannel;
  userId: string;
  notification: any;
}
