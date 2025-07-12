import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';

import { UserRepositoryInterface } from './interfaces/user.repository.interface';
import { User } from './entities/user.entity';

import { UserRegisterResponseDto } from './dtos/user-register-response.dto';
import { UserRegisterDto } from './dtos/user-register.dto';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UserRepository implements UserRepositoryInterface {
  constructor(@InjectRepository(User) private repository: Repository<User>) {}

  async register(body: UserRegisterDto): Promise<UserRegisterResponseDto> {
    const user: User = this.repository.create(body);

    await this.repository.save(user);

    return user;
  }

  async findByEmail(email: string): Promise<User | null> {
    return await this.repository.findOne({ where: { email } });
  }

  async findById(id: string): Promise<User> {
    return await this.repository.findOneOrFail({ where: { id } });
  }
}
