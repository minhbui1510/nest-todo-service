import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import {RequestContextService} from "../context/request-context/request-context.service";

@Injectable()
export class RequestIdInterceptor implements NestInterceptor {
  constructor(private readonly context: RequestContextService) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const requestId = this.context.getRequestId();
    console.log(context)
    return next.handle().pipe(
      map((data) => ({
        ...data,
        requestId,
      })),
    );
  }
}
