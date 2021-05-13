/* eslint-disable import/no-extraneous-dependencies */
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { Test, TestingModule } from '@nestjs/testing';
import { plainToClass } from 'class-transformer';
import * as request from 'supertest';
import { Repository } from 'typeorm';

import { User } from '../users/users.entity';

import { CreatePasteDto } from './dto/create-paste.dto';
import { Paste } from './paste.entity';
import { PastesController } from './pastes.controller';
import { PastesService } from './pastes.service';

import { ConfigServiceMock } from 'src/utils/mocks/config.mocks';
import {
  PasteQueryBuilder,
  PastesRepoMock,
  SamplePasteRow,
  ValidTestShortCode,
} from 'src/utils/mocks/pastes.mock';
import { ShortCodeServiceMock } from 'src/utils/mocks/shared.mocks';

describe('PastesController (e2e)', () => {
  let app: INestApplication;
  let token: string;

  let controller: PastesController;
  let service: PastesService;
  let pastesRepo: Repository<Paste>;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [PassportModule.register({ defaultStrategy: 'mock' })],
      controllers: [PastesController],
      providers: [
        PastesRepoMock,
        ConfigServiceMock,
        ShortCodeServiceMock,
        PastesService,
      ],
    }).compile();

    controller = module.get<PastesController>(PastesController);
    service = module.get<PastesService>(PastesService);
    pastesRepo = module.get<Repository<Paste>>('PasteRepository');

    app = module.createNestApplication();
    app.useGlobalPipes(new ValidationPipe());
    await app.init();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('when getting a paste /pastes', () => {
    it('GET /get-by-code/:code', async () => {
      const res = await request(app.getHttpServer())
        .get(`/api/pastes/get-by-code/${ValidTestShortCode}`)
        .expect(200);

      expect(res.body.title).toBe(SamplePasteRow.title);
    });

    it('GET /get-by-code/:code (404)', async () => {
      const querybuilder = jest
        .spyOn(pastesRepo, 'createQueryBuilder')
        .mockImplementation(() =>
          Object.assign(PasteQueryBuilder, { getOne: () => undefined }),
        );

      const res = await request(app.getHttpServer())
        .get(`/api/pastes/get-by-code/invalidString`)
        .expect(404);

      const expectedErrorResponse = { error: 'Not Found' };
      expect(res.body).toEqual(expect.objectContaining(expectedErrorResponse));

      querybuilder.mockRestore();
    });
  });

  afterAll(async () => {
    await app.close();
  });
});
