import { Controller, Get, Req } from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';
import { Request } from 'express';

@Controller()
export class AppController {
  @Get('csrfToken')
  @ApiOperation({ summary: '获取 CSRF Token' })
  csrfToken(@Req() req: Request) {
    return req.csrfToken();
  }
}
