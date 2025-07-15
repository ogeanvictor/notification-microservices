import { Injectable } from '@nestjs/common';

import { Facebook } from './entities/facebook.entity';

import { FacebookRepository } from './facebook.repository';
import { encrypt } from 'src/common/utils/cryptKey';

import { FacebookCreateDto } from './dtos/facebook-create.dto';

@Injectable()
export class FacebookService {
  constructor(private repository: FacebookRepository) {}

  async create(body: FacebookCreateDto, userId: string): Promise<Facebook> {
    try {
      const cryptToken = encrypt(body.token);
      const facebook: Facebook = await this.repository.create(
        { ...body, token: cryptToken },
        userId,
      );
      return facebook;
    } catch (error: any) {
      throw error;
    }
  }
}
