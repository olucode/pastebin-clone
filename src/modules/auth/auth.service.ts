import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { Repository } from 'typeorm';

import { User } from '../users/users.entity';
import { UsersService } from '../users/users.service';

import { JwtPayload } from './dto/jwt-payload.dto';
import { LoginResponse } from './dto/login-response.dto';
import { LoginDto } from './dto/login.dto';
import { RegisterAccountDto } from './dto/sign-up-input.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly usersService: UsersService,
    @InjectRepository(User)
    private readonly usersRepo: Repository<User>,
  ) {}

  async register(input: RegisterAccountDto): Promise<LoginResponse> {
    const password = AuthService.encryptPassword(input.password);
    const user = await this.usersService.createNewUser({
      ...input,
      password,
    });

    const payload: JwtPayload = {
      id: user.id,
      name: user.name,
      email: user.email,
    };
    const token = this.jwtService.sign(payload);

    return new LoginResponse({
      token,
      ...user,
    });
  }

  private static encryptPassword(password): string {
    const saltRounds = 10;
    const salt = bcrypt.genSaltSync(saltRounds);
    return bcrypt.hashSync(password, salt);
  }

  async login(input: LoginDto): Promise<LoginResponse> {
    const user = await this.usersService.findOne({ email: input.email });
    if (!user) {
      return new LoginResponse({
        token: null,
      });
    }

    const valid = await bcrypt.compare(input.password, user.password);
    if (!valid) {
      return new LoginResponse({
        token: null,
      });
    }

    const payload: JwtPayload = {
      id: user.id,
      name: user.name,
      email: user.email,
    };
    const token = this.jwtService.sign(payload);

    return new LoginResponse({
      token,
      ...user,
    });
  }

  async validateUser(payload: JwtPayload): Promise<User> {
    const user = await this.usersService.findOne({ email: payload.email });

    return user;
  }
}
