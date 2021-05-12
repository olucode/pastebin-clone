import { PassportModule } from '@nestjs/passport';
import { Test, TestingModule } from '@nestjs/testing';
import { plainToClass } from 'class-transformer';
import { Request } from 'express';

import { User } from '../users/users.entity';

import { CreatePasteDto } from './dto/create-paste.dto';
import { Paste } from './paste.entity';
import { PastesController } from './pastes.controller';
import { PastesService } from './pastes.service';

describe('PastesController', () => {
  let controller: PastesController;
  let service: PastesService;
  let user: User;

  beforeEach(async () => {
    const pastesServiceMockValue = {
      create: () => jest.fn(),
    };
    const PastesServiceMock = {
      provide: PastesService,
      useValue: pastesServiceMockValue,
    };

    const module: TestingModule = await Test.createTestingModule({
      imports: [PassportModule.register({ defaultStrategy: 'mock' })],
      controllers: [PastesController],
      providers: [PastesServiceMock],
    }).compile();

    controller = module.get<PastesController>(PastesController);
    service = module.get<PastesService>(PastesService);
    user = plainToClass(User, {
      id: '3dcd0205-9f4c-4b6d-8cdb-cd866525f62e',
      name: 'a',
      email: 'a@example.com',
    });
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
