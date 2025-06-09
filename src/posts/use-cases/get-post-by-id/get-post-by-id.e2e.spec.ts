import { INestApplication } from '@nestjs/common';
import { resetDb } from '../../../infra/tests/helpers/resetDb';
import { setupTest } from '../../../infra/tests/helpers/setup-test';
import * as request from 'supertest';
import { BlogPostWithComments } from './get-post-by-id.validation';

describe('GET /posts/:id', () => {
  let app: INestApplication;
  let postId: number;

  beforeAll(async () => {
    app = await setupTest();
    const res = await request(app.getHttpServer())
      .post('/posts')
      .send({ title: 'Test', content: 'Post for detail view' });
    const body = res.body as BlogPostWithComments;
    postId = body.id;
  });

  afterAll(async () => {
    await resetDb();
    await app.close();
  });

  it('should fetch a post by ID', async () => {
    const res = await request(app.getHttpServer())
      .get(`/posts/${postId}`)
      .expect(200);

    expect(res.body).toHaveProperty('id', postId);
    const body = res.body as BlogPostWithComments;
    expect(Array.isArray(body.comments)).toBe(true);
  });

  it('should return 404 for non-existent post', async () => {
    await request(app.getHttpServer()).get(`/posts/999999`).expect(404);
  });
});
