import { Body, Controller, Post, Req } from '@nestjs/common';
import { Request } from 'express';

import { Brevo } from './entities/brevo.entity';
import { BrevoService } from './brevo.service';

import { BrevoCreateDto } from './dtos/brevo-create.dto';

@Controller('brevo')
export class BrevoController {
  constructor(private service: BrevoService) {}

  @Post('/create')
  async create(
    @Body() body: BrevoCreateDto,
    @Req() req: Request,
  ): Promise<Brevo> {
    const user = req.user as { id: string };
    return await this.service.create(body, user.id);
  }
}
