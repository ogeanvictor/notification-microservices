import { Injectable } from '@nestjs/common';

import { WppService } from 'src/modules/wpp/wpp.service';
import { NotificationStrategyInterface } from '../interfaces/notification.strategy.interface';

@Injectable()
export class NotificationWppStrategy implements NotificationStrategyInterface {
  constructor(private wppService: WppService) {}

  async send(notification: any, userId: string): Promise<void> {
    await this.wppService.sendTemplate(notification, userId);
  }
}
