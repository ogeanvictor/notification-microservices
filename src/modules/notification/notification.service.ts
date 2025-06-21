import { Injectable } from '@nestjs/common';

import { NotificationRepository } from './notification.repository';
import { Notification } from './entities/notification.entity';

import { NotificationCreateDto } from './dtos/notification-create.dto';

@Injectable()
export class NotificationService {
  constructor(private repository: NotificationRepository) {}

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
}
