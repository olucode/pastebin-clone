/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { plainToClass } from 'class-transformer';

import { User } from 'src/modules/users/users.entity';
import { UsersService } from 'src/modules/users/users.service';

const usersServiceMockValue = {
  findAll: () => jest.fn(),
  findOne: () => jest.fn(),
  createNewUser: () => jest.fn(),
};
export const UsersServiceMock = {
  provide: UsersService,
  useValue: usersServiceMockValue,
};

export const SampleUserRow = plainToClass(User, {
  id: '4dcd0205-9f4c-4b6d-8cdb-cd866525f62e',
  name: 'a',
  email: 'a@a.com',
  password: '12345',
});

const usersRepoMockValue = {
  save: () => jest.fn(),
  find: () => jest.fn(),
  findOne: () => jest.fn(),
};
export const UsersRepoMock = {
  provide: 'UserRepository',
  useValue: usersRepoMockValue,
};
