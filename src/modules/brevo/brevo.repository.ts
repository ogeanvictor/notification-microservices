import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';

import { User } from '../user/entities/user.entity';
import { Brevo } from './entities/brevo.entity';

import { BrevoRepositoryInterface } from './interfaces/brevo.repository.interface';

import { BrevoCreateDto } from './dtos/brevo-create.dto';

@Injectable()
export class BrevoRepository implements BrevoRepositoryInterface {
  constructor(
    @InjectRepository(Brevo) private repository: Repository<Brevo>,
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  async create(body: BrevoCreateDto, userId: string): Promise<Brevo> {
    const user: User = await this.userRepository.findOneOrFail({
      where: { id: userId },
    });

    const brevo = new Brevo();
    brevo.name = body.name;
    brevo.email = body.email;
    brevo.apiKey = body.apiKey;
    brevo.user = user;

    await this.repository.save(brevo);

    return brevo;
  }
}
