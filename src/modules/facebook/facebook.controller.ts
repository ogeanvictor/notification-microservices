import { Body, Controller, Post, Req } from '@nestjs/common';
import { Request } from 'express';

import { Facebook } from './entities/facebook.entity';
import { FacebookService } from './facebook.service';

import { FacebookCreateDto } from './dtos/facebook-create.dto';

@Controller('facebook')
export class FacebookController {
  constructor(private service: FacebookService) {}

  @Post('/create')
  async create(
    @Body() body: FacebookCreateDto,
    @Req() req: Request,
  ): Promise<Facebook> {
    const user = req.user as { id: string };
    return await this.service.create(body, user.id);
  }
}
