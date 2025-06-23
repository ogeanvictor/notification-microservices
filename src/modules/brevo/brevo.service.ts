import { Injectable } from '@nestjs/common';

import { Brevo } from './entities/brevo.entity';
import { BrevoRepository } from './brevo.repository';

import { BrevoCreateDto } from './dtos/brevo-create.dto';

@Injectable()
export class BrevoService {
  constructor(private repository: BrevoRepository) {}

  async create(body: BrevoCreateDto, userId: string): Promise<Brevo> {
    try {
      const brevo: Brevo = await this.repository.create(body, userId);
      return brevo;
    } catch (error: any) {
      throw error;
    }
  }
}
