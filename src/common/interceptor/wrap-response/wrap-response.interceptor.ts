import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { map, Observable, tap } from 'rxjs';

@Injectable()
export class WrapResponseInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    console.log('Before...');

    //just log
    // return next.handle().pipe(tap((data) => console.log('After...', data)));

    //original data will wrap with data field
    return next.handle().pipe(map((data) => ({ data })));
  }
}
