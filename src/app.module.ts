import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { WinstonModule } from 'nest-winston';

import { DatabaseModule } from './config/database.module';
import { UserModule } from './modules/user/user.module';
import { AuthModule } from './modules/auth/auth.module';
import { NotificationModule } from './modules/notification/notification.module';
import { BrevoModule } from './modules/brevo/brevo.module';
import { WppModule } from './modules/wpp/wpp.module';
import { NotificationCoreModule } from './modules/notification/notification.core.module';
import { QueueSetupModule } from './modules/queue/queue.module';
import { LoggingInterceptor } from './common/interceptors/logger.interceptor';
import { winstonConfig } from './common/utils/logger.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    WinstonModule.forRoot(winstonConfig),
    DatabaseModule,
    UserModule,
    AuthModule,
    NotificationModule,
    NotificationCoreModule,
    BrevoModule,
    WppModule,
    QueueSetupModule,
  ],
  controllers: [],
  providers: [LoggingInterceptor],
})
export class AppModule {}
