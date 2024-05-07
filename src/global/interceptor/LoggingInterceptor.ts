// ** Nest Imports
import {
  CallHandler,
  ExecutionContext,
  Injectable,
  Logger,
  NestInterceptor,
} from '@nestjs/common';
import { Observable, tap } from 'rxjs';

// ** Type Imports
import type { CommonResponseType } from '../types';

// ** Utils Imports
import { parse } from 'url';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  private logger = new Logger(LoggingInterceptor.name);
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<any> | Promise<Observable<any>> {
    const request = context.switchToHttp().getRequest();
    const { pathname } = parse(request.url);

    this.logger.log(
      `${request.method} : ${pathname} ${JSON.stringify(
        request.query,
      )} ${JSON.stringify(request.body)}`,
    );

    return next.handle().pipe(
      tap({
        next: (response: CommonResponseType) => {
          this.logger.log(`${response.statusCode} : ${response.message}`);
        },
        // eslint-disable-next-line @typescript-eslint/no-empty-function
        error: (error: Error) => {},
      }),
    );
  }
}
