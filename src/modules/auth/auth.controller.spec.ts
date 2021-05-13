import { BadRequestException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { plainToClass } from 'class-transformer';

import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { LoginResponse } from './dto/login-response.dto';
import { LoginDto } from './dto/login.dto';
import { RegisterAccountDto } from './dto/sign-up-input.dto';

describe('Auth Controller', () => {
  let controller: AuthController;
  let service: AuthService;

  beforeEach(async () => {
    const authServiceMockValue = {
      register: () => 'mock',
      login: () => 'mock',
    };
    const AuthServiceMock = {
      provide: AuthService,
      useValue: authServiceMockValue,
    };
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [AuthServiceMock],
    }).compile();

    service = module.get<AuthService>(AuthService);
    controller = module.get<AuthController>(AuthController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('register', () => {
    it('should call AuthService.register', async () => {
      const input: RegisterAccountDto = {
        name: 'a',
        email: 'a@example.com',
        password: 'secret',
      };
      const result = plainToClass(LoginResponse, {
        id: 1,
        name: 'a',
        email: 'a@example.com',
        token: 'a',
      });

      const rv = new Promise<LoginResponse>((resolve) => resolve(result));
      const register = jest.spyOn(service, 'register').mockReturnValue(rv);

      expect(await controller.register(input)).toBe(result);
      expect(register.mock.calls[0][0]).toBe(input);
    });
  });

  describe('login', () => {
    describe('when sign-in is successful', () => {
      it('should return token', async () => {
        const input: LoginDto = {
          email: 'a@example.com',
          password: 'secret',
        };
        const result = plainToClass(LoginResponse, {
          token: 'a',
        });

        const rv = new Promise<LoginResponse>((resolve) => resolve(result));
        const login = jest.spyOn(service, 'login').mockReturnValue(rv);

        expect(await controller.login(input)).toBe(result);
        expect(login.mock.calls[0][0]).toBe(input);
      });
    });

    describe('when sign-in failed', () => {
      it('should throw BadRequestException', async () => {
        const input: LoginDto = {
          email: 'a@example.com',
          password: 'secret',
        };
        const result = plainToClass(LoginResponse, {
          token: '',
        });

        const rv = new Promise<LoginResponse>((resolve) => resolve(result));
        const login = jest.spyOn(service, 'login').mockReturnValue(rv);

        const l = controller.login(input);
        await expect(l).rejects.toThrow(BadRequestException);
        expect(login.mock.calls[0][0]).toBe(input);
      });
    });
  });
});
