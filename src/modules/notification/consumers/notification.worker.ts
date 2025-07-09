import { Controller, forwardRef, Inject, Logger } from '@nestjs/common';
import { Ctx, EventPattern, Payload, RmqContext } from '@nestjs/microservices';
import { setTimeout as delay } from 'timers/promises';

import { BrevoService } from 'src/modules/brevo/brevo.service';

import { NotificationQueueDto } from '../dtos/notification-queue.dto';

@Controller()
export class NotificationWorker {
  private readonly logger = new Logger(NotificationWorker.name);

  constructor(
    @Inject(forwardRef(() => BrevoService)) private brevoService: BrevoService,
  ) {}

  @EventPattern('send_email')
  async handleSendEmail(
    @Payload() data: NotificationQueueDto,
    @Ctx() context: RmqContext,
  ) {
    const channel = context.getChannelRef();
    const originalMsg = context.getMessage();
    try {
      const { notification, userId } = data;

      await delay(3000);
      this.logger.log(`Notification priority: ${notification.priority}`);
      await this.brevoService.sendEmail(notification, userId);

      channel.ack(originalMsg);

      this.logger.log('Email send!');
    } catch (error: any) {
      channel.nack(originalMsg, false, false);
      this.logger.log(`Send notification error to dlq: ${error}`);
    }
  }
}
