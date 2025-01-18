import { ExceptionFilter, Catch, ArgumentsHost, HttpException, HttpStatus, ForbiddenException } from '@nestjs/common';
import { Request, Response } from 'express';
import { dateFormat } from '@utils/date';
import { InvalidMiddlewareException } from '@nestjs/core/errors/exceptions/invalid-middleware.exception';
import { ForbiddenTransactionModeOverrideError } from 'typeorm';

@Catch()
export class CustomExceptionFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    let status = HttpStatus.INTERNAL_SERVER_ERROR;
    let message = exception['message'] || 'Internal server error';

    if (exception instanceof HttpException) {
      status = exception.getStatus();
      message = exception.getResponse()['message'] || exception.getResponse();
    } else {
      console.log('exception', exception);
    }

    response.status(status).json({
      msg: message,
      code: status,
      path: request.url,
      method: request.method,
      time: dateFormat('Y-M-D H:I:S t'),
    });
  }
}
