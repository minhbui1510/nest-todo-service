import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
  constructor() {
    super({
      log: ['query', 'info', 'warn', 'error'],
    });
  }

  async onModuleInit() {
    await this.$connect();

    // Middleware log
    this.$use(async (params, next) => {
      const start = Date.now();
      const result = await next(params);
      const duration = Date.now() - start;

      console.log(`[PRISMA] ${params.model}.${params.action} (${duration}ms)`);

      if (['create', 'update', 'delete'].includes(params.action)) {
        console.log(`[DATA]`, JSON.stringify(params.args, null, 2));
      }

      return result;
    });
  }

  async onModuleDestroy() {
    await this.$disconnect();
  }
}
