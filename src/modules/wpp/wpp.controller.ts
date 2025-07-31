import { Body, Controller, Get, Post, Req } from '@nestjs/common';
import { Request } from 'express';
import { ApiBadRequestResponse, ApiCreatedResponse } from '@nestjs/swagger';

import { Wpp } from './entities/Wpp.entity';
import { WppService } from './wpp.service';

import { WppCreateDto } from './dtos/wpp-create.dto';
import { WppTemplatesResponseDto } from './dtos/wpp-template-response.dto';

@Controller('wpp')
export class WppController {
  constructor(private service: WppService) {}

  @ApiCreatedResponse({
    description: 'Wpp account created successfully.',
    type: WppCreateDto,
  })
  @ApiBadRequestResponse({ description: 'Invalid input data.' })
  @Post('/create')
  async create(@Body() body: WppCreateDto, @Req() req: Request): Promise<Wpp> {
    const user = req.user as { id: string };
    return await this.service.create(body, user.id);
  }

  @ApiCreatedResponse({
    description: 'Wpp list templates successfully.',
    type: WppTemplatesResponseDto,
  })
  @ApiBadRequestResponse({ description: 'Invalid input data.' })
  @Get('/templates')
  async getTemplates(@Req() req: Request): Promise<WppTemplatesResponseDto> {
    const user = req.user as { id: string };
    return await this.service.getTemplates(user.id);
  }
}
