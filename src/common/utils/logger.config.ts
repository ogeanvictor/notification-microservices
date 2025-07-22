import { WinstonModuleOptions } from 'nest-winston';
import winston from 'winston';
import LokiTransport from 'winston-loki';

export const winstonConfig: WinstonModuleOptions = {
  transports: [
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.colorize(),
        winston.format.simple(),
      ),
    }),
    new LokiTransport({
      host: 'http://localhost:3001',
      labels: { job: 'nestjs-service' },
      json: true,
      batching: true,
      interval: 5,
    }),
  ],
};
