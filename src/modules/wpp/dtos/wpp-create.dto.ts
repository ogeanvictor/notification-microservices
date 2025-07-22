import { IsNotEmpty } from 'class-validator';

export class WppCreateDto {
  @IsNotEmpty()
  businessPhone: string;

  @IsNotEmpty()
  phoneId: string;

  @IsNotEmpty()
  token: string;
}
