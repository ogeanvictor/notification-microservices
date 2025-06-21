import { NotificationCreateDto } from '../dtos/notification-create.dto';
import { Notification } from '../entities/notification.entity';

export abstract class NotificationRepositoryInterface {
  abstract create(
    body: NotificationCreateDto,
    userId: string,
  ): Promise<Notification>;
}
