// src/common/context/request-context.service.ts
import { Injectable } from '@nestjs/common';
import { AsyncLocalStorage } from 'node:async_hooks';

@Injectable()
export class RequestContextService {
  private readonly als = new AsyncLocalStorage<Map<string, string>>();

  run(requestId: string, callback: () => void) {
    const store = new Map<string, string>();
    store.set('requestId', requestId);
    this.als.run(store, callback);
  }

  public getRequestId(): string | undefined {
    return this.als.getStore()?.get('requestId');
  }
}
