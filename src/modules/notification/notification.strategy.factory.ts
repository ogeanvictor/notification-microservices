import { Injectable } from '@nestjs/common';
import { NotificationEmailStrategy } from './strategys/notification.email.strategy';
import { NotificationSmsStrategy } from './strategys/notification.sms.strategy';
import { NotificationChannel } from './entities/notification-channel.enum';
import { NotificationStrategyInterface } from './interfaces/notification.strategy.interface';

@Injectable()
export class NotificationStrategyFactory {
  constructor(
    private readonly emailStrategy: NotificationEmailStrategy,
    private readonly smsStrategy: NotificationSmsStrategy,
  ) {}

  getStrategy(channel: NotificationChannel): NotificationStrategyInterface {
    switch (channel) {
      case 'email':
        return this.emailStrategy;

      case 'sms':
        return this.smsStrategy;

      default:
        throw new Error(`Channel ${channel} not found!`);
    }
  }
}
