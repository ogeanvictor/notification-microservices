import { Body, Controller, Get, Param, Post, Query, Req } from '@nestjs/common';
import { Request } from 'express';

import { NotificationService } from './notification.service';

import { ListQueryDto } from '../../common/dtos/list-query.dto';
import { NotificationListResponse } from './dtos/notification-list-response.dto';
import { Notification } from './entities/notification.entity';
import { NotificationCreateDto } from './dtos/notification-create.dto';

@Controller('notifications')
export class NotificationController {
  constructor(private service: NotificationService) {}

  @Get()
  async findAll(
    @Query() query: ListQueryDto,
    @Req() req: Request,
  ): Promise<NotificationListResponse> {
    const user = req.user as { id: string };
    return await this.service.findAll(query, user.id);
  }

  @Get(':id')
  async findById(@Param('id') id: string): Promise<Notification | null> {
    return await this.service.findById(id);
  }

  @Post('/sendEmail')
  async sendEmail(
    @Body() body: NotificationCreateDto,
    @Req() req: Request,
  ): Promise<string> {
    const user = req.user as { id: string };
    await this.service.publishNotification(body, user.id);
    return 'Notification queued!';
  }
}
