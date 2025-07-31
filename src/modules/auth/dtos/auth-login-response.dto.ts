import { ApiProperty } from '@nestjs/swagger';

export class AuthLoginResponse {
  @ApiProperty({
    example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6Ikp...',
    description: 'Token',
  })
  token: string;

  @ApiProperty({
    example: 'User Object',
    description: 'User Object',
  })
  user: {
    id: string;
    name: string;
    email: string;
  };
}
