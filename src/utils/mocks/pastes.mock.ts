/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { PastesService } from 'src/modules/pastes/pastes.service';

const pastesServiceMockValue = {
  findAll: () => jest.fn(),
  findOne: () => jest.fn(),
  create: () => jest.fn(),
};
export const PastesServiceMock = {
  provide: PastesService,
  useValue: pastesServiceMockValue,
};

const pastesRepoMockValue = {
  save: () => jest.fn(),
  findOne: () => jest.fn(),
};

export const PastesRepoMock = {
  provide: 'PasteRepository',
  useValue: pastesRepoMockValue,
};
