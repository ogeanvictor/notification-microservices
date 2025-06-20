import { Body, Controller, Post } from '@nestjs/common';

import { AuthService } from './auth.service';

import { AuthLoginDto } from './dtos/auth-login.dto';
import { AuthLoginResponse } from './dtos/auth-login-response.dto';

@Controller('auth')
export class AuthController {
  constructor(private service: AuthService) {}

  @Post('login')
  async login(@Body() body: AuthLoginDto): Promise<AuthLoginResponse> {
    return await this.service.login(body);
  }
}
