import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';

export class BrevoCreateDto {
  @ApiProperty({ example: 'brevo-account', description: 'Brevo account name' })
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    example: 'brevoemail@email.com',
    description: 'Brevo account email',
  })
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'AW1rF3Op', description: 'Brevo account token' })
  @IsNotEmpty()
  apiKey: string;
}
