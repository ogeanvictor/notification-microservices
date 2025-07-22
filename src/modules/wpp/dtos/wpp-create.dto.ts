import { IsNotEmpty } from 'class-validator';

export class WppCreateDto {
  @IsNotEmpty()
  businessPhone: string;

  @IsNotEmpty()
  token: string;
}
