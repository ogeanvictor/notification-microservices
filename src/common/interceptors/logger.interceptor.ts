import {
  CallHandler,
  ExecutionContext,
  Inject,
  Injectable,
  LoggerService,
  NestInterceptor,
} from '@nestjs/common';
import { Response, Request } from 'express';
import * as winston from 'winston';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import { Observable, tap } from 'rxjs';

interface LogRequest {
  method: string;
  originalUrl: string;
  body: unknown;
  query: unknown;
  params: unknown;
}

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  constructor(
    @Inject(WINSTON_MODULE_NEST_PROVIDER)
    private readonly logger: LoggerService,
  ) {}

  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> | Promise<Observable<any>> {
    const now = Date.now();
    const ctx = context.switchToHttp();

    const req = ctx.getRequest<Request>();
    const res = ctx.getResponse<Response>();

    const { method, originalUrl, body, query, params } =
      req as unknown as LogRequest;

    this.logger.log({
      message: 'Incoming request',
      method,
      url: originalUrl,
      body,
      query,
      params,
    });

    return next.handle().pipe(
      tap((responseData: Response) => {
        const duration = Date.now() - now;
        const statusCode = res?.statusCode ?? 500;

        this.logger.log({
          message: 'Outgoing response',
          method,
          url: originalUrl,
          statusCode,
          duration,
          response: responseData,
        });
      }),
    );
  }
}
