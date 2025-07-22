import { Body, Controller, Get, Post, Req } from '@nestjs/common';
import { Request } from 'express';

import { Wpp } from './entities/Wpp.entity';
import { WppService } from './wpp.service';

import { WppCreateDto } from './dtos/wpp-create.dto';
import { WppTemplatesResponseDto } from './dtos/wpp-template-response.dto';

@Controller('wpp')
export class WppController {
  constructor(private service: WppService) {}

  @Post('/create')
  async create(@Body() body: WppCreateDto, @Req() req: Request): Promise<Wpp> {
    const user = req.user as { id: string };
    return await this.service.create(body, user.id);
  }

  @Get('/templates')
  async getTemplates(@Req() req: Request): Promise<WppTemplatesResponseDto> {
    const user = req.user as { id: string };
    return await this.service.getTemplates(user.id);
  }
}
