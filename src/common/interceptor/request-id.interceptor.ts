import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
  StreamableFile,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class RequestIdInterceptor implements NestInterceptor {
  constructor(private readonly context: { getRequestId: () => string }) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const requestId = this.context.getRequestId();

    return next.handle().pipe(
      map((data) => {
        // Bỏ qua các response dạng stream/file
        if (data instanceof StreamableFile /* || data instanceof Buffer */) {
          return data;
        }

        // Mảng → bọc trong field `data`
        if (Array.isArray(data)) {
          return { data, requestId };
        }

        // Object (không phải null) → spread an toàn
        if (data !== null && typeof data === 'object') {
          return { ...data, requestId };
        }

        // Primitive (string/number/boolean/null/undefined) → bọc lại
        return { data, requestId };
      }),
    );
  }
}
