import { Body, Controller, Post } from '@nestjs/common';

import { UserService } from './user.service';

import { UserRegisterDto } from './dtos/user-register.dto';
import { UserRegisterResponseDto } from './dtos/user-register-response.dto';
import { ApiBadRequestResponse, ApiCreatedResponse } from '@nestjs/swagger';

@Controller('users')
export class UserController {
  constructor(private service: UserService) {}

  @ApiCreatedResponse({
    description: 'Register successfully.',
    type: UserRegisterResponseDto,
  })
  @ApiBadRequestResponse({ description: 'Invalid input data.' })
  @Post('register')
  async register(
    @Body() body: UserRegisterDto,
  ): Promise<UserRegisterResponseDto> {
    return await this.service.register(body);
  }
}
