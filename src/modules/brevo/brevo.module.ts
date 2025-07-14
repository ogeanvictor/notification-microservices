import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Brevo } from './entities/brevo.entity';
import { User } from '../user/entities/user.entity';

import { BrevoController } from './brevo.controller';
import { BrevoService } from './brevo.service';
import { BrevoRepository } from './brevo.repository';
import { NotificationCoreModule } from '../notification/notification.core.module';
import { UserModule } from '../user/user.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Brevo, User]),
    NotificationCoreModule,
    UserModule,
  ],
  controllers: [BrevoController],
  providers: [BrevoService, BrevoRepository],
  exports: [BrevoService],
})
export class BrevoModule {}
