import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { User } from '../user/entities/user.entity';
import { Facebook } from './entities/facebook.entity';

import { FacebookRepositoryInterface } from './interfaces/facebook.repository.interface';

import { FacebookCreateDto } from './dtos/facebook-create.dto';

@Injectable()
export class FacebookRepository implements FacebookRepositoryInterface {
  constructor(
    @InjectRepository(Facebook) private repository: Repository<Facebook>,
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  async create(body: FacebookCreateDto, userId: string): Promise<Facebook> {
    const user: User = await this.userRepository.findOneOrFail({
      where: { id: userId },
    });

    const facebook = new Facebook();
    facebook.businessPhone = body.businessPhone;
    facebook.token = body.token;
    facebook.user = user;

    await this.repository.save(facebook);

    return facebook;
  }

  async findByUser(userId: string): Promise<Facebook> {
    return await this.repository.findOneByOrFail({ user: { id: userId } });
  }
}
