import { Body, Controller, Post, Req } from '@nestjs/common';
import { Request } from 'express';

import { Brevo } from './entities/brevo.entity';
import { BrevoService } from './brevo.service';

import { BrevoCreateDto } from './dtos/brevo-create.dto';
import { NotificationCreateDto } from '../notification/dtos/notification-create.dto';

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

  @Post('/sendEmail')
  async sendEmail(
    @Body() body: NotificationCreateDto,
    @Req() req: Request,
  ): Promise<string> {
    const user = req.user as { id: string };
    await this.service.sendEmail(body, user.id);
    return 'Email sent!';
  }
}
