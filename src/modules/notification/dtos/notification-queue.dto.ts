import { NotificationCreateDto } from './notification-create.dto';

export class NotificationQueueDto {
  notification: NotificationCreateDto;
  userId: string;
}
