import { Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { UsersService } from './users.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('list')
  @ApiOperation({ summary: '获取用户列表' })
  async list() {}

  @Get('info/:uid')
  @ApiOperation({ summary: '获取用户信息' })
  async info(@Param('uid') uid: number) {}

  @Post('create')
  @ApiOperation({ summary: '创建用户' })
  async add() {}

  @Put('update/:uid')
  @ApiOperation({ summary: '更新用户信息' })
  async update(@Param('uid') uid: number) {}

  @Delete('delete/:uid')
  @ApiOperation({ summary: '删除用户' })
  async delete(@Param('uid') uid: number) {}
}
