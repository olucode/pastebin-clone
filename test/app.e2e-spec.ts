// eslint-disable-next-line eslint-comments/disable-enable-pair
/* eslint-disable jest/expect-expect */

import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import * as request from 'supertest';

import { AppModule } from '../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;
  let token: string;

  beforeAll(async () => {
    const moduleFixture = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('POST /api/auth/register', async () => {
    const input = {
      name: 'a',
      email: 'a@a.com',
      password: '12345',
    };

    await request(app.getHttpServer())
      .post('/api/auth/register')
      .send(input)
      .expect(201);
  });

  it('POST /api/auth/login', async () => {
    const input = {
      email: 'a@a.com',
      password: '12345',
    };

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
    expect(users.body[0].id).toBe(1);
    expect(users.body[0].name).toBe('a');
  });

  it('GET /api/users/profile', async () => {
    const user = await request(app.getHttpServer())
      .get('/api/users/a')
      .set('Authorization', `Bearer ${token}`)
      .expect(200);

    expect(user.body.name).toBe('a');
  });
});
