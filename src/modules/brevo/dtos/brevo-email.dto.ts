import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsEnum, IsNotEmpty, IsOptional } from 'class-validator';

import { NotificationPriority } from 'src/modules/notification/entities/notification-priority.enum';

interface Recipient {
  name: string;
  email: string;
}

export class BrevoEmailDto {
  @ApiProperty({
    example: { name: 'John Due', email: ' email@email.com' },
    description: 'Recipients',
  })
  @IsNotEmpty()
  @IsArray()
  recipients: Recipient[];

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
