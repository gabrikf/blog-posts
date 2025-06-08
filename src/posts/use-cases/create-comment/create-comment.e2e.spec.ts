import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { resetDb } from '../../../infra/database/tests/helpers/resetDb';
import { setupTest } from '../../../infra/database/tests/helpers/setup-test';
import { CommentResponse } from './create-comment.validation';

describe('POST /posts/:id/comments', () => {
  let app: INestApplication;
  let postId: number;

  beforeAll(async () => {
    app = await setupTest();
    const res = await request(app.getHttpServer())
      .post('/posts')
      .send({ title: 'Post for comment', content: 'Test content' });
    const body = res.body as CommentResponse;
    postId = body.id;
  });

  afterAll(async () => {
    await resetDb();
    await app.close();
  });

  it('should create a comment for a post', async () => {
    const res = await request(app.getHttpServer())
      .post(`/posts/${postId}/comments`)
      .send({ content: 'Nice article!' })
      .expect(201);

    const body = res.body as CommentResponse;

    expect(body).toHaveProperty('id');
    expect(body.postId).toBe(postId);
  });

  it('should return 400 for empty comment', async () => {
    await request(app.getHttpServer())
      .post(`/posts/${postId}/comments`)
      .send({ content: '' })
      .expect(400);
  });

  it('should return 404 for non-existent post', async () => {
    await request(app.getHttpServer())
      .post(`/posts/999999/comments`)
      .send({ content: 'Hello?' })
      .expect(404);
  });
});
