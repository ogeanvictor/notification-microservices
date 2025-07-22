import { Injectable } from '@nestjs/common';

import { FacebookService } from 'src/modules/facebook/facebook.service';
import { NotificationStrategyInterface } from '../interfaces/notification.strategy.interface';

@Injectable()
export class NotificationWppStrategy implements NotificationStrategyInterface {
  constructor(private facebookService: FacebookService) {}

  async send(notification: any, userId: string): Promise<void> {
    await this.facebookService.sendTemplate(notification, userId);
  }
}
