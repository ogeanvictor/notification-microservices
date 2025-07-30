import { utilities as nestWinstonModuleUtilities } from 'nest-winston';
import * as winston from 'winston';
import LokiTransport from 'winston-loki';

export const winstonConfig = {
  transports: [
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.colorize(),
        winston.format.simple(),
        nestWinstonModuleUtilities.format.nestLike(
          'Notification-Microservice',
          {
            prettyPrint: true,
          },
        ),
      ),
    }),
    new LokiTransport({
      host: 'http://localhost:3100',
      labels: { app: 'notification-microservice' },
      json: true,
      batching: true,
      interval: 5,
    }),
  ],
};
