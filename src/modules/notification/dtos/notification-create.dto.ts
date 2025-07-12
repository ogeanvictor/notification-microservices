import { IsArray, IsEnum, IsNotEmpty, IsOptional } from 'class-validator';

import { NotificationChannel } from '../entities/notification-channel.enum';
import { NotificationPriority } from '../entities/notification-priority.enum';

export class NotificationCreateDto {
  @IsNotEmpty()
  @IsEnum(NotificationChannel)
  channel: NotificationChannel;

  @IsNotEmpty()
  @IsArray()
  recipients: string[];

  @IsOptional()
  subject: string;

  @IsNotEmpty()
  message: string;

  @IsOptional()
  data: string;

  @IsNotEmpty()
  @IsEnum(NotificationPriority)
  priority: NotificationPriority;
}
