import {
  BadRequestException,
  Body,
  ClassSerializerInterceptor,
  Controller,
  Post,
  UseInterceptors,
} from '@nestjs/common';

import { AuthService } from './auth.service';
import { LoginResponse } from './dto/login-response.dto';
import { LoginDto } from './dto/login.dto';
import { RegisterAccountDto } from './dto/sign-up-input.dto';

@Controller('api/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseInterceptors(ClassSerializerInterceptor)
  @Post('register')
  async register(@Body() input: RegisterAccountDto): Promise<LoginResponse> {
    const result = await this.authService.register(input);

    return result;
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Post('login')
  async login(@Body() input: LoginDto): Promise<LoginResponse> {
    const result = await this.authService.login(input);
    if (!result.token) {
      throw new BadRequestException('Incorrect email or password');
    }

    return result;
  }
}
