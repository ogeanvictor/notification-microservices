import { IsNotEmpty } from 'class-validator';

export class FacebookCreateDto {
  @IsNotEmpty()
  businessPhone: string;

  @IsNotEmpty()
  token: string;
}
