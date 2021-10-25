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
import { ShortCodeService } from 'src/services/short-code/short-code-generator.service';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepo: Repository<User>,
    private readonly shortCodeService: ShortCodeService,
  ) {}

  async createNewUser(data: RegisterAccountDto): Promise<User> {
    // Generate Username
    // const username = await UsersService.generateUniqueID();
    const username = await this.shortCodeService.generate(`${Date.now()}`);

    // Check if username is unique, otherwise cary on
    const isUserExists = await this.isUserExists(username);
    if (isUserExists) {
      return this.createNewUser(data);
    }

    const u = {
      ...data,
      username,
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

  // Need to find a beter way to generate usernames
  static async generateUniqueID(): Promise<string> {
    return Math.random().toString(36).slice(2, 11);
  }

  async isUserExists(username: string): Promise<boolean> {
    const u = await this.findOne({ username });

    return !!u;
  }
}
