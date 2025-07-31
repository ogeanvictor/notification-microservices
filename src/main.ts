import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { NestExpressApplication } from '@nestjs/platform-express';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { WinstonModule } from 'nest-winston';

import { AppModule } from './app.module';
import { winstonConfig } from './common/utils/logger.config';
import { LoggingInterceptor } from './common/interceptors/logger.interceptor';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    logger: WinstonModule.createLogger(winstonConfig),
  });
  app.enableCors();
  app.useGlobalInterceptors(app.get(LoggingInterceptor));
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));

  const config = new DocumentBuilder()
    .setTitle('Notification Microservice')
    .setDescription('The notification microservice API documentation')
    .setVersion('1.0')
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
      },
      'access-token',
    )
    .build();

  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, documentFactory);

  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.RMQ,
    options: {
      urls: ['amqp://localhost:5672'],
      queue: 'notifications_queue',
      prefetchCount: 1,
      queueOptions: {
        durable: true,
        arguments: {
          'x-max-priority': 10,
        },
      },
      noAck: false,
    },
  });

  await app.startAllMicroservices();
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
