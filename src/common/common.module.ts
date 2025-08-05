import {Module} from '@nestjs/common';
import {RequestContextService} from "./context/request-context.service";
import {LoggerMiddleware} from "./middlewares/logger.middleware";
import {ApiKeyMiddleware} from "./middlewares/api-key.middleware";
import {TrimPipe} from "./pipe/trim.pipe";
import {PrismaService} from "./context/prisma.service";

@Module({
    providers: [LoggerMiddleware, ApiKeyMiddleware, RequestContextService,PrismaService, TrimPipe],
    exports: [LoggerMiddleware, ApiKeyMiddleware, RequestContextService,PrismaService, TrimPipe],
})
export class CommonModule {
}
