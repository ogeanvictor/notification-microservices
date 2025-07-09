import { Module } from '@nestjs/common';

import { QueueSetupService } from './queue-setup.service';

@Module({
  providers: [QueueSetupService],
})
export class QueueSetupModule {}
