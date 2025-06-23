import { IsEmail, IsNotEmpty } from 'class-validator';

export class BrevoCreateDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  apiKey: string;
}
