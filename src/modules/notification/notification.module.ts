import { Module } from '@nestjs/common';

import { NotificationController } from './notification.controller';
import { NotificationWorker } from './consumers/notification.worker';
import { NotificationCoreModule } from './notification.core.module';
import { NotificationStrategyFactory } from './notification.strategy.factory';
import { NotificationEmailStrategy } from './strategys/notification.email.strategy';
import { NotificationSmsStrategy } from './strategys/notification.sms.strategy';
import { BrevoModule } from '../brevo/brevo.module';

@Module({
  imports: [NotificationCoreModule, BrevoModule],
  controllers: [NotificationController, NotificationWorker],
  providers: [
    NotificationStrategyFactory,
    NotificationEmailStrategy,
    NotificationSmsStrategy,
  ],
  exports: [],
})
export class NotificationModule {}
