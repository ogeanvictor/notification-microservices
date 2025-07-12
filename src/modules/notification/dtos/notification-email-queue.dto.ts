import { BrevoEmailDto } from 'src/modules/brevo/dtos/brevo-email.dto';

export class NotificationEmailQueueDto {
  notification: BrevoEmailDto;
  userId: string;
}
