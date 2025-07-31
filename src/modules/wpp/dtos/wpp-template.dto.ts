import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty } from 'class-validator';

import { NotificationPriority } from 'src/modules/notification/entities/notification-priority.enum';

export class CurrencyParameter {
  fallback_value: string;
  code: string;
  amount_1000: number;
}

export class DateTimeParameter {
  fallback_value: string;
  day_of_week: number;
  year: number;
  month: number;
  day_of_month: number;
  hour: number;
  minute: number;
  calendar: string;
}

export class TemplateComponentParameter {
  type: string;
  text?: string;
  currency?: CurrencyParameter;
  date_time?: DateTimeParameter;
}

export class TemplateComponent {
  type: string;
  parameters: TemplateComponentParameter;
}

export class WppTemplateDto {
  @ApiProperty({
    example: '5521987531892',
    description: 'Recipients',
  })
  @IsNotEmpty()
  to: string;

  @ApiProperty({
    example: 'template_01',
    description: 'Template Message',
  })
  @IsNotEmpty()
  template: string;

  @ApiProperty({
    example: 'pt_BR',
    description: 'Template language',
  })
  @IsNotEmpty()
  templateCode: string;

  @ApiProperty({
    example: [
      {
        type: 'body',
        parameters: [
          {
            type: 'text',
            text: 'John Due',
          },
        ],
      },
    ],
    description: 'Components of templates variables',
  })
  @IsNotEmpty()
  components: TemplateComponent[];

  @ApiProperty({ example: 'high', description: 'Notification priority' })
  @IsNotEmpty()
  @IsEnum(NotificationPriority)
  priority: NotificationPriority;
}
