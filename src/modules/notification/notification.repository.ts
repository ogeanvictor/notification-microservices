import { InjectRepository } from '@nestjs/typeorm';
import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';

import { NotificationRepositoryInterface } from './interfaces/notification.repository.interface';
import { Notification } from './entities/notification.entity';
import { User } from '../user/entities/user.entity';

import { NotificationCreateDto } from './dtos/notification-create.dto';
import { ListQueryDto } from '../../common/dtos/list-query.dto';
import { NotificationListResponse } from './dtos/notification-list-response.dto';

@Injectable()
export class NotificationRepository implements NotificationRepositoryInterface {
  constructor(
    @InjectRepository(Notification)
    private repository: Repository<Notification>,
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  async create(
    body: NotificationCreateDto,
    userId: string,
  ): Promise<Notification> {
    const user: User = await this.userRepository.findOneOrFail({
      where: { id: userId },
    });

    const notification = new Notification();
    notification.channel = body.channel;
    notification.data = body.data;
    notification.subject = body.subject;
    notification.message = body.message;
    notification.priority = body.priority;
    notification.recipient = body.recipients;
    notification.user = user;

    await this.repository.save(notification);

    return notification;
  }

  async findAll(
    queryParams: ListQueryDto,
    userId: string,
  ): Promise<NotificationListResponse> {
    const {
      page = 0,
      itemsPerPage = 20,
      sortBy = 'createdAt',
      sortOrder = 'DESC',
    } = queryParams;

    const user: User | null = await this.userRepository.findOne({
      where: { id: userId },
    });

    if (!user) {
      throw new NotFoundException('User not found!');
    }

    const notifications: Notification[] = await this.repository.find({
      where: { user },
      order: {
        [sortBy]: sortOrder,
      },
      skip: page * itemsPerPage,
      take: itemsPerPage,
    });

    const total: number = await this.repository.count({ where: { user } });

    return {
      total,
      notifications,
    };
  }

  async findById(id: string): Promise<Notification | null> {
    return await this.repository.findOne({ where: { id } });
  }
}
