/* eslint-disable @typescript-eslint/no-unused-vars */
// eslint-disable-next-line eslint-comments/disable-enable-pair
/* eslint-disable jest/expect-expect */

import { INestApplication } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Test } from '@nestjs/testing';
import * as request from 'supertest';

import { AppModule } from '../src/app.module';

import { MockAuthGuard } from 'src/utils/mocks/shared.mocks';
import { SampleUserRow } from 'src/utils/mocks/users.mocks';

describe('AppController (e2e)', () => {
  let app: INestApplication;
  let token: string;

  beforeAll(async () => {
    const moduleFixture = await Test.createTestingModule({
      imports: [AppModule],
    })
      .overrideGuard(AuthGuard())
      .useValue(MockAuthGuard)
      .compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('POST /api/auth/register', async () => {
    const { id: _, ...input } = SampleUserRow;

    await request(app.getHttpServer())
      .post('/api/auth/register')
      .send(input)
      .expect(201);
  });

  it('POST /api/auth/login', async () => {
    const { id: _, name: __, ...input } = SampleUserRow;

    const res = await request(app.getHttpServer())
      .post('/api/auth/login')
      .send(input)
      .expect(201);
    token = res.body.token as string;
  });

  it('GET /api/users', async () => {
    const users = await request(app.getHttpServer())
      .get('/api/users')
      .set('Authorization', `Bearer ${token}`)
      .expect(200);

    expect(users.body[0].email).toBe(SampleUserRow.email);
    expect(users.body[0].name).toBe(SampleUserRow.name);
  });

  afterAll(async () => {
    await app.close();
  });
});
