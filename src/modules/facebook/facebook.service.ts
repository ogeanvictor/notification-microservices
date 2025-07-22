import { Injectable, NotFoundException } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';

import { Facebook } from './entities/facebook.entity';

import { FacebookRepository } from './facebook.repository';
import { decrypt, encrypt } from 'src/common/utils/cryptKey';

import { FacebookCreateDto } from './dtos/facebook-create.dto';
import { FacebookTemplatesDto } from './dtos/facebook-templates.dto';
import { FacebookWppDto } from './dtos/facebook-wpp.dto';
import { NotificationService } from '../notification/notification.service';

@Injectable()
export class FacebookService {
  constructor(
    private repository: FacebookRepository,
    private readonly httpService: HttpService,
    private notificationService: NotificationService,
  ) {}

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

  async getTemplates(userId: string): Promise<FacebookTemplatesDto> {
    try {
      const facebook: Facebook = await this.repository.findByUser(userId);

      if (!facebook) {
        throw new NotFoundException(
          'Facebook Cloud API account for this user is not found, please create a account!',
        );
      }

      const decryptToken = decrypt(facebook.token);

      const response = await firstValueFrom(
        this.httpService.get<FacebookTemplatesDto>(
          `https://graph.facebook.com/v22.0/${facebook.businessPhone}/message_templates`,
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

  async sendTemplate(body: FacebookWppDto, userId: string): Promise<any> {
    try {
      const facebook: Facebook = await this.repository.findByUser(userId);

      if (!facebook) {
        throw new NotFoundException(
          'Facebook Cloud API account for this user is not found, please create a account!',
        );
      }

      const decryptToken = decrypt(facebook.token);

      const response = await firstValueFrom(
        this.httpService.post(
          `https://graph.facebook.com/v22.0/${facebook.businessPhone}/messages`,
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
          channel: body.channel,
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
