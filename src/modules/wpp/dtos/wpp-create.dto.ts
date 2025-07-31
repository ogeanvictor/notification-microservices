import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class WppCreateDto {
  @ApiProperty({
    example: '9238421093123',
    description: 'Whatsapp account busines phone',
  })
  @IsNotEmpty()
  businessPhone: string;

  @ApiProperty({
    example: '24914192390',
    description: 'Whatsapp account phone id',
  })
  @IsNotEmpty()
  phoneId: string;

  @ApiProperty({
    example: 'AWDsaF2119sAfwgk45',
    description: 'Whatsapp account token',
  })
  @IsNotEmpty()
  token: string;
}
