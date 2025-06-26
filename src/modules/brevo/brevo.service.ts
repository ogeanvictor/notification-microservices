import { Injectable, NotFoundException } from '@nestjs/common';
import * as BrevoInstance from '@getbrevo/brevo';

import { Brevo } from './entities/brevo.entity';
import { BrevoRepository } from './brevo.repository';
import { encrypt, decrypt } from '../../common/utils/cryptKey';
import { NotificationService } from '../notification/notification.service';

import { BrevoCreateDto } from './dtos/brevo-create.dto';
import { NotificationCreateDto } from '../notification/dtos/notification-create.dto';

@Injectable()
export class BrevoService {
  constructor(
    private repository: BrevoRepository,
    private notificationService: NotificationService,
  ) {}

  async create(body: BrevoCreateDto, userId: string): Promise<Brevo> {
    try {
      const cryptKey = encrypt(body.apiKey);
      const brevo: Brevo = await this.repository.create(
        { ...body, apiKey: cryptKey },
        userId,
      );
      return brevo;
    } catch (error: any) {
      throw error;
    }
  }

  private buildBrevoInstance(
    apiKey: string,
  ): BrevoInstance.TransactionalEmailsApi {
    const instance = new BrevoInstance.TransactionalEmailsApi();
    instance.setApiKey(
      BrevoInstance.TransactionalEmailsApiApiKeys.apiKey,
      decrypt(apiKey),
    );
    return instance;
  }

  async sendEmail(body: NotificationCreateDto, userId: string): Promise<void> {
    try {
      const brevoUserInstance: Brevo | null =
        await this.repository.findByUser(userId);

      if (!brevoUserInstance) {
        throw new NotFoundException(
          'Brevo account for this user is not found, please create a account!',
        );
      }

      const brevoApi = this.buildBrevoInstance(brevoUserInstance.apiKey);
      const emailObject = this.createEmailObject(body, brevoUserInstance);

      await this.notificationService.create(body, userId);
      await brevoApi.sendTransacEmail(emailObject);
    } catch (error: any) {
      throw error;
    }
  }

  private createEmailObject(
    body: NotificationCreateDto,
    brevo: Brevo,
  ): BrevoInstance.SendSmtpEmail {
    const emailObject = new BrevoInstance.SendSmtpEmail();
    emailObject.subject = body.subject;
    emailObject.sender = {
      name: brevo.name,
      email: brevo.email,
    };
    emailObject.to = body.recipients;
    emailObject.htmlContent = body.message;

    return emailObject;
  }
}
