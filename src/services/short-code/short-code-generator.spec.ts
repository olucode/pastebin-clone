import { Test, TestingModule } from '@nestjs/testing';

import { ShortCodeService } from 'src/services/short-code/short-code-generator.service';
import { ConfigServiceMock } from 'src/utils/mocks/config.mocks';

describe('ShortCodeService', () => {
  let service: ShortCodeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ShortCodeService, ConfigServiceMock],
    }).compile();

    service = module.get<ShortCodeService>(ShortCodeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('when a code is generated', () => {
    it('should return a valid short code', async () => {
      const encoder = `${Date.now()}`;
      const result = await service.generate(encoder);

      expect(typeof result).toBe('string');
    });

    describe('using the same encoder value', () => {
      it('should return the same short code everytime', async () => {
        const encoder = '1234';
        const result = 'bRWn';
        const firstTestResult = await service.generate(encoder);
        const secondTestResult = await service.generate(encoder);

        expect(firstTestResult).toBe(secondTestResult);
        expect(secondTestResult).toBe(result);
      });
    });

    describe('using different encoder values', () => {
      it('should return different short codes', async () => {
        const encoder = Date.now();
        const firstTestResult = await service.generate(`${encoder}`);
        const secondTestResult = await service.generate(`12345`);

        expect(firstTestResult !== secondTestResult).toBe(true);
      });
    });
  });
});
