import { Injectable } from '@nestjs/common';

import { BrevoService } from 'src/modules/brevo/brevo.service';
import { NotificationStrategyInterface } from '../interfaces/notification.strategy.interface';

@Injectable()
export class NotificationSmsStrategy implements NotificationStrategyInterface {
  constructor(private brevoService: BrevoService) {}

  async send(notification: any, userId: string): Promise<void> {
    await this.brevoService.sendSms(notification, userId);
  }
}
