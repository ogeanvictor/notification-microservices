/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */

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
    const channel = context.getChannelRef() as {
      ack: (msg: unknown) => void;
      nack: (msg: unknown, allUpTo?: boolean, requeue?: boolean) => void;
    };

    const originalMsg = context.getMessage() as unknown;

    const { channelType, notification, userId } = data;

    try {
      await delay(3000);
      this.logger.log(`Notification priority: ${notification.priority}`);

      const strategy =
        this.notificationStrategyFactory.getStrategy(channelType);
      await strategy.send(notification, userId);

      channel.ack(originalMsg);

      this.logger.log('Notification send!');
    } catch (error: any) {
      channel.nack(originalMsg, false, false);
      this.logger.log(`Send notification error to dlq: ${error}`);
    }
  }
}
