import { HttpException, HttpStatus } from '@nestjs/common';

export class CustomError extends HttpException {
  constructor(message: string, code: number = 1, status: HttpStatus = HttpStatus.OK) {
    super({ message, code }, status);
  }
}
