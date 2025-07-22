import { IsEnum, IsNotEmpty } from 'class-validator';
import { NotificationChannel } from 'src/modules/notification/entities/notification-channel.enum';
import { NotificationPriority } from 'src/modules/notification/entities/notification-priority.enum';

export class CurrencyParameter {
  fallback_value: string;
  code: string;
  amount_1000: number;
}

export class DateTimeParameter {
  fallback_value: string;
  day_of_week: number;
  year: number;
  month: number;
  day_of_month: number;
  hour: number;
  minute: number;
  calendar: string;
}

export class TemplateComponentParameter {
  type: string;
  text?: string;
  currency?: CurrencyParameter;
  date_time?: DateTimeParameter;
}

export class TemplateComponent {
  type: string;
  parameters: TemplateComponentParameter;
}

export class FacebookWppDto {
  @IsNotEmpty()
  @IsEnum(NotificationChannel)
  channel: NotificationChannel;

  @IsNotEmpty()
  to: string;

  @IsNotEmpty()
  template: string;

  @IsNotEmpty()
  templateCode: string;

  @IsNotEmpty()
  components: TemplateComponent[];

  @IsNotEmpty()
  @IsEnum(NotificationPriority)
  priority: NotificationPriority;
}
