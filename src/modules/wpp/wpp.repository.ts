import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { User } from '../user/entities/user.entity';

import { WppRepositoryInterface } from './interfaces/wpp.repository.interface';

import { WppCreateDto } from './dtos/wpp-create.dto';
import { Wpp } from './entities/Wpp.entity';

@Injectable()
export class WppRepository implements WppRepositoryInterface {
  constructor(
    @InjectRepository(Wpp) private repository: Repository<Wpp>,
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  async create(body: WppCreateDto, userId: string): Promise<Wpp> {
    const user: User = await this.userRepository.findOneOrFail({
      where: { id: userId },
    });

    const wpp = new Wpp();
    wpp.businessPhone = body.businessPhone;
    wpp.phoneId = body.phoneId;
    wpp.token = body.token;
    wpp.user = user;

    await this.repository.save(wpp);

    return wpp;
  }

  async findByUser(userId: string): Promise<Wpp> {
    return await this.repository.findOneByOrFail({ user: { id: userId } });
  }
}
