import { PassportModule } from '@nestjs/passport';
import { Test, TestingModule } from '@nestjs/testing';
import { plainToClass } from 'class-transformer';
import { Repository } from 'typeorm';

import { CreatePasteDto } from './dto/create-paste.dto';
import { Paste } from './paste.entity';
import { PastesService } from './pastes.service';

import { User } from 'src/modules/users/users.entity';
import { ShortCodeService } from 'src/services/short-code/short-code-generator.service';
import { ConfigServiceMock } from 'src/utils/mocks/config.mocks';
import { PastesRepoMock } from 'src/utils/mocks/pastes.mock';
import { ShortCodeServiceMock } from 'src/utils/mocks/shared.mocks';

describe('PastesService', () => {
  let service: PastesService;
  let shortCodeService: ShortCodeService;
  let user: User;
  let pastesRepo: Repository<Paste>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [PassportModule.register({ defaultStrategy: 'mock' })],
      providers: [
        ConfigServiceMock,
        PastesService,
        PastesRepoMock,
        ShortCodeServiceMock,
      ],
    }).compile();

    service = module.get<PastesService>(PastesService);
    shortCodeService = module.get<ShortCodeService>(ShortCodeService);
    pastesRepo = module.get<Repository<Paste>>('PasteRepository');
    user = plainToClass(User, {
      id: '3dcd0205-9f4c-4b6d-8cdb-cd866525f62e',
      name: 'a',
      email: 'a@example.com',
    });
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create a paste', () => {
    it('should return a valid paste', async () => {
      const input: CreatePasteDto = {
        title: 'Hello World',
        content: 'All of the hello world content',
      };
      const shortCode = 'bRWn';
      const result = plainToClass(Paste, {
        id: '4dcd0205-9f4c-4b6d-8cdb-cd866525f62e',
        title: 'Hello World',
        content: 'All of the hello world content',
        shortCode,
        expiryDate: null,
      });

      const generate = jest.spyOn(shortCodeService, 'generate').mockReturnValue(
        new Promise<string>((resolve) => resolve(shortCode)),
      );
      const save = jest.spyOn(pastesRepo, 'save').mockReturnValue(
        new Promise<Paste>((resolve) => resolve(result)),
      );

      const testResult = await service.create(input, user);

      // the svae method call should be made with the right arguments
      expect(save.mock.calls[0][0]).toEqual(expect.objectContaining(input));
      expect(testResult).toBe(result);

      generate.mockRestore();
      save.mockRestore();
    });
  });
});
