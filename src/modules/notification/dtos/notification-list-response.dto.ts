import { Notification } from '../entities/notification.entity';

export class NotificationListResponse {
  total: number;
  notifications: Notification[];
}
