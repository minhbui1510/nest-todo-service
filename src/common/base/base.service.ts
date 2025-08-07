import {Logger} from '@nestjs/common';
import {Prisma} from '@prisma/client';
import {RequestContextService} from "../context/request-context.service";

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
    throw error; // ✅ giữ nguyên để PrismaExceptionFilter xử lý
  }

  this.logger.error(`${contextInfo} | Unexpected error: ${error.message}`, error.stack);

  // ✅ Nên ném lại lỗi gốc thay vì Error mới (để tránh override stack và filter)
  throw error;
}
}
