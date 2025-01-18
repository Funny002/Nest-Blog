import { CallHandler, Injectable, NestInterceptor } from '@nestjs/common';
import { dateFormat } from '@utils/date';
import { map, Observable } from 'rxjs';

export class ResponseDto {
  data?: any;
  code: number;
  time?: string;
}

@Injectable()
export class ResponseInterceptor implements NestInterceptor {
  intercept(_: any, next: CallHandler): Observable<ResponseDto> | Promise<Observable<ResponseDto>> {
    return next.handle().pipe(
      map((context): ResponseDto => {
        return { code: 0, data: context, time: dateFormat('Y-M-D H:I:S t') };
      }),
    );
  }
}
