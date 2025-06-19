import { ConflictException, Injectable } from '@nestjs/common';
import { hashSync } from 'bcrypt';

import { UserRepository } from './user.repository';
import { User } from './entities/user.entity';

import { UserRegisterResponseDto } from './dtos/user-register-response.dto';
import { UserRegisterDto } from './dtos/user-register.dto';

@Injectable()
export class UserService {
  constructor(private repository: UserRepository) {}

  async register(body: UserRegisterDto): Promise<UserRegisterResponseDto> {
    try {
      const userExist: User | null = await this.repository.findByEmail(
        body.email,
      );
      if (userExist) {
        throw new ConflictException('User with email already exists!');
      }

      const hashPassword: string = hashSync(body.password, 10);
      const user: UserRegisterResponseDto = await this.repository.register({
        ...body,
        password: hashPassword,
      });

      return user;
    } catch (error: any) {
      throw error;
    }
  }
}
