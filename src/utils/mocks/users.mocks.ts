/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
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

const usersRepoMockValue = {
  save: () => jest.fn(),
  find: () => jest.fn(),
  findOne: () => jest.fn(),
};
export const UsersRepoMock = {
  provide: 'UserRepository',
  useValue: usersRepoMockValue,
};
