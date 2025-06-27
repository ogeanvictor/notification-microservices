import { Module } from '@nestjs/common';

import { NotificationController } from './notification.controller';
import { NotificationWorker } from './consumers/notification.worker';
import { NotificationCoreModule } from './notification.core.module';
import { BrevoModule } from '../brevo/brevo.module';

@Module({
  imports: [NotificationCoreModule, BrevoModule],
  controllers: [NotificationController, NotificationWorker],
  providers: [],
  exports: [],
})
export class NotificationModule {}
