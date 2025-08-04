import { Module } from '@nestjs/common';
import { LoggerMiddleware } from './logger.middleware';
import { ApiKeyMiddleware } from './api-key.middleware';
import {RequestContextService} from "../context/request-context/request-context.service";

@Module({
  providers: [LoggerMiddleware, ApiKeyMiddleware, RequestContextService],
  exports: [LoggerMiddleware, ApiKeyMiddleware, RequestContextService],
})
export class MiddlewaresModule {}
