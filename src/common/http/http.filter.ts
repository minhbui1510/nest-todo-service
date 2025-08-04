import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Request, Response } from 'express';
import {RequestContextService} from "../context/request-context/request-context.service";

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  constructor(private readonly context: RequestContextService) {}

  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    const message =
      exception instanceof HttpException
        ? exception.getResponse()
        : exception.message;

    const errorResponse = {
      statusCode: status,
      message: message,
      timestamp: new Date().toISOString(),
      path: request.url,
      requestId: this.context.getRequestId(), // Include requestId for tracing
    };

    console.error('❌ Exception caught:', exception);

    response.status(status).json(errorResponse);
  }
}
