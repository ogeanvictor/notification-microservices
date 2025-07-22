import { Injectable } from '@nestjs/common';

import { NotificationChannel } from './entities/notification-channel.enum';
import { NotificationStrategyInterface } from './interfaces/notification.strategy.interface';

import { NotificationEmailStrategy } from './strategys/notification.email.strategy';
import { NotificationSmsStrategy } from './strategys/notification.sms.strategy';
import { NotificationWppStrategy } from './strategys/notification.wpp.strategy';

@Injectable()
export class NotificationStrategyFactory {
  constructor(
    private readonly emailStrategy: NotificationEmailStrategy,
    private readonly smsStrategy: NotificationSmsStrategy,
    private readonly wppStrategy: NotificationWppStrategy,
  ) {}

  getStrategy(channel: NotificationChannel): NotificationStrategyInterface {
    switch (channel) {
      case NotificationChannel.EMAIL:
        return this.emailStrategy;

      case NotificationChannel.SMS:
        return this.smsStrategy;

      case NotificationChannel.WPP:
        return this.wppStrategy;

      default:
        throw new Error(`Channel ${channel} not found!`);
    }
  }
}
