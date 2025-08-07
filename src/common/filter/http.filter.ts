import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { RequestContextService } from '../context/request-context.service';
import {prismaErrorMap} from "../errors/prisma-error.map";

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  constructor(private readonly context?: RequestContextService) {}

  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const res = ctx.getResponse<Response>();
    const req = ctx.getRequest<Request>();

    const timestamp = new Date().toISOString();
    const path = req.url;
    const requestId = this.context?.getRequestId?.() || 'unknown';

    let statusCode = HttpStatus.INTERNAL_SERVER_ERROR;
    let message: string | string[] = 'Internal server error';
    let errorCode = 'ERR_UNKNOWN';

    // ✅ 1. Nếu là Prisma lỗi đã được map
    const isPrismaError =
      exception?.constructor?.name === 'PrismaClientKnownRequestError' &&
      typeof exception.code === 'string';

    if (isPrismaError) {
      const mapped = prismaErrorMap[exception.code];
      statusCode = HttpStatus.BAD_REQUEST;

      if (mapped) {
        message = mapped.message;
        errorCode = mapped.code;
      } else {
        message = exception.message;
        errorCode = `ERR_PRISMA_${exception.code}`;
      }

      return res.status(statusCode).json({
        statusCode,
        message,
        errorCode,
        path,
        timestamp,
        requestId,
      });
    }

    // ✅ 2. Nếu là HttpException (BadRequest, NotFound, Validation, v.v.)
    if (exception instanceof HttpException) {
      const response = exception.getResponse();
      statusCode = exception.getStatus();

      if (typeof response === 'object' && response !== null) {
        const resObj = response as any;
        message = resObj.message || resObj.error || exception.message;
        errorCode = resObj.code || `ERR_HTTP_${statusCode}`;
      } else {
        message = response as string;
      }

      return res.status(statusCode).json({
        statusCode,
        message,
        errorCode,
        path,
        timestamp,
        requestId,
      });
    }

    // ✅ 3. Lỗi không xác định
    message = exception.message || message;

    return res.status(statusCode).json({
      statusCode,
      message,
      errorCode,
      path,
      timestamp,
      requestId,
    });
  }
}
