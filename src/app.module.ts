import { Module, NestModule, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { NotesModule } from './modules/notes/notes.module';
import { PrismaModule } from './prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';
import { MiddlewaresModule } from './common/middlewares/middlewares.module';
import { LoggerMiddleware } from './common/middlewares/logger.middleware';
import { ApiKeyMiddleware } from './common/middlewares/api-key.middleware';
import { RequestContextModule } from './common/context/request-context/request-context.module';
@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MiddlewaresModule,
    NotesModule,
    PrismaModule,
    RequestContextModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    console.log('🔁 AppModule configure() is called');

    consumer
      .apply(LoggerMiddleware, ApiKeyMiddleware)
      .forRoutes('*');
  }
}
