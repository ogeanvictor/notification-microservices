import { BrevoSmsDto } from 'src/modules/brevo/dtos/brevo-sms.dto';

export class NotificationSmsQueueDto {
  notification: BrevoSmsDto;
  userId: string;
}
