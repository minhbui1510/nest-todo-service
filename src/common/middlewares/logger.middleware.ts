import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import {RequestContextService} from "../context/request-context.service";

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
 constructor(private readonly context: RequestContextService) {}

  use(req: Request, res: Response, next: NextFunction) {
    const requestId =
      req.headers['x-request-id']?.toString() || Date.now().toString();
      console.log(`[LOGGER] Request ID: ${requestId} - ${req.method} ${req.url}`);
    this.context.run(requestId, next);
  }
}
