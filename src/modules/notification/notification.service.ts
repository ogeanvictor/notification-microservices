import { Injectable, NotFoundException } from '@nestjs/common';
import {
  ClientProxy,
  ClientProxyFactory,
  Transport,
} from '@nestjs/microservices';

import { NotificationRepository } from './notification.repository';
import { Notification } from './entities/notification.entity';

import { NotificationCreateDto } from './dtos/notification-create.dto';
import { ListQueryDto } from '../../common/dtos/list-query.dto';
import { NotificationListResponse } from './dtos/notification-list-response.dto';

@Injectable()
export class NotificationService {
  private client: ClientProxy;

  constructor(private repository: NotificationRepository) {
    this.client = ClientProxyFactory.create({
      transport: Transport.RMQ,
      options: {
        urls: ['amqp://localhost:5672'],
        queue: 'notifications_queue',
        queueOptions: {
          durable: true,
        },
      },
    });
  }

  async publishNotification(
    notification: NotificationCreateDto,
    userId: string,
  ) {
    this.client.emit('send_email', { notification, userId });
  }

  async create(
    body: NotificationCreateDto,
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
}
