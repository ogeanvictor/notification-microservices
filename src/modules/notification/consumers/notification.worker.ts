import { Controller, forwardRef, Inject, Logger } from '@nestjs/common';
import { Ctx, EventPattern, Payload, RmqContext } from '@nestjs/microservices';
import { setTimeout as delay } from 'timers/promises';

import { BrevoService } from 'src/modules/brevo/brevo.service';

import { NotificationPayloadDto } from '../dtos/notification-payload.dto';
import { NotificationStrategyFactory } from '../notification.strategy.factory';

@Controller()
export class NotificationWorker {
  private readonly logger = new Logger(NotificationWorker.name);

  constructor(
    @Inject(forwardRef(() => BrevoService)) private brevoService: BrevoService,
    private notificationStrategyFactory: NotificationStrategyFactory,
  ) {}

  @EventPattern('send_notification')
  async handleSendEmail(
    @Payload() data: NotificationPayloadDto,
    @Ctx() context: RmqContext,
  ) {
    const channel = context.getChannelRef();
    const originalMsg = context.getMessage();

    try {
      const { notification, userId } = data;

      await delay(3000);
      this.logger.log(`Notification priority: ${notification.priority}`);

      const strategy = this.notificationStrategyFactory.getStrategy(
        notification.channel,
      );
      await strategy.send(notification, userId);

      channel.ack(originalMsg);

      this.logger.log('Notification send!');
    } catch (error: any) {
      channel.nack(originalMsg, false, false);
      this.logger.log(`Send notification error to dlq: ${error}`);
    }
  }
}
