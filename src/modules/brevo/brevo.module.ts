import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Brevo } from './entities/brevo.entity';
import { User } from '../user/entities/user.entity';

import { BrevoController } from './brevo.controller';
import { BrevoService } from './brevo.service';
import { BrevoRepository } from './brevo.repository';
import { NotificationModule } from '../notification/notification.module';

@Module({
  imports: [TypeOrmModule.forFeature([Brevo, User]), NotificationModule],
  controllers: [BrevoController],
  providers: [BrevoService, BrevoRepository],
})
export class BrevoModule {}
