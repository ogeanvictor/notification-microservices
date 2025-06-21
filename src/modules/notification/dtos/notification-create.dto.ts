import { IsEnum, IsNotEmpty } from 'class-validator';

import { NotificationChannel } from '../entities/notification-channel.enum';
import { NotificationPriority } from '../entities/notification-priority.enum';

export class NotificationCreateDto {
  @IsNotEmpty()
  @IsEnum(NotificationChannel)
  channel: NotificationChannel;

  @IsNotEmpty()
  recipient: string;

  @IsNotEmpty()
  message: string;

  @IsNotEmpty()
  data: string;

  @IsNotEmpty()
  @IsEnum(NotificationPriority)
  priority: NotificationPriority;
}
