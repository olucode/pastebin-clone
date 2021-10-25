/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { plainToClass } from 'class-transformer';

import { GenericQueryBuilder } from './shared.mocks';
import { SampleUserRow } from './users.mocks';

import { Paste } from 'src/modules/pastes/paste.entity';
import { PastesService } from 'src/modules/pastes/pastes.service';

export const ValidTestShortCode = 'bRWn';

const pastesServiceMockValue = {
  findAll: () => jest.fn(),
  findOne: () => jest.fn(),
  create: () => jest.fn(),
};
export const PastesServiceMock = {
  provide: PastesService,
  useValue: pastesServiceMockValue,
};

export const SamplePasteRow = plainToClass(Paste, {
  id: '4dcd0205-9f4c-4b6d-8cdb-cd866525f62e',
  title: 'Hello World',
  content: 'All of the hello world content',
  shortCode: ValidTestShortCode,
  expiryDate: null,
  user: SampleUserRow,
  isPasteExpired: false,
});
export const PastesRepoMockValue = {
  save: () => jest.fn(),
  findOne: () => jest.fn(),
  createQueryBuilder: jest.fn(() =>
    Object.assign(GenericQueryBuilder, {
      getOne: () => SamplePasteRow,
    }),
  ),
};

export const PasteQueryBuilder = Object.assign(GenericQueryBuilder, {
  getOne: () => SamplePasteRow,
});

export const PastesRepoMock = {
  provide: 'PasteRepository',
  useValue: PastesRepoMockValue,
};
