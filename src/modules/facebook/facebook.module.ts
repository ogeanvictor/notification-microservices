import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Facebook } from './entities/facebook.entity';
import { User } from '../user/entities/user.entity';

import { FacebookController } from './facebook.controller';
import { FacebookService } from './facebook.service';
import { FacebookRepository } from './facebook.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Facebook, User])],
  controllers: [FacebookController],
  providers: [FacebookService, FacebookRepository],
})
export class FacebookModule {}
