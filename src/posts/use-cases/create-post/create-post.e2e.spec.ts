import { INestApplication } from '@nestjs/common';
import { resetDb } from '../../../infra/database/tests/helpers/resetDb';
import { setupTest } from '../../../infra/database/tests/helpers/setup-test';
import * as request from 'supertest';
import { BlogPostResponse } from './create-post.validation';

describe('POST /posts', () => {
  let app: INestApplication;

  beforeAll(async () => {
    app = await setupTest();
  });

  afterAll(async () => {
    await resetDb();
    await app.close();
  });

  it('should create a post', async () => {
    const res = await request(app.getHttpServer())
      .post('/posts')
      .send({
        title: 'E2E test post',
        content: 'Testing content',
      })
      .expect(201);
    const body = res.body as BlogPostResponse;
    expect(body).toHaveProperty('id');
    expect(body.title).toBe('E2E test post');
  });

  it('should return 400 if input is invalid', async () => {
    await request(app.getHttpServer())
      .post('/posts')
      .send({}) // missing fields
      .expect(400);
  });
});
