import {
  forwardRef,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import * as BrevoInstance from '@getbrevo/brevo';

import { Brevo } from './entities/brevo.entity';
import { BrevoRepository } from './brevo.repository';
import { encrypt, decrypt } from '../../common/utils/cryptKey';
import { NotificationService } from '../notification/notification.service';

import { BrevoCreateDto } from './dtos/brevo-create.dto';
import { BrevoSmsDto } from './dtos/brevo-sms.dto';
import { User } from '../user/entities/user.entity';
import { UserRepository } from '../user/user.repository';
import { BrevoEmailDto } from './dtos/brevo-email.dto';

@Injectable()
export class BrevoService {
  constructor(
    private repository: BrevoRepository,
    private userRepository: UserRepository,
    @Inject(forwardRef(() => NotificationService))
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

  private buildBrevoEmailInstance(
    apiKey: string,
  ): BrevoInstance.TransactionalEmailsApi {
    const instance = new BrevoInstance.TransactionalEmailsApi();
    instance.setApiKey(
      BrevoInstance.TransactionalEmailsApiApiKeys.apiKey,
      decrypt(apiKey),
    );
    return instance;
  }

  private buildBrevoSmsInstance(
    apiKey: string,
  ): BrevoInstance.TransactionalSMSApi {
    const instance = new BrevoInstance.TransactionalSMSApi();
    instance.setApiKey(
      BrevoInstance.TransactionalSMSApiApiKeys.apiKey,
      decrypt(apiKey),
    );
    return instance;
  }

  async sendEmail(body: BrevoEmailDto, userId: string): Promise<void> {
    try {
      const brevoUserInstance: Brevo | null =
        await this.repository.findByUser(userId);

      if (!brevoUserInstance) {
        throw new NotFoundException(
          'Brevo account for this user is not found, please create a account!',
        );
      }

      const brevoApi = this.buildBrevoEmailInstance(brevoUserInstance.apiKey);
      const emailObject = this.createEmailObject(body, brevoUserInstance);

      await this.notificationService.create(
        {
          ...body,
          recipients: body.recipients.map((recipient) => recipient.email),
        },
        userId,
      );
      await brevoApi.sendTransacEmail(emailObject);
    } catch (error: any) {
      throw error;
    }
  }

  async sendSms(body: BrevoSmsDto, userId: string): Promise<void> {
    try {
      const brevoUserInstance: Brevo | null =
        await this.repository.findByUser(userId);

      const user: User | null = await this.userRepository.findById(userId);

      if (!brevoUserInstance) {
        throw new NotFoundException(
          'Brevo account for this user is not found, please create a account!',
        );
      }

      const brevoApi = this.buildBrevoSmsInstance(brevoUserInstance.apiKey);
      const smsObject = this.createSmsObject(body, user);

      await this.notificationService.create(body, userId);
      await brevoApi.sendTransacSms(smsObject);
    } catch (error: any) {
      throw error;
    }
  }

  private createEmailObject(
    body: BrevoEmailDto,
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

  private createSmsObject(
    body: BrevoSmsDto,
    user: User,
  ): BrevoInstance.SendTransacSms {
    const emailObject = new BrevoInstance.SendTransacSms();
    emailObject.recipient = body.recipients[0];
    emailObject.sender = user.name;
    emailObject.content = body.message;

    return emailObject;
  }
}
