import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import {
  ClientProxy,
  ClientProxyFactory,
  Transport,
} from '@nestjs/microservices';
import * as amqp from 'amqplib';

import { NotificationRepository } from './notification.repository';
import { Notification } from './entities/notification.entity';

import { NotificationCreateDto } from './dtos/notification-create.dto';
import { ListQueryDto } from '../../common/dtos/list-query.dto';
import { NotificationListResponse } from './dtos/notification-list-response.dto';
import { BrevoSmsDto } from '../brevo/dtos/brevo-sms.dto';
import { BrevoEmailDto } from '../brevo/dtos/brevo-email.dto';

@Injectable()
export class NotificationService {
  private client: ClientProxy;
  private readonly logger = new Logger(NotificationService.name);

  constructor(private repository: NotificationRepository) {
    this.client = ClientProxyFactory.create({
      transport: Transport.RMQ,
      options: {
        urls: ['amqp://localhost:5672'],
        queue: 'notifications_queue',
        queueOptions: {
          durable: true,
          arguments: {
            'x-max-priority': 10,
          },
        },
      },
    });
  }

  async publishNotification(
    notification: BrevoEmailDto | BrevoSmsDto,
    userId: string,
  ) {
    const amqpUrl = 'amqp://localhost';
    const exchange = 'notifications_exchange';
    const routingKey = 'send_notification';

    const connection = await amqp.connect(amqpUrl);
    const channel = await connection.createChannel();

    const payload = {
      pattern: routingKey,
      data: { notification, userId },
    };

    await channel.assertExchange(exchange, 'direct', { durable: true });

    const priorityNumber = this.mapPriority(notification.priority);

    channel.publish(
      exchange,
      routingKey,
      Buffer.from(JSON.stringify(payload)),
      {
        priority: priorityNumber,
        persistent: true,
        headers: { pattern: routingKey },
      },
    );

    await channel.close();
    await connection.close();

    this.logger.log('Notification publish!');
  }

  async create(
    body: NotificationCreateDto | BrevoSmsDto,
    userId: string,
  ): Promise<Notification> {
    try {
      return await this.repository.create(body, userId);
    } catch (error: any) {
      throw error;
    }
  }

  async findAll(
    query: ListQueryDto,
    userId: string,
  ): Promise<NotificationListResponse> {
    try {
      return await this.repository.findAll(query, userId);
    } catch (error: any) {
      throw error;
    }
  }

  async findById(id: string): Promise<Notification | null> {
    try {
      return await this.repository.findById(id);
    } catch (error: any) {
      throw new NotFoundException('Notification not found!');
    }
  }

  private mapPriority(priority: 'low' | 'medium' | 'high'): number {
    switch (priority) {
      case 'high':
        return 10;
      case 'medium':
        return 5;
      case 'low':
        return 1;
      default:
        return 0;
    }
  }
}
