import { ExceptionFilter, Catch, ArgumentsHost, HttpException, HttpStatus } from '@nestjs/common';
import { Request, Response } from 'express';
import { dateFormat } from '@utils/date';

@Catch()
export class CustomExceptionFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    let code = 1;
    let status = HttpStatus.INTERNAL_SERVER_ERROR;
    let message = exception['message'] || 'Internal server error';

    if (exception instanceof HttpException) {
      status = exception.getStatus();
      const res = exception.getResponse() as string | { message: string; code: number };
      message = res['message'] || res;
      code = res['code'] || status;
    } else {
      console.log('exception', exception);
    }

    response.status(status).send({
      code: code,
      msg: message,
      path: request.url,
      method: request.method,
      time: dateFormat('Y-M-D H:I:S t'),
    });
  }
}
