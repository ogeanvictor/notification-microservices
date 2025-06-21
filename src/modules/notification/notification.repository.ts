import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';

import { Notification } from './entities/notification.entity';
import { NotificationRepositoryInterface } from './interfaces/notification.repository.interface';

import { NotificationCreateDto } from './dtos/notification-create.dto';

@Injectable()
export class NotificationRepository implements NotificationRepositoryInterface {
  constructor(
    @InjectRepository(Notification)
    private repository: Repository<Notification>,
  ) {}

  async create(
    body: NotificationCreateDto,
    userId: string,
  ): Promise<Notification> {
    const notification: Notification = this.repository.create(body);

    await this.repository.save(notification);

    return notification;
  }
}
