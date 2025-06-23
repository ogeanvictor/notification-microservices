import { Module } from '@nestjs/common';

import { BrevoController } from './brevo.controller';
import { BrevoService } from './brevo.service';
import { BrevoRepository } from './brevo.repository';

@Module({
  imports: [],
  controllers: [BrevoController],
  providers: [BrevoService, BrevoRepository],
})
export class BrevoModule {}
