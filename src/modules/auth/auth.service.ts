import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compare } from 'bcrypt';

import { UserRepository } from '../user/user.repository';
import { User } from '../user/entities/user.entity';

import { AuthLoginDto } from './dtos/auth-login.dto';
import { AuthLoginResponse } from './dtos/auth-login-response.dto';

@Injectable()
export class AuthService {
  constructor(
    private userRepository: UserRepository,
    private jwtService: JwtService,
  ) {}

  async login(body: AuthLoginDto): Promise<AuthLoginResponse> {
    try {
      const user: User | null = await this.userRepository.findByEmail(
        body.email,
      );
      if (!user) {
        throw new UnauthorizedException('Email or password is wrong!');
      }

      const isPasswordValid: boolean = await compare(
        body.password,
        user.password,
      );

      if (!isPasswordValid) {
        throw new UnauthorizedException('Email or password is wrong!');
      }

      const payload = { id: user.id, email: user.email };
      const token = await this.jwtService.signAsync(payload);

      return {
        token,
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
        },
      };
    } catch (error: any) {
      throw error;
    }
  }
}
