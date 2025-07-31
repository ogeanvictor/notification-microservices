import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsOptional } from 'class-validator';

import { NotificationPriority } from 'src/modules/notification/entities/notification-priority.enum';

export class BrevoSmsDto {
  @ApiProperty({
    example: ['5521987531892'],
    description: 'Recipients',
  })
  @IsNotEmpty()
  recipients: string[];

  @ApiProperty({ example: 'New Project', description: 'Email Subject' })
  @IsOptional()
  subject: string;

  @ApiProperty({
    example: 'This is a new project...',
    description: 'Email Message',
  })
  @IsNotEmpty()
  message: string;

  @IsOptional()
  data: string;

  @ApiProperty({ example: 'high', description: 'Notification priority' })
  @IsNotEmpty()
  @IsEnum(NotificationPriority)
  priority: NotificationPriority;
}
