/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { ExecutionContext } from '@nestjs/common';

import { SampleUserRow } from './users.mocks';

import { ShortCodeService } from 'src/services/short-code/short-code-generator.service';

const shortCodeServiceMockValue = {
  generate: () => jest.fn(),
};

export const ShortCodeServiceMock = {
  provide: ShortCodeService,
  useValue: shortCodeServiceMockValue,
};

export const GenericQueryBuilder: any = {
  delete: () => GenericQueryBuilder,
  execute: () => GenericQueryBuilder,
  from: () => GenericQueryBuilder,
  innerJoin: () => GenericQueryBuilder,
  innerJoinAndSelect: () => GenericQueryBuilder,
  where: () => GenericQueryBuilder,
  andWhere: () => GenericQueryBuilder,
  leftJoinAndSelect: () => GenericQueryBuilder,
  of: () => GenericQueryBuilder,
};

export const MockAuthGuard = {
  canActivate: jest.fn((context: ExecutionContext) => {
    const req = context.switchToHttp().getRequest();
    req.user = SampleUserRow;

    return true;
  }),
};
