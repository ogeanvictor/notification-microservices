import { IsArray, IsEnum, IsNotEmpty, IsOptional } from 'class-validator';
import { NotificationChannel } from 'src/modules/notification/entities/notification-channel.enum';
import { NotificationPriority } from 'src/modules/notification/entities/notification-priority.enum';

interface Recipient {
  name: string;
  email: string;
}

export class BrevoEmailDto {
  @IsNotEmpty()
  @IsEnum(NotificationChannel)
  channel: NotificationChannel;

  @IsNotEmpty()
  @IsArray()
  recipients: Recipient[];

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
