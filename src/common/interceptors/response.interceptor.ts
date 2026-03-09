import {
    CallHandler,
    ExecutionContext,
    HttpStatus,
    Injectable,
    NestInterceptor,
} from '@nestjs/common';
import { map, Observable } from 'rxjs';

@Injectable()
export class ResponseInterceptor<T> implements NestInterceptor<T> {
    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        const response = context.switchToHttp().getResponse();

        return next.handle().pipe(
            map((data) => ({
                ok: true,
                error: false,
                message: data?.message || 'Request successful',
                code: response.statusCode || HttpStatus.OK,
                data: data?.data ?? data,
            })),
        );
    }
}