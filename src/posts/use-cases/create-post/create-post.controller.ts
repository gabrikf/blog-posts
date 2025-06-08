import { Body, Controller, Post } from '@nestjs/common';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { CreatePostInput, CreatePostInputDTO } from './create-post.validation';
import { CreatePostUseCase } from './create-post.use-case';

@Controller('posts')
@ApiTags('Posts')
export class CreatePostController {
  constructor(private readonly createPostUseCase: CreatePostUseCase) {}

  @Post()
  @ApiBody({ type: CreatePostInputDTO })
  async handle(@Body() data: CreatePostInput) {
    return await this.createPostUseCase.execute(data);
  }
}
