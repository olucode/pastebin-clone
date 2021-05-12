import { JwtService } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';
import * as bcrypt from 'bcrypt';
import { classToClass, plainToClass } from 'class-transformer';
import { Repository } from 'typeorm';

import { User } from '../users/users.entity';
import { UsersService } from '../users/users.service';

import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RegisterAccountDto } from './dto/sign-up-input.dto';

describe('AuthService', () => {
  let service: AuthService;
  let jwtService: JwtService;
  let usersService: UsersService;
  let usersRepo: Repository<User>;

  beforeEach(async () => {
    const jwtServiceMockValue = {
      sign: () => 'mock',
    };
    const JwtServiceMock = {
      provide: JwtService,
      useValue: jwtServiceMockValue,
    };
    const usersServiceMockValue = {
      findOneByName: () => 'mock',
      findAll: () => 'mock',
      findOne: () => 'mock',
      createNewUser: () => 'mock',
    };
    const UsersServiceMock = {
      provide: UsersService,
      useValue: usersServiceMockValue,
    };
    const usersRepoMockValue = {
      save: () => 'mock',
      findOne: () => 'mock',
    };
    const UsersRepoMock = {
      provide: 'UserRepository',
      useValue: usersRepoMockValue,
    };
    const module: TestingModule = await Test.createTestingModule({
      providers: [AuthService, JwtServiceMock, UsersServiceMock, UsersRepoMock],
    }).compile();

    service = module.get<AuthService>(AuthService);
    jwtService = module.get<JwtService>(JwtService);
    usersService = module.get<UsersService>(UsersService);
    usersRepo = module.get<Repository<User>>('UserRepository');
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('register', () => {
    it('should save user with hashed password', async () => {
      const input: RegisterAccountDto = {
        name: 'a',
        email: 'a@example.com',
        password: 'secret',
      };
      const user = plainToClass(User, {
        id: 1,
        name: 'a',
        email: 'a@example.com',
      });
      const token = 'j.w.t';
      const result = { ...user, token };

      const mockSalt = 'salt';
      const genSaltSync = jest
        .spyOn(bcrypt, 'genSaltSync')
        .mockReturnValue(mockSalt);
      const mockHash = 'hash';
      const hashSync = jest.spyOn(bcrypt, 'hashSync').mockReturnValue(mockHash);
      const createNewUser = jest
        .spyOn(usersService, 'createNewUser')
        .mockReturnValue(
          new Promise<User>((resolve) => resolve(user)),
        );

      const sign = jest.spyOn(jwtService, 'sign').mockReturnValue(token);

      expect(await service.register(input)).toEqual(result);
      expect(genSaltSync.mock.calls[0][0]).toBe(10);
      expect(hashSync.mock.calls[0][0]).toBe(input.password);
      expect(hashSync.mock.calls[0][1]).toBe(mockSalt);
      const saveInput = { ...input, password: mockHash };
      expect(createNewUser.mock.calls[0][0]).toEqual(saveInput);

      genSaltSync.mockRestore();
      hashSync.mockRestore();
      createNewUser.mockRestore();
      sign.mockRestore();
    });
  });

  describe('login', () => {
    describe('when the user exists', () => {
      it('should return valid token', async () => {
        const input: LoginDto = {
          email: 'a@example.com',
          password: 'secret',
        };
        const user = plainToClass(User, {
          id: 1,
          name: 'a',
          email: 'a@example.com',
        });
        const token = 'j.w.t';
        const result = { ...user, token };

        const findOne = jest.spyOn(usersService, 'findOne').mockReturnValue(
          new Promise<User>((resolve) => resolve(user)),
        );
        const compare = jest.spyOn(bcrypt, 'compare').mockReturnValue(
          new Promise<boolean>((resolve) => resolve(true)),
        );
        const sign = jest.spyOn(jwtService, 'sign').mockReturnValue(token);

        expect(await service.login(input)).toEqual(result);
        expect(findOne.mock.calls[0][0].email).toBe(input.email);

        findOne.mockRestore();
        compare.mockRestore();
        sign.mockRestore();
      });
    });

    describe('when the user does not exist', () => {
      it('should return empty token', async () => {
        const input: LoginDto = {
          email: 'a@example.com',
          password: 'secret',
        };
        const user = undefined;
        const result = {};

        const findOne = jest.spyOn(usersService, 'findOne').mockReturnValue(
          new Promise<undefined>((resolve) => resolve(user)),
        );

        expect(await service.login(input)).toEqual(result);
        expect(findOne.mock.calls[0][0].email).toBe(input.email);

        findOne.mockRestore();
      });
    });

    describe('when the password is invalid', () => {
      it('should return empty token', async () => {
        const input: LoginDto = {
          email: 'a@example.com',
          password: 'secret',
        };
        const user = plainToClass(User, {
          id: 1,
          name: 'a',
          email: 'a@example.com',
        });
        const result = {};

        const findOne = jest.spyOn(usersService, 'findOne').mockReturnValue(
          new Promise<User>((resolve) => resolve(user)),
        );
        const compare = jest.spyOn(bcrypt, 'compare').mockReturnValue(
          new Promise<boolean>((resolve) => resolve(false)),
        );

        expect(await service.login(input)).toEqual(result);
        expect(findOne.mock.calls[0][0].email).toBe(input.email);
        expect(compare.mock.calls[0][0]).toBe(input.password);
        expect(compare.mock.calls[0][1]).toBe(user.password);

        findOne.mockRestore();
        compare.mockRestore();
      });
    });
  });
});
