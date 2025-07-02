import { Controller, forwardRef, Inject, Logger } from '@nestjs/common';
import { Ctx, EventPattern, Payload, RmqContext } from '@nestjs/microservices';

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
      await this.brevoService.sendEmail(notification, userId);

      channel.ack(originalMsg);

      this.logger.log('Email send!');
    } catch (error: any) {
      this.logger.log(`Send notification error: ${error}`);
      channel.nack(originalMsg, false, true);
    }
  }
}
