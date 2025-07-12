import { IsEnum, IsNotEmpty, IsOptional } from 'class-validator';

import { NotificationChannel } from 'src/modules/notification/entities/notification-channel.enum';
import { NotificationPriority } from 'src/modules/notification/entities/notification-priority.enum';

export class BrevoSmsDto {
  @IsNotEmpty()
  @IsEnum(NotificationChannel)
  channel: NotificationChannel;

  @IsNotEmpty()
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
