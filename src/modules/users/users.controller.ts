/* eslint-disable class-methods-use-this */
import {
  ClassSerializerInterceptor,
  Controller,
  Get,
  Req,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth } from '@nestjs/swagger';
import { Request } from 'express';

import { User } from './users.entity';
import { UsersService } from './users.service';

@Controller('api/users')
@UseGuards(AuthGuard())
@UseInterceptors(ClassSerializerInterceptor)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiBearerAuth()
  @Get()
  async findAll(): Promise<User[]> {
    return this.usersService.findAll({});
  }

  @ApiBearerAuth()
  @Get('profile')
  async profile(@Req() request: Request): Promise<User> {
    const authUser = request.user as User;
    return this.usersService.findOne({ id: authUser.id });
  }
}
