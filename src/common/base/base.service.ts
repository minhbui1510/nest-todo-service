import { Logger } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import {RequestContextService} from "../context/request-context/request-context.service";

export class BaseService {
  protected readonly logger: Logger;

  constructor(protected readonly context: RequestContextService) {
    this.logger = new Logger(this.constructor.name);
  }

  protected handleError(error: any, method: string): never {
    const requestId = this.context.getRequestId() || 'unknown';

    const contextInfo = `[${requestId}] ${this.constructor.name}.${method}`;

    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      this.logger.error(`${contextInfo} | Prisma error: ${error.code} - ${error.message}`);
      throw error; // để ExceptionFilter xử lý
    }

    this.logger.error(`${contextInfo} | Unexpected error: ${error.message}`, error.stack);
    throw new Error(`Unexpected error in ${this.constructor.name}.${method}: ${error.message}`);
  }
}
