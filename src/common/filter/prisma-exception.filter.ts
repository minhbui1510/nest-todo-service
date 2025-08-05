import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpStatus,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { Prisma } from '@prisma/client';
import { prismaErrorMap } from '../errors/prisma-error.map';
import {RequestContextService} from "../context/request-context.service";

@Catch(Prisma.PrismaClientKnownRequestError)
export class PrismaExceptionFilter implements ExceptionFilter {
  constructor(private readonly context: RequestContextService) {}

  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const requestId = this.context.getRequestId();
    const errorCode = exception.code;
    const fallback = {
      code: 'UNKNOWN_ERROR',
      message: 'An unexpected database error occurred.',
    };

    const mapped = errorCode ? prismaErrorMap[errorCode] ?? fallback : fallback;

    const errorResponse = {
      statusCode: HttpStatus.BAD_REQUEST,
      errorCode: mapped.code,
      message: mapped.message,
      timestamp: new Date().toISOString(),
      path: request.url,
      requestId: requestId, // Include requestId for tracing
    };

    console.error('🔥 Prisma error caught:', {
      code: errorCode,
      message: exception.message,
        requestId: requestId,
    });

    response.status(HttpStatus.BAD_REQUEST).json(errorResponse);
  }
}
