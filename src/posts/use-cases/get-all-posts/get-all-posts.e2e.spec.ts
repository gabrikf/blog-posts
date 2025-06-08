// test/e2e/get-all-posts.e2e-spec.ts
import { INestApplication } from '@nestjs/common';
import { resetDb } from '../../../infra/database/tests/helpers/resetDb';
import { setupTest } from '../../../infra/database/tests/helpers/setup-test';
import * as request from 'supertest';
import { PaginatedPostsResponse } from './get-all-posts.validation';

describe('GET /posts', () => {
  let app: INestApplication;

  beforeAll(async () => {
    app = await setupTest();
  });

  afterAll(async () => {
    await resetDb();
    await app.close();
  });

  it('should return paginated posts', async () => {
    const res = await request(app.getHttpServer())
      .get('/posts?page=1&limit=10')
      .expect(200);
    const body = res.body as PaginatedPostsResponse;
    expect(Array.isArray(body.data)).toBe(true);
    expect(body).toHaveProperty('meta');
  });
});
