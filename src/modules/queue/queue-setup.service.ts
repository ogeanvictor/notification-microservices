import { Injectable, OnApplicationBootstrap, Logger } from '@nestjs/common';
import * as amqp from 'amqplib';

@Injectable()
export class QueueSetupService implements OnApplicationBootstrap {
  private readonly logger = new Logger(QueueSetupService.name);

  async onApplicationBootstrap() {
    const connection = await amqp.connect('amqp://localhost');
    const channel = await connection.createChannel();

    await channel.assertExchange('notifications_dlq_exchange', 'direct', {
      durable: true,
    });
    await channel.assertQueue('notifications_dlq', { durable: true });
    await channel.bindQueue(
      'notifications_dlq',
      'notifications_dlq_exchange',
      'notifications_dlq',
    );

    this.logger.log('DLQ configured with sucessfully!');

    await channel.close();
    await connection.close();
  }
}
