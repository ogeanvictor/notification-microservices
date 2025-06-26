import { Notification } from '../entities/notification.entity';

import { ListQueryDto } from '../../../common/dtos/list-query.dto';
import { NotificationCreateDto } from '../dtos/notification-create.dto';
import { NotificationListResponse } from '../dtos/notification-list-response.dto';

export abstract class NotificationRepositoryInterface {
  abstract create(
    body: NotificationCreateDto,
    userId: string,
  ): Promise<Notification>;
  abstract findAll(
    query: ListQueryDto,
    userId: string,
  ): Promise<NotificationListResponse>;
  abstract findById(id: string): Promise<Notification | null>;
}
