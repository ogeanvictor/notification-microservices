import { ApiProperty } from '@nestjs/swagger';

export class UserRegisterResponseDto {
  @ApiProperty({
    example: 'bb8f44bc-bfea-4c97-9084-7eb9caa0abc7',
    description: 'User Id',
  })
  id: string;

  @ApiProperty({
    example: 'John Due',
    description: 'User name',
  })
  name: string;

  @ApiProperty({
    example: 'user@teste.com',
    description: 'User email',
  })
  email: string;

  @ApiProperty({
    example: '2025-05-30T14:38:56.927Z',
    description: 'User createdAt',
  })
  createdAt: Date;

  @ApiProperty({
    example: '2025-05-30T14:38:56.927Z',
    description: 'User updatedAt',
  })
  updatedAt: Date;
}
