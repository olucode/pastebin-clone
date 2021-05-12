/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { ShortCodeService } from 'src/services/short-code/short-code-generator.service';

const shortCodeServiceMockValue = {
  generate: () => jest.fn(),
};

export const ShortCodeServiceMock = {
  provide: ShortCodeService,
  useValue: shortCodeServiceMockValue,
};
