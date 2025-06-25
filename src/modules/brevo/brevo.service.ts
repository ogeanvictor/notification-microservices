import { Injectable, NotFoundException } from '@nestjs/common';
import * as BrevoInstance from '@getbrevo/brevo';

import { Brevo } from './entities/brevo.entity';
import { BrevoRepository } from './brevo.repository';
import { encrypt, decrypt } from 'src/common/utils/cryptKey';
import { NotificationService } from '../notification/notification.service';

import { BrevoCreateDto } from './dtos/brevo-create.dto';
import { NotificationCreateDto } from '../notification/dtos/notification-create.dto';

@Injectable()
export class BrevoService {
  private apiInstance: BrevoInstance.TransactionalEmailsApi;

  constructor(
    private repository: BrevoRepository,
    private notificationService: NotificationService,
  ) {
    this.apiInstance = new BrevoInstance.TransactionalEmailsApi();
  }

  private configApiKey(apiKey: string): void {
    this.apiInstance.setApiKey(
      BrevoInstance.TransactionalEmailsApiApiKeys.apiKey,
      decrypt(apiKey),
    );
  }

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

  async sendEmail(body: NotificationCreateDto, userId: string): Promise<void> {
    try {
      const brevoUserInstance: Brevo | null =
        await this.repository.findByUser(userId);

      if (!brevoUserInstance) {
        throw new NotFoundException(
          'Brevo account for this user is not found, please create a account!',
        );
      }

      const object = this.createEmailObject(body, brevoUserInstance);
      this.configApiKey(brevoUserInstance.apiKey);

      await this.notificationService.create(body, userId);
      await this.apiInstance.sendTransacEmail(object);
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
