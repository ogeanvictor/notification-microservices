import { Injectable, NotFoundException } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';

import { Wpp } from './entities/Wpp.entity';

import { WppRepository } from './wpp.repository';
import { NotificationService } from '../notification/notification.service';
import { decrypt, encrypt } from 'src/common/utils/cryptKey';
import { NotificationChannel } from '../notification/entities/notification-channel.enum';

import { WppCreateDto } from './dtos/wpp-create.dto';
import { WppTemplatesResponseDto } from './dtos/wpp-template-response.dto';
import { WppTemplateDto } from './dtos/wpp-template.dto';

@Injectable()
export class WppService {
  constructor(
    private repository: WppRepository,
    private readonly httpService: HttpService,
    private notificationService: NotificationService,
  ) {}

  async create(body: WppCreateDto, userId: string): Promise<Wpp> {
    try {
      const cryptToken = encrypt(body.token);
      const wpp: Wpp = await this.repository.create(
        { ...body, token: cryptToken },
        userId,
      );
      return wpp;
    } catch (error: any) {
      throw error;
    }
  }

  async getTemplates(userId: string): Promise<WppTemplatesResponseDto> {
    try {
      const wpp: Wpp = await this.repository.findByUser(userId);

      if (!wpp) {
        throw new NotFoundException(
          'Whatsapp Cloud API account for this user is not found, please create a account!',
        );
      }

      const decryptToken = decrypt(wpp.token);

      const response = await firstValueFrom(
        this.httpService.get<WppTemplatesResponseDto>(
          `https://graph.facebook.com/v22.0/${wpp.businessPhone}/message_templates`,
          {
            headers: {
              Authorization: `Bearer ${decryptToken}`,
            },
          },
        ),
      );

      return response.data;
    } catch (error: any) {
      throw error;
    }
  }

  async sendTemplate(body: WppTemplateDto, userId: string): Promise<any> {
    try {
      const wpp: Wpp = await this.repository.findByUser(userId);

      if (!wpp) {
        throw new NotFoundException(
          'Whatsapp Cloud API account for this user is not found, please create a account!',
        );
      }

      const decryptToken = decrypt(wpp.token);

      const response = await firstValueFrom(
        this.httpService.post(
          `https://graph.facebook.com/v22.0/${wpp.businessPhone}/messages`,
          {
            messaging_product: 'whatsapp',
            recipient_type: 'individual',
            to: body.to,
            type: 'template',
            template: {
              name: body.template,
              language: {
                code: body.templateCode,
              },
              components: body.components,
            },
          },
          {
            headers: {
              Authorization: `Bearer ${decryptToken}`,
            },
          },
        ),
      );

      await this.notificationService.create(
        {
          channel: NotificationChannel.WPP,
          recipients: [body.to],
          priority: body.priority,
          data: JSON.stringify(body.components),
          message: body.template,
          subject: body.template,
        },
        userId,
      );

      return response.data;
    } catch (error: any) {
      throw error;
    }
  }
}
