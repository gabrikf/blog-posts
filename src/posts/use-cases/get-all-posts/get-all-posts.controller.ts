import { Controller, Get, Query } from '@nestjs/common';
import { ApiQuery, ApiTags } from '@nestjs/swagger';
import { GetAllPostsUseCase } from './get-all-posts.use-case';
import {
  GetAllPostsInput,
  GetAllPostsInputDTO,
} from './get-all-posts.validation';

@Controller('posts')
@ApiTags('Posts')
export class GetAllPostsController {
  constructor(private readonly getAllPostsUseCase: GetAllPostsUseCase) {}

  @Get()
  @ApiQuery({ type: GetAllPostsInputDTO })
  async handle(@Query() params: GetAllPostsInput) {
    return await this.getAllPostsUseCase.execute(params);
  }
}
