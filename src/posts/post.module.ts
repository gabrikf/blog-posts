import { Module } from '@nestjs/common';
import { DatabaseModule } from '../infra/database/database-module';
import { GetAllPostsController } from './use-cases/get-all-posts/get-all-posts.controller';
import { GetAllPostsUseCase } from './use-cases/get-all-posts/get-all-posts.use-case';
import { CreatePostController } from './use-cases/create-post/create-post.controller';
import { CreatePostUseCase } from './use-cases/create-post/create-post.use-case';
import { GetPostByIdController } from './use-cases/get-post-by-id/get-post-by-id.controller';
import { GetPostByIdUseCase } from './use-cases/get-post-by-id/get-post-by-id.use-case';
import { CreateCommentController } from './use-cases/create-comment/create-comment.controller';
import { CreateCommentUseCase } from './use-cases/create-comment/create-comment.use-case';

@Module({
  imports: [DatabaseModule],
  controllers: [
    GetAllPostsController,
    CreatePostController,
    GetPostByIdController,
    CreateCommentController,
  ],
  providers: [
    GetAllPostsUseCase,
    CreatePostUseCase,
    GetPostByIdUseCase,
    CreateCommentUseCase,
  ],
})
export class PostModule {}
