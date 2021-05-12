import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  FindConditions,
  FindManyOptions,
  FindOneOptions,
  Repository,
} from 'typeorm';

import { User } from './users.entity';

import { RegisterAccountDto } from 'src/modules/auth/dto/sign-up-input.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepo: Repository<User>,
  ) {}

  async createNewUser(data: RegisterAccountDto): Promise<User> {
    // Generate Username
    const u = {
      ...data,
    };
    const user = await this.usersRepo.save(u);

    return user;
  }

  async findAll(options?: FindManyOptions<User>): Promise<User[]> {
    const users = await this.usersRepo.find({
      ...options,
    });
    return users;
  }

  async findOne(
    where: FindConditions<User>,
    opts?: FindOneOptions<User>,
  ): Promise<User> {
    const user = await this.usersRepo.findOne({
      ...opts,
      where,
    });

    return user;
  }
}
