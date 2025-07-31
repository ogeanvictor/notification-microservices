import { ApiProperty } from '@nestjs/swagger';
import { Notification } from '../entities/notification.entity';

export class NotificationListResponse {
  @ApiProperty({
    example: 20,
    description: 'Notifications total',
  })
  total: number;

  @ApiProperty({
    example: 'Notification array',
    description: 'Notification array',
  })
  notifications: Notification[];
}
