import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HttpModule } from '@nestjs/axios';

import { Wpp } from './entities/Wpp.entity';
import { User } from '../user/entities/user.entity';

import { WppController } from './wpp.controller';
import { WppService } from './wpp.service';
import { WppRepository } from './wpp.repository';
import { NotificationCoreModule } from '../notification/notification.core.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Wpp, User]),
    HttpModule,
    NotificationCoreModule,
  ],
  controllers: [WppController],
  providers: [WppService, WppRepository],
})
export class WppModule {}
