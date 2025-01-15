import { Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiTags, ApiOperation } from '@nestjs/swagger';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @ApiOperation({ summary: '登录' })
  async login() {}

  @Post('register')
  @ApiOperation({ summary: '注册' })
  async register() {}

  @Post('logout')
  @ApiOperation({ summary: '退出登录' })
  async logout() {}

  @Post('refresh')
  @ApiOperation({ summary: '刷新token' })
  async refresh() {}

  @Post('forget')
  @ApiOperation({ summary: '忘记密码' })
  async forget() {}

  @Post('sendCode')
  @ApiOperation({ summary: '发送验证码' })
  async sendCode() {}
}
